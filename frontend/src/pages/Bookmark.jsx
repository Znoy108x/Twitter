import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Rear from "../components/Rear"
import SubProfile from "../components/SubProfile"
import {useNavigate} from "react-router-dom"
import SubBookmark from "../components/SubBookmark"

const Bookmark = () => {
  
  return (
    <div className="w-screen h-screen flex bg-black font-kanit text-white">
      <Sidebar />
      <SubBookmark />
      <Rear />
    </div>
  )
}

export default Bookmark