const express = require("express");
const router = express.Router();
const multer = require("multer");
fs = require("fs");
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");

// image code///////////////////////////////////////////////////////////////////////
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
    fileSize: 400000000,
  }
});

router.post(
  "/add-image-post",
  upload_image.fields([{ name: "Image", maxCount: 1 }]),
  async (req, res) => {
    try {
      const PostData = await Post.create({
        ...req.body,
        Tags: req.body.Tags.split(","),
        Video: "",
        Image: "/t/media/image/" + req.files.Image[0].filename,
      });
      return res
        .status(200)
        .json({ success: true, message: "Post added !", PostData: PostData });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Something Went Wrong!", Error: err });
    }
  }
);

// video code///////////////////////////////////////////////////////////////////////

const videoStorage = multer.diskStorage({
  destination: "./assets/Videos",
  filename: (req, file, cb) => {
    cb(
      null,
      "Video-" +
        file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  },
});
const upload_video = multer({
  storage: videoStorage,
  limits: {
    fileSize: 4000000000,
  }
});

router.post(
  "/add-video-post",
  upload_video.fields([{ name: "Video", maxCount: 1 }]),
  async (req, res) => {
    try {
      const PostData = await Post.create({
        ...req.body,
        Tags: req.body.Tags.split(","),
        Video: "/t/media/video/" + req.files.Video[0].filename,
        Image: "",
      });
      return res
        .status(200)
        .json({ success: true, message: "Post added !", PostData: PostData });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Something Went Wrong!", Error: err });
    }
  }
);
//////////////////////////////////////////////////////////////////////////////////

router.post("/add-text-post", async (req, res) => {
  try {
    const PostData = await Post.create({
      ...req.body,
      Video: "",
      Image: "",
    });
    return res
      .status(200)
      .json({ success: true, message: "Post added !", PostData: PostData });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong!", Error: err });
  }
});


const thirdStorage = multer.diskStorage({
  destination: "./assets/Both",
  filename: (req, file, cb) => {
    cb(
      null,
      "Video-" +
        file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  },
});
const uploadfilefunc = multer({
  storage: thirdStorage ,
  limits: {
    fileSize: 4000000000,
  }
});

router.post(
  "/add-image-video-post",
  uploadfilefunc.fields([{name : "Image" , maxCount : 1} , {name : "Video" , maxCount : 1}]) ,
  async (req, res) => {
    try {
      const PostData = await Post.create({
        ...req.body,
        Image: "/t/media/both/" + req.files.Image[0].filename,
        Video: "/t/media/both/" + req.files.Video[0].filename,
      });
      return res
        .status(200)
        .json({ success: true, message: "Post added !", PostData: PostData });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Something Went Wrong!", Error: err });
    }
  }
);

router.get("/posts/:id", async (req, res) => {
  // try {
  const encodedeId = mongoose.Types.ObjectId();
  const PostData = await Post.find({ User: req.params.id });
  return res.status(200).json({ success: true, PostData: PostData });
  // } catch (err) {
  //   return res.status(501).json({ success: false, Error: err });
  // }
});

router.get("/all-posts", async (req, res) => {
  try {
    const PostsData = await Post.find({})
      .sort([["updatedAt", -1]])
      .exec();
    return res.status(200).json({ success: true, PostsData: PostsData });
  } catch (err) {
    return res.status(501).json({ success: false, Error: err });
  }
});

router.post("/post/like/:userid/:postid", async (req, res) => {
  try {
    let UserData = await User.find({ _id: req.params.userid });
    let LikedPostArr = UserData[0].LikedPosts;
    if (LikedPostArr.find((ele) => ele === req.params.postid)) {
      return res
        .status(400)
        .json({ success: false, message: "You have already liked the post" });
    } else {
      LikedPostArr.push(req.params.postid);
      const FinalOutput = await User.findByIdAndUpdate(
        { _id: req.params.userid },
        { $set: { LikedPosts: LikedPostArr } },
        { returnDocument: "after" }
      );
      return res.status(200).json({ success: true, User: FinalOutput });
    }
  } catch (err) {
    return res.status(500).json({ success: false, Error: err });
  }
});

router.post("/post/bookmark/:userid/:postid", async (req, res) => {
  try {
    let UserData = await User.find({ _id: req.params.userid });
    let BookmarkPostArr = UserData[0].BookMark;
    if (BookmarkPostArr.find((ele) => ele === req.params.postid)) {
      return res.status(400).json({
        success: false,
        message: "You have already bookmarked the post",
      });
    } else {
      BookmarkPostArr.push(req.params.postid);
      const FinalOutput = await User.findByIdAndUpdate(
        { _id: req.params.userid },
        { $set: { BookMark: BookmarkPostArr } },
        { returnDocument: "after" }
      );
      return res.status(200).json({ success: true, User: FinalOutput });
    }
  } catch (err) {
    return res.status(500).json({ success: false, Error: err });
  }
});

router.get("/all-tags", async (req, res) => {
  const TagsSet = new Set();
  const Posts = await Post.find({});
  Posts.map((post) => {
    let Tags = post.Tags;
    Tags.map((tag) => {
      TagsSet.add(tag);
    });
  });
  return res.status(200).json({ success: true, Posts: Array.from(TagsSet) });
});

router.get("/post/:tag", async (req, res) => {
  // try {
  const TagPost = [];
  const Posts = await Post.find({});
  for (let i = 0; i < Posts.length; i++) {
    let Tags = Posts[i].Tags;
    if (Tags.find((tag) => tag === "#" + req.params.tag) !== undefined) {
      TagPost.push(Posts[i]);
    }
  }
  return res.status(200).json({ success: true, PostTag: TagPost });
  // } catch (err) {
  // return res.status(500).json({ success: false, Error: err });
  // }
});

router.get("/postData/:postID", async (req, res) => {
  try {
    const PostData = await Post.findOne({ _id: req.params.postID });
    return res.status(200).json({ success: true, Post: PostData });
  } catch (err) {
    return res.status(500).json({ success: false, Error: err });
  }
});

function sortObject(obj) {
  var arr = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      arr.push({
        key: prop,
        value: obj[prop],
      });
    }
  }
  arr.sort(function (a, b) {
    return b.value - a.value;
  });
  return arr;
}

