import axios from 'axios'
import React, { useState , useEffect } from 'react'
import bookmarkImage from "../assets/assets/bookmark.png"
import { baseUrl } from '../Creadentials'
import Post from "./Post"

const SubBookmark = () => {
    const [bookmark , setBookmark] = useState([])
    const [cond , setCond] = useState(false)

    const bookmarkCond = () =>{
        setCond(!cond)
    }

    const FETCH_BOOKMARK_POSTS = async (req , res) => {
        const UserData = JSON.parse(localStorage.getItem("UserData"))
        if(UserData !== null){
            await axios.get(`${baseUrl}/all-bookmarks/${UserData._id}`).then((res)=>{
                const resData = res.data.BookmarkData
                console.log(resData)
                setBookmark(resData)
            }).catch((err)=>{
                console.log(err.message)
            })
        }
    }

    useEffect(()=>{
        FETCH_BOOKMARK_POSTS()

    },[cond , ])


    return (
        <div className="w-[60%] overflow-scroll scrollbar-hide border-r-2 border-zinc-800">
            <div className="w-full flex flex-col px-10 py-3 h-[10%] sticky top-0 z-50 bg-black border-b-2 border-zinc-900">
                <span className='text-2xl font-semibold'>Bookmarks</span>
                <span className='text-gray-500'>Abhay Bisht</span>
            </div>
            <div className="w-full">
                {
                    bookmark.length > 0 ? <div className="flex flex-col">
                        {
                            bookmark.map((post)=>(
                                <Post post={post} fromBookmark={true} bookmarkCond={bookmarkCond}/>
                            ))
                        }
                       
                    </div> : <div className="flex flex-col items-center justify-center">
                        <img src={bookmarkImage} alt="" className="mt-20 w-[80%]"/>
                        <div className="flex flex-col space-y-5 text-center w-[50%]">
                            <span className="text-2xl font-semibold font-kanit text-zinc-200">Save Tweets for later</span>
                            <span className="text-md font-kanit">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SubBookmark