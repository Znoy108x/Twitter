import React, { useEffect, useState } from "react";
import twitterBanner from "../assets/assets/twitter-banner.png";
import twitter from "../assets/images/twitter2.png";
import twitter2 from "../assets/images/twitter3.png";
import google from "../assets/images/google.png";
import apple from "../assets/images/apple.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Creadentials";
import { toast } from "react-toastify";

const Auth = () => {
  const navigate = useNavigate();
  const [optSelc, setoptSelc] = useState("");

  const [userSignInDetails, setUserSignInDetails] = useState({
    Email: "",
    Password: "",
  });

  const [userSignUpDetails, setUserSignUpDetails] = useState({
    Email: "",
    Password: "",
    Name: "",
    UserName: "",
    Country: "",
    State: "",
    City: "",
    Following: [],
    Followers: [],
    Image: "",
    Banner: "",
    Bio: "",
    Joining: "",
    Goggle: false,
    Apple: false,
    LikedPosts: [],
    BookMark: [],
  });

  const HANDLE_LOGIN = async () => {
    axios
      .post(`${baseUrl}/email-login-user`, userSignInDetails)
      .then((res) => {
        toast.success(`Welcome back , ${res.data.User.Name} !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("UserData", JSON.stringify(res.data.User));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if(!error.success){
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }
      });
  };

  const HANDLE_SIGNUP = () => {
    axios
      .post(`${baseUrl}/email-register-user`, userSignUpDetails)
      .then((res) => {
        toast.success(
          `Registered Successfully , Please sign in to continue !`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setoptSelc("EmailSignin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CondRender = () => {
    if (optSelc === "EmailSignup") {
      return (
        <>
          <span className="text-6xl text-white font-bold tracking-wider text-center mt-10">
            Welcome back <span className="text-blue-400">Homo Sepian!</span>
          </span>
          <span className="text-white text-3xl">
            <span className="text-sky-500">Sign in</span> to your account
          </span>
          <div className="mt-10 flex flex-col space-y-6 w-full items-center ">
            <input
              type="text"
              className="rounded-md px-3 py-2 w-[50%] outline outline-offset-1 outline-sky-500 tracking-wider text-gray-600"
              placeholder="Name"
              name="Name"
              value={userSignUpDetails.Name}
              onChange={(e) =>
                setUserSignUpDetails({
                  ...userSignUpDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <input
              type="text"
              className="rounded-md px-3 py-2 w-[50%] outline outline-offset-1 outline-sky-500 tracking-wider text-gray-600"
              placeholder="UserName"
              name="UserName"
              value={userSignUpDetails.UserName}
              onChange={(e) =>
                setUserSignUpDetails({
                  ...userSignUpDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <input
              type="text"
              className="rounded-md px-3 py-2 w-[50%] outline outline-offset-1 outline-sky-500 tracking-wider text-gray-600"
              placeholder="Email"
              name="Email"
              value={userSignUpDetails.Email}
              onChange={(e) =>
                setUserSignUpDetails({
                  ...userSignUpDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="password"
              className="rounded-md px-3 py-2 w-[50%] outline outline-offset-1 outline-sky-500 tracking-wider text-gray-600"
              placeholder="Password"
              name="Password"
              value={userSignUpDetails.Password}
              onChange={(e) =>
                setUserSignUpDetails({
                  ...userSignUpDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <div
              className="flex items-center rounded-3xl space-x-5 justify-center  text-xl  text-sky-500 bg-opacity-90 bg-sky-300/20 cursor-pointer w-[50%] py-1  hover:bg-sky-300/30 hover:text-sky-300 duration-300 hover:scale-105"
              onClick={HANDLE_SIGNUP}
            >
              <span className="x-50">Sign Up</span>
            </div>
          </div>
        </>
      );
    } else if (optSelc === "EmailSignin") {
      return (
        <>
          <span className="text-6xl text-white font-bold tracking-wider text-center mt-20">
            Welcome back <span className="text-blue-400">Homo Sepian!</span>
          </span>
          <span className="text-white text-3xl mt-3">
            <span className="text-sky-500">Sign in</span> to your account
          </span>
          <div className="mt-10 flex flex-col space-y-6 w-full items-center ">
            <input
              type="text"
              className="rounded-md px-3 py-2 w-[50%] outline outline-offset-1 outline-sky-500 tracking-wider text-gray-600"
              placeholder="Email"
              name="Email"
              value={userSignInDetails.Email}
              onChange={(e) =>
                setUserSignInDetails({
                  ...userSignInDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="password"
              className="rounded-md px-3 py-2 w-[50%] outline outline-offset-1 outline-sky-500 tracking-wider text-gray-600"
              placeholder="Password"
              name="Password"
              value={userSignInDetails.Password}
              onChange={(e) =>
                setUserSignInDetails({
                  ...userSignInDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <div
              className="flex items-center rounded-3xl space-x-5 justify-center  text-xl  text-sky-500 bg-opacity-90 bg-sky-300/20 cursor-pointer w-[50%] py-1  hover:bg-sky-300/30 hover:text-sky-300 duration-300 hover:scale-105"
              onClick={HANDLE_LOGIN}
            >
              <span className="x-50">Sign in</span>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <span className="text-6xl text-white font-bold tracking-wider">
          Tweet like a <span className="text-blue-400">bird!</span>
        </span>
        <span className="text-white text-3xl">Join twitter today</span>
        <div className="flex flex-col space-y-4 items-center w-[50%] mt-20">
          <div className="w-full bg-white flex items-center rounded-3xl px-2 py-1 space-x-5 justify-center cursor-not-allowed">
            <img src={google} alt="" className="w-8" />
            <span>Sign up with Google</span>
          </div>
          <div className="w-full bg-white flex items-center rounded-3xl px-2 py-1 space-x-5 justify-center cursor-not-allowed">
            <img src={apple} alt="" className="w-8" />
            <span>Sign up with Apple</span>
          </div>
          <span className="text-white">or</span>
        </div>
        <div
          className=" flex items-center rounded-3xl px-2 py-1 space-x-5 justify-center w-[50%] bg-sky-500 text-white text-xl mt-6 cursor-pointer"
          onClick={() => setoptSelc("EmailSignup")}
        >
          <span>Sign up with email</span>
        </div>
        <div className="mt-20">
          <span className="text-gray-400 text-lg">
            Already have an account ?
          </span>
          <div
            className=" flex items-center rounded-3xl px-2 py-1 space-x-5 justify-center  text-xl mt-2 text-sky-500 bg-opacity-90 bg-sky-300/20 cursor-pointer"
            onClick={() => setoptSelc("EmailSignin")}
          >
            <span className="x-50">Sign in</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-screen h-screen flex font-kanit">
      <div className="w-3/5 h-full flex items-center justify-center overflow-hidden">
        <img
          src={twitterBanner}
          alt=""
          className="h-full w-full absolute top-0 left-0 -z-10"
        />
        <img src={twitter} alt="" className="w-1/2" />
      </div>
      <div className="w-2/5 h-full bg-black flex flex-col items-center relative pt-20">
        <img src={twitter2} alt="" className="w-8 absolute left-2 top-2" />
        {CondRender()}
      </div>
    </div>
  );
};

export default Auth;