router.get("/trending", async (req, res) => {
  try {
    let TagsObj = new Object();
    const Posts = await Post.find({});
    Posts.map((post) => {
      let Tags = post.Tags;
      Tags.map((tag) => {
        if (TagsObj.hasOwnProperty(tag)) {
          TagsObj[tag] = TagsObj[tag] + 1;
        } else {
          TagsObj[tag] = 1;
        }
      });
    });
    return res.status(200).json({ success: true, Tags: sortObject(TagsObj) });
  } catch (err) {
    return res.status(500).json({ success: false, Error: err });
  }
});

////////////////////////// Book Mark Post ////////////////////////////////////
router.post("/bookmark/:postID/:userID", async (req, res) => {
  try {
    const UserData = await User.find({ _id: req.params.userID });
    let BookmarkArr = UserData[0].BookMark;
    let cond = BookmarkArr.find((ele) => ele === req.params.postID);
    if (cond !== undefined) {
      return res
        .status(500)
        .json({ success: false, message: "Post already bookmarked !" });
    }
    BookmarkArr.push(req.params.postID);
    const NewUser = await User.findByIdAndUpdate(
      { _id: req.params.userID },
      {
        $set: {
          BookMark: BookmarkArr,
        },
      },
      { returnDocument: "after" }
    );
    return res.status(200).json({ success: true, NewUser: NewUser });
  } catch (err) {
    return res.status(501).json({ success: false, Error: err });
  }
});

router.post("/remove-bookmark/:postID/:userID", async (req, res) => {
  try {
    let BookmarkArr = (await User.findOne({ _id: req.params.userID })).BookMark;
    let cond = BookmarkArr.find((ele) => ele === req.params.postID);
    if (cond === undefined) {
      return res.status(500).json({
        success: false,
        message: "Post not present in bookmark list !",
      });
    }
    BookmarkArr = BookmarkArr.filter((ele) => ele !== req.params.postID);
    const NewUser = await User.findByIdAndUpdate(
      { _id: req.params.userID },
      {
        $set: {
          BookMark: BookmarkArr,
        },
      },
      { returnDocument: "after" }
    );
    return res.status(200).json({ success: true, NewUser: NewUser });
  } catch (err) {
    return res.status(501).json({ success: false, Error: err });
  }
});

///////////////////////// Fetch Bookmark Posts////////////////////////////////
router.get("/all-bookmarks/:userID", async (req, res) => {
  let UserData = (await User.findOne({ _id: req.params.userID })).BookMark;
  let FinalData = [];
  for (let i = 0; i < UserData.length; i++) {
    let postData = await Post.findOne({ _id: UserData[i] });
    FinalData.push(postData);
  }
  return res.status(200).json({ BookmarkData: FinalData });
});

/////////////////////////////////////////////////////////////////////////////////
router.post("/like-post/:userID/:postID", async (req, res) => {
  let UserLikedPosts = (await User.findOne({ _id: req.params.userID }))
  .LikedPosts;
  let PostDataLikes = (await Post.findOne({ _id: req.params.postID })).Likes;
  if (UserLikedPosts.find((ele) => ele === req.params.postID) !== undefined) {
    UserLikedPosts = UserLikedPosts.filter((ele)=> ele !== req.params.postID )
    const NewUser = await User.findByIdAndUpdate(
      { _id: req.params.userID },
      {
        $set: {
          LikedPosts: UserLikedPosts,
        },
      },
      { returnDocument: "after" }
    );
    const NewPost = await Post.findByIdAndUpdate(
      { _id: req.params.postID },
      {
        $set: {
          Likes: PostDataLikes - 1,
        },
      },
      { returnDocument: "after" }
    );
    return res
      .status(200)
      .json({
        success: true,
        NewUser: NewUser,
        NewPost: NewPost,
        message: "Post Disliked !",
      });
  } else {
    UserLikedPosts.push(req.params.postID);
    let PostDataLikes = (await Post.findOne({ _id: req.params.postID })).Likes;
    const NewUser = await User.findByIdAndUpdate(
      { _id: req.params.userID },
      {
        $set: {
          LikedPosts: UserLikedPosts,
        },
      },
      { returnDocument: "after" }
    );
    const NewPost = await Post.findByIdAndUpdate(
      { _id: req.params.postID },
      {
        $set: {
          Likes: PostDataLikes + 1,
        },
      },
      { returnDocument: "after" }
    );
    return res
      .status(200)
      .json({
        success: true,
        NewUser: NewUser,
        NewPost: NewPost,
        message: "Post Liked !",
      });
  }
});

module.exports = router;
