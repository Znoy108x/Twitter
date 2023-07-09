import React, { useState , useEffect } from 'react'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import Tweets from "../components/Tweets"
import Likes from "../components/Likes"
import Followers from "../components/Followers"
import Following from "../components/Following"
import nouser from "../assets/images/nouser.jpg"
import axios from 'axios';
import { baseUrl , backEndUrl} from '../Creadentials';
import { useNavigate } from 'react-router-dom';

const SubProfile = () => {
    const [active, setActive] = useState("Tweets")
    let [isOpen, setIsOpen] = useState(false)
    const [UserData , setUserData] = useState({})
    const [lp , setLp] = useState([])
    const [cond , setCont] = useState(false)
    const navigate = useNavigate()
    
    const profileCond = () =>{
        setCont(!cond)
    }
    const SubLiks = () => {
        if (active === "Tweets") {
            return <Tweets />
        } else if (active === "Likes") {
            return <Likes likedPosts={lp} profileCond={profileCond} fromProfile={true}/>
        } else if (active === "Followers") {
            return <Followers data={UserData.Followers} profileCond={profileCond}/>
        }
        return <Following data={UserData.Following} UserData={UserData} profileCond={profileCond}/>
    }
    
    const FETCH_USER_DATA = async () =>{
        const user = JSON.parse(localStorage.getItem("UserData"))
        const response = await axios.post(`${baseUrl}/user-data/${user._id}`).then(res => res.data.UserData)
        setUserData(response)
        let data = []
        for(let i = 0 ;i<response?.LikedPosts?.length ;i++){
            await axios.get(`${baseUrl}/postData/${response.LikedPosts[i]}`).then((res)=>{
                const response = res.data.Post
                data.push(response)
            }).catch((err)=>{
                console.log(err)
            })
        }
        setLp(data)
    }

    useEffect(() => {
        FETCH_USER_DATA()
    }, [cond , ]);
    return (
        <div className="w-[60%] overflow-scroll scrollbar-hide border-r-2 border-zinc-900">
            <div className="w-full flex flex-col px-10 py-3 h-[10%] sticky top-0 z-20 bg-black">
                <span className='text-2xl font-semibold'>{UserData?.Name}</span>
            </div>
            <div className="w-full h-[23%] relative ">
                <img src={UserData?.Banner ? `${backEndUrl}${UserData?.Banner}`: "https://img.freepik.com/free-vector/flat-jungle-composition-birds-fly-dense-jungle-pink-flamingos-large-parrots-vector-illustration_1284-74327.jpg?w=1380&t=st=1675095931~exp=1675096531~hmac=a17409d16893da08eb13e3bc778ad3f0a0d124a69e55653d9a25154a780e959a"} alt="" className="w-full h-full absolute left-0 top-0 object-cover" />
                <img src={UserData?.Image ? `${backEndUrl}${UserData?.Image}` : nouser} alt="" className="rounded-full w-40 h-40  absolute -bottom-20 left-10 border-4 border-black object-cover" />
            </div>
            <div className="w-full relative flex f">
                <button className="text-white text-lg font-light border-2 border-white rounded-3xl px-8 py-1 absolute right-3 top-3 hover:bg-white hover:text-black duration-300  cursor-pointer z-10" onClick={()=>navigate("/profile/edit")}>Edit</button>
                <div className="flex flex-col mt-24 pl-10">
                    <span className="text-white text-2xl font-bold">{UserData?.Name}</span>
                    <span className="text-gray-500">@{UserData?.UserName}</span>
                    <p className="text-sm tracking-wider mt-2">{UserData?.Bio?.length > 0 ? UserData.Bio : "Please update your bio 😢 !" }</p>
                    <div className="flex space-x-7 text-zinc-400 mt-1">
                        <span className="flex space-x-2 items-center">
                            <LocationOnRoundedIcon className='text-baby_blue'/>
                            <span>{UserData?.City} / {UserData?.Country}</span>
                        </span>
                        <span className="flex space-x-2 items-center">
                            <EventRoundedIcon className='text-baby_blue'/>
                            <span>Joined {UserData?.Joining}</span>
                        </span>
                    </div>
                    <div className="flex space-x-10 pl-1 text-zinc-400">
                        <span className="flex space-x-2">
                            <span>{UserData?.Following?.length}</span>
                            <span className="text-gray-500">Following</span>
                        </span>
                        <span className="flex space-x-2">
                            <span className="">{UserData?.Followers?.length}</span>
                            <span className="text-gray-500">Followers</span>
                        </span>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-4 px-10 w-full pt-3 border-b-2 border-zinc-900 mt-3">
                {
                    active === "Tweets" ? <span className="text-white border-b-4  border-twitter_blue  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center" >Tweets</span> : <span className="text-white border-b-4  border-black  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center hover:border-twitter_blue" onClick={() => setActive("Tweets")}>Tweets</span>
                }
                {
                    active === "Likes" ? <span className="text-white border-b-4  border-twitter_blue  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center" >Likes</span> : <span className="text-white border-b-4  border-black  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center hover:border-twitter_blue" onClick={() => setActive("Likes")}>Likes</span>
                }
                {
                    active === "Followers" ? <span className="text-white border-b-4  border-twitter_blue  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center" >Followers</span> : <span className="text-white border-b-4  border-black  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center hover:border-twitter_blue" onClick={() => setActive("Followers")}>Followers</span>
                }

                {
                    active === "Following" ? <span className="text-white border-b-4  border-twitter_blue  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center" >Following</span> : <span className="text-white border-b-4  border-black  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center hover:border-twitter_blue" onClick={() => setActive("Following")}>Following</span>
                }
            </div>
            {
                SubLiks()
            }
        </div>
    )
}

export default SubProfile