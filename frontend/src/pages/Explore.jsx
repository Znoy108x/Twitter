import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Rear from "../components/Rear"
import SubTags from "../components/SubTags"
import {useNavigate} from "react-router-dom"


const Explore = () => {
 
  return (
    <div className="w-screen h-screen flex bg-black font-kanit text-white">
      <Sidebar />
      <SubTags />
      <Rear />
    </div>
  )
}

export default Explore