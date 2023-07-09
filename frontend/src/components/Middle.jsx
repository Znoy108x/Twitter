import React, { useState, useEffect, useRef } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import SlowMotionVideoRoundedIcon from '@mui/icons-material/SlowMotionVideoRounded';
import TagsPopup from "./TagsPopup"
import {baseUrl} from '../Creadentials';
import Post from "./Post"
import axios from "axios"
import {toast} from "react-toastify"
import nouser from "../assets/images/nouser.jpg"
import {backEndUrl} from "../Creadentials"

const Middle = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState(true)
    const [selectedTag, setSelectedTag] = useState("d")
    const [fileSelected , setFileSelected] = useState(false)
    const [UserData , setUserData] = useState({})
    const [posts , setPosts] = useState([])
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const [cond , setCond] = useState(false)

    const feedCond= () =>{
        setCond(!cond)
    }

    const addImage = () => {
        ref1.current?.click()
        // FileTracker()
    }
    const addVideo = () => {
        ref2.current?.click()
        // FileTracker()
    }
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const [postData , setPostData] = useState({
        Description : "" ,
        Image : "" ,
         Tags : ""
    })
    const ADD_POST_FUNCTION = async () =>{
        console.log(postData.Tags.split(" "))
        const isImage = ref1.current.files[0]
        const isVideo = ref2.current.files[0]
        console.log(isVideo)
        const PostData = new FormData()
        PostData.append("User" , UserData._id)
        PostData.append("Description" ,postData.Description )
        PostData.append("Image" , isImage)
        PostData.append("Video" , isVideo)
        PostData.append("Tags" , postData.Tags.split(" "))
        PostData.append("Likes" , 0)
        if(isImage && isVideo){
            await axios.post(`${baseUrl}/add-image-video-post` , PostData).then((res)=>{
                toast.success(res.data.message)
                setPostData({
                    Description : "" ,
                    Image : "" ,
                     Tags : ""
                })
            }).catch((err)=>{
                toast.success(err.message)
            })
        }else if(isImage){
            await axios.post(`${baseUrl}/add-image-post` , PostData).then((res)=>{
                toast.success(res.data.message)
                setPostData({
                    Description : "" ,
                    Image : "" ,
                     Tags : ""
                })
            }).catch((err)=>{
                toast.success(err.message)
            })
        }else if(isVideo){
                await axios.post(`${baseUrl}/add-video-post` , PostData).then((res)=>{
                    toast.success(res.data.message)
                    setPostData({
                        Description : "" ,
                        Image : "" ,
                         Tags : ""
                    })
                }).catch((err)=>{
                    toast.success(err.message)
                })
        }else{
            
            await axios.post(`${baseUrl}/add-text-post` , { "User" : UserData._id , "Description" : postData.Description   , "Tags" :  postData.Tags.split(" ") , "Likes" : 0} ).then((res)=>{
                toast.success(res.data.message)
                setPostData({
                    Description : "" ,
                    Image : "" ,
                     Tags : ""
                })
            }).catch((err)=>{
                toast.error(err.message)
            })
        }
    }
    
    const FETCH_ALL_POSTS = async ()=>{
        await axios.get(`${baseUrl}/all-posts`).then((res)=>{
            const data = res.data.PostsData
            setPosts(data)
        }).catch((err)=>{
            toast.error(err.message)
        })
    }

    useEffect(() => {
        const UserData = JSON.parse(localStorage.getItem("UserData"))
        setUserData(UserData)
        FETCH_ALL_POSTS()
    }, [posts , cond , ]);


    
    return (
        <div className="w-full  border-r-2 border-zinc-900  font-kanit flex flex-col space-y-6">
            <div className='px-3 pt-3 border-b-2 border-zinc-900 flex flex-col items-center '>
                <span className="text-white tracking-wide text-2xl ">Welcome Homie</span>
                <div className="flex justify-center space-x-72 w-full">
                    {
                        active ? <span className="text-white border-b-4  border-twitter_blue  pb-2 shadow-sm cursor-pointer" >For You</span> : <span className="text-white pb-2 shadow-sm cursor-pointer border-b-2 border-black" onClick={() => setActive(true)}>For You</span>
                    }
                    {
                        !active ? <span className="text-white border-b-4  border-twitter_blue  pb-2 shadow-sm cursor-pointer" >Following</span> : <span className="text-white pb-2 shadow-sm cursor-pointer border-b-2 border-black" onClick={() => setActive(false)}>For You</span>
                    }
                </div>
            </div>
            <div className="w-full h-[230px]  flex justify-between border-b-2 border-zinc-900 px-5 pt-4">
                <img src={UserData?.Image ? `${backEndUrl}${UserData.Image}` : nouser} alt="" className="rounded-full w-16 h-16 object-cover" />
                <div className="w-[90%] h-full flex flex-col">
                    <textarea type="text" className="bg-black h-3/5 text-xl tracking-wide p-1 outline-none text-gray-400 border-none" placeholder="What's Happening ?" style={{ resize: "none" }} name="Description" value={postData.Description } onChange={(e) => setPostData({...postData , [e.target.name] : e.target.value})}/>
                    <textarea type="text" className="bg-black h-3/5 text-xl tracking-wide p-1 outline-none text-baby_blue border-none mt-2" placeholder="Enter tags seperated by space ! 👍 Eg : #India #WoW" style={{ resize: "none" }} name="Tags" value={postData.Tags} onChange={(e) => setPostData({...postData , [e.target.name] : e.target.value})}/>

                    <div className="flex space-x-1 items-center h-2/5 w-full relative">
                        <TagRoundedIcon className="text-twitter_blue hover:bg-sky-300/20 cursor-pointer scale-110 duration-300 p-2 rounded-full" fontSize="large" onClick={openModal} />

                        {
                            !fileSelected && <>
                             <AddPhotoAlternateOutlinedIcon className="text-twitter_blue hover:bg-sky-300/20 cursor-pointer scale-110 duration-300 p-2 rounded-full" fontSize="large" onClick={() => addImage()} />
                        <SlowMotionVideoRoundedIcon className="text-twitter_blue hover:bg-sky-300/20 cursor-pointer scale-110 duration-300 p-2 rounded-full" fontSize="large" onClick={() => addVideo()} />
                        </>
                        }
                       
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg ,image/jpg" className="hidden" ref={ref1} />
                        <input type="file" id="avatar" name="avatar" accept="video/mp4 , video/gif , video/quicktime" className="hidden" ref={ref2} />
                        <button className="text-xl text-center  rounded-3xl w-[13%] py-1  cursor-pointer hover:bg-sky-600 duration-300 hover:scale-105 bg-twitter_blue text-white" onClick={ADD_POST_FUNCTION}>
                            <span>Tweet</span>
                        </button>
                        <TagsPopup isOpen={isOpen} setSelectedTag={setSelectedTag} closeModal={closeModal} />
                    </div>
                </div>
            </div>
            {
                posts && posts.map((post)=>(
                    <div key={post._id}>
                        <Post post={post} feedCond={feedCond} fromHome={true} UserData={UserData}/>
                    </div>
                ))
            }
        </div>
    )
}
export default Middle