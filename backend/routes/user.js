const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { findByIdAndUpdate } = require("../models/Post");
const { ObjectId } = require("mongoose");

const todaysDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day} / ${month} / ${year}`;
  return currentDate;
};

router.post("/email-register-user", async (req, res) => {
  try {
    const isPresent = await User.findOne({ UserName: req.body.UserName });
    if (isPresent !== null) {
      return res.status(400).json({
        success: false,
        message: "User already present in the data base !",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.Password, salt);
      const CreatedUser = await User.create({
        ...req.body,
        Password: hashedPassword,
        Joining: todaysDate(),
      });
      return res.status(200).json({
        success: true,
        message: "User created successfully!",
        data: CreatedUser,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong !" });
  }
});

router.post("/email-login-user", async (req, res) => {
  try {
    let isPresent;
    if (req.body.UserName) {
      isPresent = await User.findOne({ UserName: req.body.UserName });
    } else if (req.body.Email) {
      isPresent = await User.findOne({ Email: req.body.Email });
    }
    let dumDum = await User.find()
    
    if (isPresent === null) {
      return res
        .status(500)
        .json({
          success: false,
          message: "User with this email or username does not exist !",
          isPresent :isPresent ,
          dumDum : dumDum
        });
    }
    const PasswordMatched = await bcrypt.compare(
      req.body.Password,
      isPresent.Password
    );
    if (!PasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect!" });
    }
    let UserData = isPresent;
    UserData.Password = "";
    const Payload = {
      User: UserData,
    };
    const AuthToken = jwt.sign(Payload, process.env.TWITTER_JWT_SECRET, {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("Twitter", AuthToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully logged in ",
      User: UserData,
    });
  } catch (err) {
    return res.status(501).json({ success: false, Error: err });
  }
});

// multer code
const imageStorage = multer.diskStorage({
  destination: "./assets/Images",
  filename: (req, file, cb) => {
    cb(
      null,
      "Image-" +
        file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  },
});
const upload_image = multer({
  storage: imageStorage,
  limits: {
    fileSize: 100000000,
  },
});

router.put(
  "/update-profile/:id",
  upload_image.fields([
    { name: "Banner", maxCount: 1 },
    { name: "Image", maxCount: 1 },
  ]),
  async (req, res) => {
    const { Name, UserName, Country, City, State, Bio } = req.body;
    try {
      const UserData = await User.findOne({ _id: req.params.id });
      const ImageName = "/t/media/image/" + req.files.Image[0].filename;
      const BannerName = "/t/media/image/" + req.files.Banner[0].filename;
      if (UserData) {
        const UpdatedUser = await User.findByIdAndUpdate(
          { _id: req.params.id },
          {
            Name,
            UserName,
            Country,
            City,
            State,
            Bio,
            Image: ImageName,
            Banner: BannerName,
          },
          { returnDocument: "after" }
        );
        return res
          .status(200)
          .json({
            success: true,
            message: "User Updated",
            NewUser: UpdatedUser,
          });
      }
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "No user with this ID found !",
        error: err,
      });
    }
  }
);

router.get("/to-follow-users", async (req, res) => {
  const UsersData = await User.find({ _id: { $ne: req.body._id } });
  return res.status(200).json({ success: true, Users: UsersData });
});

router.get("/all-users", async (req, res) => {
  const AllUsers = await User.find({})
    .sort([["updatedAt", -1]])
    .exec();
  return res.status(200).json({ success: true, AllUsers: AllUsers });
});

router.get("/user/:id", async (req, res) => {
  const UserData = await User.find({ _id: req.params.id });
  return res.status(200).json({ success: true, User: UserData });
});

router.post("/follow-user", async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const [FromData] = await User.find({ _id: from });
  const [ToData] = await User.find({ _id: to });
  let FromDataFollowing = FromData.Following;
  FromDataFollowing.push({
    _id: ToData._id,
    Name: ToData.Name,
    Email: ToData.Email,
    UserName: ToData.UserName,
    Image: ToData.Image,
  });
  let ToDataFollower = ToData.Followers;
  ToDataFollower.push({
    _id: FromData._id,
    Name: FromData.Name,
    Email: FromData.Email,
    UserName: FromData.UserName,
    Image: FromData.Image,
  });
  await User.findByIdAndUpdate(
    { _id: from },
    { $set: { Following: FromDataFollowing } }
  );
  await User.findByIdAndUpdate(
    { _id: to },
    { $set: { Followers: ToDataFollower } }
  );
  res.status(200).json({ success: true, message: "Followed!" });
});

router.post("/unfollow-user", async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const [FromData] = await User.find({ _id: from });
    const [ToData] = await User.find({ _id: to });
    const FromDataFollowing = FromData.Following;
    const ToDataFollower = ToData.Followers;
    const removedFollowing = FromDataFollowing.filter((x) => x !== to);
    const removedFollower = ToDataFollower.filter((x) => x !== from);
    try {
      const a = await User.findByIdAndUpdate(
        { _id: from },
        { $set: { Following: removedFollowing } },
        { returnDocument: "after" }
      );
      const b = await User.findByIdAndUpdate(
        { _id: to },
        { $set: { Followers: removedFollower } },
        { returnDocument: "after" }
      );
      return res
        .status(200)
        .json({ success: true, message: "Unfollowed!", From: a, To: b });
    } catch (err) {
      return res.status(400).json({ success: true, Error: err });
    }
  } catch (err) {
    return res.status(501).json({ success: false, Error: err });
  }
});

router.post("/is-following", async (req, res) => {
  try {
    const From = req.body.from;
    const To = req.body.to;
    const UserData = await User.find({ _id: From });
    let FollowingArr = UserData[0].Following;
    let Checker;
    if (FollowingArr.length !== 0) {
      Checker = FollowingArr.find((ele) => ele === To);
      if (Checker !== undefined) {
        return res.status(200).json({ success: true, isPresent: true });
      }
      return res.status(200).json({ success: true, isPresent: false });
    }
    return res.status(200).json({ success: true, isPresent: false });
  } catch (err) {
    return res.status(501).json({ success: false, Error: err });
  }
});

router.post("/user-data/:id", async (req, res) => {
  const data = await User.findOne({ _id: req.params.id });
  return res.status(200).json({ success: true, UserData: data });
});

module.exports = router;
