import React from 'react'
import Sidebar from '../components/Sidebar'
import Middle from "../components/Middle"
import Rear from "../components/Rear"
import { Navigate, useNavigate } from 'react-router-dom'


const Home = () => {
  
  return (
    <div className="w-screen h-screen flex bg-black">
      <Sidebar />
      <div className="w-[60%] h-screen overflow-scroll scrollbar-hide border-r-2 border-zinc-900">
        <Middle />
      </div>
      <Rear />
    </div>
  )
}
export default Home