import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { backEndUrl, baseUrl } from '../Creadentials';
import nouser from "../assets/images/nouser.jpg"
import noFollowers from "../assets/assets/no-followers.png"

const SubDiscover = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [cond, setCond] = useState(false)
    const discoverCond = () => {
        setCond(!cond)
    }
    const FETCH_ALL_USERS = async () => {
        const UserData = JSON.parse(localStorage.getItem("UserData"))
        if (UserData !== null) {
            setUser(UserData)
        }
        await axios.get(`${baseUrl}/all-users`).then((res) => {
            const response = res.data.AllUsers
            console.log(response)
            setUsers(response)
        }).catch((err) => {
            console.log(err)
        })
    }
    const HANDLE_FOLLOW_USER = async (toId) => {
        await axios.post(`${baseUrl}/follow-user`, {
            from: user._id,
            to: toId
        }).then((res) => {
            discoverCond()
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        FETCH_ALL_USERS()
    }, [cond,]);

    return (
        <div className="w-[60%] overflow-scroll scrollbar-hide border-r-2 border-zinc-900">
            <div className="w-full flex flex-col px-10 py-3 h-[10%] sticky top-0 z-50 bg-black">
                <span className='text-2xl font-semibold'>Abhay Bisht</span>
                <span className='text-gray-500'>5 Tweets</span>
            </div>
            <div className=" px-10 w-full pt-3 border-b-2 border-zinc-900 mt-3 flex justify-center">
                <span className="text-white border-b-4  border-twitter_blue  pb-2 shadow-sm cursor-pointer hover:bg-gray-500/20 duration-150 p-2 text-2xl"> Find People To Follow </span>
            </div>
            <div className="flex flex-col space-y-5 px-9 py-9">
                {
                    users.length === 0 ? <div className="flex items-center justify-center">
                        <img src={noFollowers} />
                    </div> : users.map((ele) => (
                        <>
                            {
                                (ele._id !==user._id && ele.Followers.find(ele2 => ele2._id === user._id) === undefined) && <div key={ele._id} className="flex justify-between w-[80%] hover:bg-zinc-900/50 p-2 rounded-xl duration-300">
                                    <img src={ele.Image ? `${backEndUrl}${ ele.Image }` : nouser} alt="" className="rounded-full w-12 h-12 object-cover" />
                                    <div className="w-[50%] flex flex-col  tracking-wide ">
                                        <span className="text-md">{ele.Name}</span>
                                        <span className="text-sm text-gray-300">{ele.Email}</span>
                                    </div>
                                    <span className="text-white text-md font-light border-2 border-white rounded-3xl px-8 py-1  hover:bg-white hover:text-black duration-300    flex items-center justify-center cursor-pointer" onClick={() => HANDLE_FOLLOW_USER(ele._id)}>Follow</span>
                                </div>
                            }
                        </>
                    ))
                }

            </div>
        </div>
    )
}

export default SubDiscover