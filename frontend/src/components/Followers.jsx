import React from 'react'
import nofollowers from "../assets/assets/no-followers.png"
import { backEndUrl } from '../Creadentials'
import nouser from "../assets/images/nouser.jpg"

const Followers = ({data}) => {
   
    return (
        <div className='flex flex-col space-y-5 mt-6 mb-2 pl-20 pt-2'>
            {
                data && data.length>0 ? data.map((ele) => (
                    <div key={ele.Name} className="flex justify-between w-[80%] ">
                        <img src={ele.Image ? backEndUrl + ele.Image : nouser } alt="" className="rounded-full w-12 h-12 object-cover" />
                        <div className="w-[50%] flex flex-col  tracking-wide ">
                            <span className="text-md">{ele.Name}</span>
                            <span className="text-sm text-gray-300">{ele.Email}</span>
                        </div>
                        <span className="text-white text-md font-light border-2 border-white rounded-3xl px-8 py-1  hover:bg-white hover:text-black duration-300    flex items-center justify-center cursor-not-allowed">Remove</span>
                    </div>
                )) : <div className="">
                    <img src={nofollowers} alt="" />
                </div>
            }
        </div>
    )
}

export default Followers