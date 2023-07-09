import axios from 'axios'
import React, { useState, useEffect } from 'react'
import noReTweets from "../assets/assets/no-retweets.png"
import { baseUrl } from '../Creadentials'
import {useNavigate} from "react-router-dom"

const SubProfile = () => {
    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    const FETCH_TAGS = async () => {
        await axios.get(`${baseUrl}/trending`).then((res) => {
            const response = res.data.Tags
            setTags(response)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        FETCH_TAGS()
    }, []);
    return (
        <div className="w-[60%] overflow-scroll scrollbar-hide text-center pt-8 border-r-2 border-zinc-800">
            <span className="text-4xl font-semibold tracking-wide ">Explore</span>
            <div className="w-full px-10  pt-3 border-b-2 border-zinc-900 mt-3 pb-3">
                <span className="text-white border-b-4  border-blue-pu pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-center text-md">All Trending Tags</span>
            </div>
            <div className="flex flex-col">
                {
                    tags.length > 0 ? <div className="flex flex-col py-7">
                        {
                            tags.map((tag) => (
                                <div className="w-full flex justify-between px-10 items-center border-b-2 border-zinc-900 py-3 hover:bg-zinc-800/30" >
                                    <div className="flex flex-col h-full relative ">
                                        <span className="text-2xl tracking-wider">{tag.key}</span>
                                        <span className="text-sm text-gray-300 text-left">{tag.value} Tweets</span>
                                    </div>
                                    <button className="bg-baby_blue text-white hover:scale-105 duration-300 cursor-pointer px-5  rounded-3xl text-xl w-[9vw] h-[6vh] hover:bg-rose-500" onClick={()=>navigate(`/explore/trending/${tag.key.slice(1 , tag.key.length)}`)}>See Tweets</button>
                                </div>
                            ))
                        }
                    </div> : <div className="w-full flex flex-col items-center justify-center mt-4">
                        <img src={noReTweets} alt="" className="w-[80%]" />
                    </div>
                }
            </div>
        </div>
    )
}

export default SubProfile