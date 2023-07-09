import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Selector from "../components/Selector"
import ImageSelector from "../components/ImageSelector"
import TextArea from '../components/TextArea'
import NameComp from "../components/NameComp"
import UsernameComp from "../components/UsernameComp"
import { State } from "../data/State.js"
import { City } from "../data/City.js"
import { useRef } from 'react'
import Sidebar from '../components/Sidebar'
import Rear from "../components/Rear"
import React from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { baseUrl } from '../Creadentials'

const EditProfile = () => {
    const banner = useRef()
    const image = useRef()
    const bio = useRef()
    const name = useRef()
    const username = useRef()
    const state = useRef()
    const city = useRef()


    const HANDLE_EDIT_PROFILE = async () => {
        if( image.current.files[0] && banner.current.files[0] && bio.current.value && name.current.value && username.current.value &&  state.current.value && city.current.value ){
            const UserData = JSON.parse(localStorage.getItem("UserData"))
            const UserForm = new FormData()
            UserForm.append("Image" , image.current.files[0])
            UserForm.append("Banner" , banner.current.files[0])
            UserForm.append("Bio" , bio.current.value)
            UserForm.append("Name" , name.current.value)
            UserForm.append("UserName" ,username.current.value )
            UserForm.append("State" , state.current.value)
            UserForm.append("City" , city.current.value )
            UserForm.append("Country" , "India")
            await axios.put(`${baseUrl}/update-profile/${UserData._id}`, UserForm).then((res)=>{
                toast.success(res.data.message)
                console.log(res.data.NewUser)
            }).catch(err =>{
                toast.error(err.response?.data?.message)
            })
        }else{
            toast.error("Please fill the form properly !")
        }
    }

    return (
        <div className="w-screen h-screen flex bg-black font-kanit text-white">
            <Sidebar />
            <div className="overflow-y-auto min-h-screen w-[60%] font-kanit border-r-2 border-zinc-900">
                <div className="w-full flex flex-col px-10 py-3 h-[10%] sticky top-0 z-20 bg-black border-b-2 border-zinc-800">
                    <span className='text-2xl font-semibold'>Edit Profile</span>
                </div>
                <div className="h-[90%] flex flex-grow items-center justify-center p-4 text-center " style={{ maxHeight: "90vh" }}>
                    <div className="bg-zinc-900 p-5 rounded-2xl z-50">
                        <div className="flex space-x-8 items-center">
                            <Selector data={State} helperTxt={"Selete your state !"} isState={true} state={state}/>
                            <Selector data={City} helperTxt={"Select your city !"} isState={false} city={city}/>
                        </div>
                        <div className="flex space-x-7">
                            <ImageSelector helperTxt={"Upload your profile picture !"} image={image} isImage={true}/>
                            <ImageSelector helperTxt={"Upload your banner  !"} banner={banner}  isImage={false} />
                        </div>
                        <TextArea bio={bio}/>
                        <div className="flex space-x-10 items-center">
                            <NameComp name={name} />
                            <UsernameComp username={username} />
                            <button className="text-md font-kanit tracking-wider text-center py-2 rounded-3xl w-32 h-10  ml-12 cursor-pointer hover:bg-sky-600 duration-300 hover:scale-105 bg-baby_blue text-white " onClick={HANDLE_EDIT_PROFILE}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Rear />
        </div>
    )
}

export default EditProfile