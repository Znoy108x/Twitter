import React,{useState , useEffect } from 'react'
import twitter2 from "../assets/images/twitter3.png"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import NOUSER from "../assets/images/nouser.jpg"
import {backEndUrl} from "../Creadentials"

const Sidebar = () => {
    const navigate = useNavigate()
    const [logout , showLogout] = useState(false)
    const [userData , setUserData] = useState({})

    const sidebar_cont = [
        {
            title : "Home" ,
            logo : <HomeRoundedIcon fontSize="medium"/>,
            nav : "/"
        },
        {
            title : "Explore" ,
            logo : <SearchRoundedIcon fontSize="medium"/>,
            nav : "/explore"
        },
        {
            title : "Discover" ,
            logo : <PublicOutlinedIcon fontSize="medium"/>,
            nav : "/discover"
        },
        {
            title : "Notifications" ,
            logo : <NotificationsActiveRoundedIcon fontSize="medium"/>,
            nav : "/notifications"
        },
        {
            title : "Messages" ,
            logo : <EmailRoundedIcon fontSize="medium"/>,
            nav : "/message"
        },
        {
            title : "Bookmarks" ,
            logo : <BookmarkBorderRoundedIcon fontSize="medium"/>,
            nav : "/bookmark"
        },
        {
            title : "Profile" ,
            logo : <PersonRoundedIcon fontSize="medium"/>,
            nav : "/profile"
        }
    ]
    const HANDLE_LOGOUT = () =>{
        localStorage.removeItem("UserData")
        toast.success(`See you soon 😁👌` , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        if(JSON.parse(localStorage.getItem("UserData") === null)){
            navigate("/auth")
        }
    }

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("UserData"))
    setUserData(data)
  },[])


    return (
        <div className="w-[20%] text-white flex flex-col  space-y-5 font-kanit pt-5 relative overflow-hidden border-r-2 border-zinc-900" onMouseLeave={()=>showLogout(false)}>
            <img src={twitter2} alt="" className="h-8 w-8 ml-24"/>
            {
                sidebar_cont.map((ele)=>(
                    <div className="w-[70%] flex space-x-4 items-center hover:bg-twitter_gray duration-200 cursor-pointer px-3 py-2 rounded-2xl ml-10" onMouseEnter={()=>showLogout(false)} key={ele.title} onClick={()=>navigate(ele.nav)}>
                        {ele.logo}
                        <span className="text-xl ">{ele.title}</span>
                    </div>
                ))
            }
            <div className="text-xl text-center py-2 rounded-3xl w-[70%] ml-7 cursor-pointer hover:bg-sky-600 duration-300 hover:scale-105 bg-twitter_blue" onMouseLeave={()=>showLogout(false)} onMouseEnter={()=>showLogout(false)} onClick={()=>navigate("/")}>
                <span>Tweet</span>
            </div>
            {
                logout &&  <div className="bg-twitter_gray text-xl text-center py-2 rounded-3xl w-[70%] ml-7 cursor-pointer hover:bg-gray-800 duration-300 hover:scale-105" onMouseLeave={showLogout} onClick={HANDLE_LOGOUT}>
                <span>Logout</span>
            </div>
            }
            <div className="w-full px-4 flex justify-between absolute bottom-3  items-center">
                <img src={userData?.Image ? `${backEndUrl}${userData.Image}` : NOUSER} alt="" className="rounded-full overflow-hidden w-9 h-9 object-cover"/>
                <div className="flex flex-col space-y-1">
                    <span className="text-white">{userData?.Name}</span>
                    <span className="text-gray-400 text-xs">{userData?.Email}</span>
                </div>
                <MoreHorizOutlinedIcon onMouseEnter={()=>showLogout(true)} className="cursor-pointer hover:bg-twitter_gray rounded-2xl" />
            </div>
        </div>
    )
}

export default Sidebar