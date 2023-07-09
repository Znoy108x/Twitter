import React, { useRef, useState, useEffect } from 'react'
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import PopoverComp from "./PopoverComp"
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../Creadentials';
import { backEndUrl } from "../Creadentials"
import nouser from "../assets/images/nouser.jpg"

const Post = ({ post, fromBookmark, bookmarkCond, feedCond, fromHome, fromTags, tagsCond  , profileCond , fromProfile }) => {
    const [display, setDisplay] = useState("")
    const [puser, setpUser] = useState({})
    const [user , setUser] = useState({})
    const ref1 = useRef()
    const ivt = () => {
        if (post.Image !== "" && post.Video !== "") {
            setDisplay("IV")
        } else if (post.Image !== "") {
            setDisplay("I")
        } else if (post.Video !== "") {
            setDisplay("V")
        } else {
            setDisplay("T")
        }
    }

    const FETCH_USER_DATA = async () => {
        const UserData = JSON.parse(localStorage.getItem("UserData"))
        setUser(UserData)
        await axios.get(`${baseUrl}/user/${post.User}`).then((res) => {
            const data = res.data.User[0]
            setpUser(data)
        }).catch((err) => {
            toast.error(err)
        })
    }

    const HANDLE_LIKE_FUNCTION = async () => {
        await axios.post(`${baseUrl}/like-post/${user._id}/${post._id}`).then((res) => {
            const response = res.data
            toast.success(response.message)
            if (fromHome) feedCond()
            if (fromBookmark) bookmarkCond()
            if (fromTags) tagsCond()
            if(fromProfile ) profileCond()
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {

        ivt()
        FETCH_USER_DATA()
    }, []);

    return (
        <div className="flex w-full p-2 space-x-3 border-b-2 border-zinc-900 pb-4" key={post._id}>
            {
                <img src={puser?.Image ? `${backEndUrl}${puser.Image}` : nouser} alt="" className="w-16 h-16 rounded-2xl object-cover"/>
            }
            <div className="w-[90%] flex flex-col space-y-4">
                <div className="w-full relative flex space-x-3 p-2 items-center">
                    <span className="text-white">{puser.Name}</span>
                    <span className="text-zinc-500">@{puser.UserName}</span>
                    <span className="text-zinc-500 flex items-center space-x-2">
                        <EventRoundedIcon className="text-gray-400" fontSize="small" />
                        <span className="text-sm">05 / 01 / 2023</span>
                    </span>
                    <span className="absolute right-3 text-white">
                        <MoreHorizRoundedIcon className="cursor-pointer" onClick={() => ref1.current.click()} />
                        <PopoverComp ref1={ref1} post={post} fromBookmark={fromBookmark} bookmarkCond={bookmarkCond} />
                    </span>
                </div>
                <span className="text-white text-md tracking-wider leading-6  text-left pl-3">
                    {post.Description}
                </span>
                {
                    display === "I" && <img src={`${backEndUrl}${post.Image}`} alt="" className="object-cover w-full h-[50vh] rounded-xl shadow shadow-slate-300 mx-auto" />
                }
                {
                    display === "IV" && <div className="flex h-full w-full space-x-5">

                        <div className="w-1/2 h-[60vh] rounded-xl overflow-hidden">
                            <img src={`${backEndUrl}${post.Image}`} alt="" className='w-full h-full object-cover'/>
                        </div>
                        <div className="w-1/2 h-[60vh]  flex items-center justify-center relative bg-red-300 rounded-xl overflow-hidden">
                            <video src={`${backEndUrl}${post.Video}`} autoPlay controls muted width="60%" style={{
                                width: "100%", height: "100%", objectFit: "cover", position: "absolute"
                            }} />
                        </div>
                    </div>

                }
            {
                display === "V" &&
                <div className="w-full h-[60vh]  flex items-center justify-center relative">
                    <video src={`${backEndUrl}${post.Video}`} autoPlay controls muted width="60%" style={{
                        width: "100%", height: "100%", objectFit: "cover", position: "absolute"
                    }} />
                </div>
            }
            <div className="flex space-x-8 text-white items-center">
                <div className="flex space-x-3 items-center">
                    <VolunteerActivismRoundedIcon className="cursor-pointer" onClick={() => HANDLE_LIKE_FUNCTION()} />
                    <span className="text-rose-500">{post.Likes}</span>
                </div>
                {/* <ShareRoundedIcon className="cursor-pointer" /> */}
            </div>
        </div>
        </div >
    )
}

export default Post