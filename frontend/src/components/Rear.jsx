import React, { useState, useEffect } from "react";
import axios from "axios";
import { backEndUrl, baseUrl } from "../Creadentials";
import nouser from "../assets/images/nouser.jpg";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import noFollowers from "../assets/assets/no-followers.png";

const Rear = () => {
  const [trends, settrends] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [cond, setCond] = useState(false);
  const wtfCond = () => {
    setCond(!cond);
  };
  const navigate = useNavigate();

  const FETCH_TRENDINGS = async () => {
    const response = await axios
      .get(`${baseUrl}/trending`)
      .then((res) => res.data.Tags);
    settrends(response);
  };

  const FETCH_USERS = async () => {
    const response = await axios
      .get(`${baseUrl}/all-users`)
      .then((res) => res.data.AllUsers);
    setUsers(response);
  };

  const FETCH_LOGGEDIN_USER = async () => {
    const UserData = JSON.parse(localStorage.getItem("UserData"));
    if (UserData != null) {
      setUser(UserData);
    }
  };

  const HANDLE_FOLLOW_USER = async (toId) => {
    await axios
      .post(`${baseUrl}/follow-user`, {
        from: user._id,
        to: toId,
      })
      .then((res) => {
        wtfCond();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checker2 = () => {
    let count = 0;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i]._id !== user._id &&
        users[i].Followers.find((ele2) => ele2._id === user._id) === undefined
      ) {
        count++;
      }
    }
    return count;
  };

  useEffect(() => {
    FETCH_TRENDINGS();
    FETCH_USERS();
    FETCH_LOGGEDIN_USER();
  }, [cond]);

  return (
    <div className="w-[30%] h-full flex flex-col items-center font-kanit pt-4 space-y-5">
      <div className="rounded-2xl  w-[90%] text-white items-center bg-twitter_gray p-3">
        <span className="text-3xl font-semibold ">
          What's{" "}
          <span className=" bg-blue_purple bg-clip-text text-transparent">
            Happening
          </span>
        </span>
        <div className="flex flex-col space-y-5 mt-6 mb-2">
          {trends.slice(0, 3).map((ele) => (
            <div key={ele.key} className="flex flex-col space-y-1">
              {/* <span className="text-sm text-gray-400">Trending in {ele.location}</span> */}
              <span className="text-2xl text-white">{ele.key}</span>
              <span className="text-sm text-gray-400">{ele.value} Tweets</span>
            </div>
          ))}
        </div>
        <span
          className="text-twitter_blue underline cursor-pointer"
          onClick={() => navigate("/explore")}
        >
          Show More
        </span>
      </div>
      <div className="rounded-2xl  w-[90%] text-white items-center bg-twitter_gray p-3">
        <span className="text-3xl font-semibold ">
          Who to
          <span className=" bg-orange_red bg-clip-text text-transparent">
            {" "}
            Follow
          </span>
        </span>
        <div className="flex flex-col space-y-5 mt-6 mb-2 overflow-y-scroll scrollbar-hide">
          {checker2() !== 0 ? (
            users.map((ele) => (
              <React.Fragment key={ele._id}>
                {ele._id !== user._id &&
                  ele.Followers.find((ele2) => ele2._id === user._id) ===
                    undefined && (
                    <div key={ele.Name} className="flex space-x-3">
                      <img
                        src={ele.Image ? `${backEndUrl}${ele.Image}` : nouser}
                        alt=""
                        className="rounded-full w-12 h-12 object-cover"
                      />
                      <div className="w-[50%] flex flex-col  tracking-wide ">
                        <span className="text-md">{ele.Name}</span>
                        <span className="text-sm text-gray-300">
                          {ele.Email}
                        </span>
                      </div>
                      <span
                        onClick={() => HANDLE_FOLLOW_USER(ele._id)}
                        className="flex items-center justify-center
                               bg-white text-gray-800 px-3 rounded-3xl tracking-wider  hover:scale-105 cursor-pointer duration-300 hover:bg-twitter_blue hover:text-white"
                      >
                        Follow
                      </span>
                    </div>
                  )}
              </React.Fragment>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <img src={noFollowers} alt="" />
            </div>
          )}
        </div>
        <span
          className="text-twitter_blue underline cursor-pointer"
          onClick={() => navigate("/discover")}
        >
          Show More
        </span>
      </div>
    </div>
  );
};
export default Rear;
