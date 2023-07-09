import axios from 'axios'
import React,{useEffect , useState} from 'react'
import Post from "./Post"
import { baseUrl } from '../Creadentials'

const Tweets = () => {
  const [post , setPost] = useState([])
  const [user , setUser] = useState([])

 

  const USER_DATA = async () =>{
    const UserData = JSON.parse(localStorage.getItem("UserData"))
    if(UserData !== null){
      setUser(UserData)
      await axios.get(`${baseUrl}/posts/${UserData._id}`).then((res)=>{
        const posts = res.data.PostData 
        setPost(posts)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  useEffect(()=>{
    USER_DATA()
  },[])


  return (
    <div className="w-full pt-3 pl-2 flex flex-col">
      {
        post.map((ele)=>(
          <div key={ele._id}>
            <Post post={ele}/>
          </div>
        ))
      }
    </div>
  )
}

export default Tweets