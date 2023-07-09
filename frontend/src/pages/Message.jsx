import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Rear from "../components/Rear"
import SubProfile from "../components/SubProfile"
import {useNavigate} from "react-router-dom"



const Message = () => {
  
  return (
    <div className="w-screen h-screen flex bg-black font-kanit text-white">
      <Sidebar />
      <SubProfile />
      <Rear />
    </div>
  )
}

export default Message