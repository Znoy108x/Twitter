import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React from 'react'
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import axios from 'axios';
import { baseUrl } from '../Creadentials';
import {toast} from "react-toastify"


const PopoverComp = ({ref1 , post , fromBookmark , bookmarkCond}) => {
    const HANDLE_ADD_BOOKMARK = async () =>{
        const UserData = JSON.parse(localStorage.getItem("UserData"))
        if(UserData !== null){
            console.log(post._id , UserData._id)
            await axios.post(`${baseUrl}/bookmark/${post._id}/${UserData._id}`).then(res => {
                toast.success("Post Bookmarked 👌!")
            }).catch((err)=>{
                toast.error(err.response.data.message)
            })
        }
    }

    const HANDLE_REMOVE_BOOKMARK = async () =>{
        const UserData = JSON.parse(localStorage.getItem("UserData"))
        if(UserData !== null){
            console.log(post._id , UserData._id)
            await axios.post(`${baseUrl}/remove-bookmark/${post._id}/${UserData._id}`).then(res => {
                bookmarkCond()
                toast.success("Removed From Bookmark 😊!")
            }).catch((err)=>{
                toast.error(err.response.data.message)
            })
        }
    }
   
    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div  className='hidden'>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium bg-twitter_blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" ref={ref1}>
                        Options
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute -right-8 -top-5 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                        <div className="px-1 py-1">
                            <Menu.Item >
                                {({ active }) => (
                                    <button onClick={()=>{
                                        if(!fromBookmark){
                                            HANDLE_ADD_BOOKMARK()   
                                        }else{
                                            HANDLE_REMOVE_BOOKMARK()
                                        }
                                    }}
                                        className={`${active ? 'bg-sky-300/20  ' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <TurnedInNotOutlinedIcon
                                                className="mr-2 h-5 w-5 text-twitter_blue"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <TurnedInNotOutlinedIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        {
                                            !active ?<span className="text-gray-900">Book Mark</span> : <span className="text-twitter_blue">Bookmark</span>

                                        }
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default PopoverComp