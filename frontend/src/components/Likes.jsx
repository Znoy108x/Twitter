import React from 'react'
import Post from "./Post"

const Likes = ({likedPosts , profileCond ,fromProfile }) => {
  console.log(likedPosts)
  return (
    <div className="w-full pt-3 pl-2">
        {
          likedPosts?.map((post)=>(
            <Post post={post} profileCond={profileCond} fromProfile={fromProfile}/>
          ))
        }
    </div>
  )
}

export default Likes