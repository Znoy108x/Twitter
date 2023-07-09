import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Rear from "../components/Rear"
import SubDiscover from "../components/SubDiscover"

const Discover = () => {
 
  return (
    <div className="w-screen h-screen flex bg-black font-kanit text-white">
      <Sidebar />
      <SubDiscover />
      <Rear />
    </div>
  )
}

export default Discover