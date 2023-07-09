import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Rear from "../components/Rear"
import SubProfile from "../components/SubProfile"
import {useNavigate} from "react-router-dom"


const NotFound = () => {
  
  return (
    <div className="w-screen h-screen flex bg-black font-kanit text-white">
      <Sidebar />
      <div className='w-[60%] border-r-2 border-zinc-900 flex items-center justify-center'>
            <span className="font-black text-transparent bg-clip-text bg-green_lime text-6xl">Page Under Construction</span>
      </div>
      <Rear />
    </div>
  )
}

export default NotFound