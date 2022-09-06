import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { Avatar, IconButton } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import MoreVert from '@mui/icons-material/MoreVert';
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import "./Chat.css"
import {db} from "./firebase-config"
import {getFirestore,query,getDocs,updateDoc,doc,deleteDoc,collection,where,addDoc,onSnapshot, getDoc} from "firebase/firestore"


export default function Chat() {
  const [seed,setSeed]=useState("");
  const [input,setInput]=useState("")
  const {roomId}=useParams();
  const [roomName,setRoomName]=useState("")
  const [messages,setMessages]=useState([])
  const [chat,setChat]=useState({})

  const usersCollectionref=collection(db,"rooms")
  const usersCollectionmsg=collection(db,"messageRooms")

  useEffect(()=>{
    messages.forEach((msg)=>{
    if(msg.id===roomId){
      setChat(msg);
    }

    },[roomId])


  },[roomId])
console.log(chat)

  useEffect(()=>{
    const getChatName=async()=>{
      const msg=await getDocs(usersCollectionmsg);

      const msgArr=msg.docs.map((doc)=>({
        ...doc.data(),id:doc.id
      }))

     
      setMessages(msgArr);
    }
    getChatName();
  },[roomId])

// console.log(messages);
  


  
  useEffect(()=>{
    if(roomId){
      const getRoomName=async()=>{
        const data= await getDocs(usersCollectionref);  

        const roomArr=data.docs.map((doc)=>({
          ...doc.data(),id:doc.id
        }))
 
        roomArr.map((room)=>{
          if(room.id===roomId){
            setRoomName(room.name)
          }
        })
 
     }
     
getRoomName()
    }

  },[roomId])
 
 

  useEffect(()=>{
   setSeed(Math.floor(Math.random()*500))
  },[roomId])

 
 const sendMessage=(e)=>{
 e.preventDefault();

 setInput(prevInput=>"");
}


return (
  <div className="chat">
      <div className="chat-header">
       <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat-headerinfo">
          <h3>{roomName}</h3>
          <p>Last Seen at...</p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
                <SearchOutlined/>
          </IconButton>
          <IconButton>
              <AttachFileIcon/>
          </IconButton>
          <IconButton>
              <MoreVert/>
          </IconButton>          
        </div>
      </div>


      <div className="chat-body">
      {<p className={`chat-message ${true && 'chat-receiver'}`}>
      <span className='chat-name'>{chat.name}</span>
      {chat.message}
      <span className='chat-time'>
      {new Date(chat.timestamp?.toDate()).toUTCString()}</span>
      </p>}
      
      
       
      </div>
      <div className="chat-footer">
          <InsertEmoticonIcon/>
          <form>
           <input type="text" value={input} placeholder="Type a message" onChange={e=>setInput(e.target.value)} />
           <button onClick={sendMessage} type="submit">Send a message</button>
          </form>
          <MicIcon/>
      
      </div>

  
  </div>
)
}


