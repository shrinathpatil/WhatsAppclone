import React from 'react'
import { Avatar } from '@mui/material'
import { useEffect ,useState} from 'react'
import "./SidebarChat.css"
import { Link } from "react-router-dom";

export default function SidebarChat({addNewChat,name,id,createChat}) {
    const [seed,setSeed]=useState("");

    useEffect(()=>{
    setSeed(Math.floor(Math.random()*100))
    },[])

   


  return !addNewChat?(
    <Link to={`/rooms/${id}`}>
      <div className="sidebar-chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarChat-info">
          <h2>{name}</h2>
          <p>Last Message...</p>
        </div>
      </div>
    
    </Link>
   
  ):(
    <div onClick={createChat} className="sidebar-chat">
    <h2>Add New Chat</h2>

    
    </div>
  )
}

