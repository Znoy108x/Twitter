import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Rear from "../components/Rear"
import axios from "axios"
import { baseUrl } from '../Creadentials'
import { useLocation } from 'react-router-dom'
import noMedia from "../assets/assets/no-media.png"
import Post from "../components/Post"

const TrendingTags = () => {
  const location = useLocation()
  const [post, setPost] = useState([])
  const [param , setParam] = useState("")
  const [cond , setCond] = useState(false)
  const tagsCond = () =>{
    setCond(!cond)
  }
  const FETCH_POST_BY_TAGS = async () => {
    const parm = location.pathname.split("/")[3]
    setParam(parm)
    await axios.get(`${baseUrl}/post/${parm}`).then((res) => {
      const response = res.data.PostTag
      setPost(response)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    FETCH_POST_BY_TAGS()
  }, [cond , ])

  return (
    <div className="w-screen h-screen flex bg-black font-kanit text-white">
      <Sidebar />
      <div className="w-[60%] overflow-scroll scrollbar-hide text-center pt-8 border-r-2 border-zinc-900">
        <span className=" text-4xl font-semibold tracking-wide border-b-4 border-baby_blue w-full pb-1">Explore - <span className="text-transparent bg-clip-text bg-blue_purple">{param}</span></span>
        {
          post.length > 0 ? <div className="mt-10 flex flex-col">
            {
              post.map((ele)=>(
                <div className="w-full" key={ele._id}>
                  <Post post={ele} tagsCond={tagsCond} fromTags={true}/>
                </div>
              ))
            }
          </div> :
            <div className="flex flex-col items-center justify-center mt-10">
              <img src={noMedia} alt="" className="w-[80%]" />
                <span className="text-3xl tracking-wider">No Media To Show</span>
            </div>
        }
      </div>
      <Rear />
    </div>
  )
}

export default TrendingTags