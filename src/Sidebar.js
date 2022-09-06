import React from 'react'

import {useState,useEffect} from "react"
import { Avatar, IconButton } from "@mui/material"
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from "./SidebarChat"
import { useStateValue } from './StateProvider'; 

import {db} from "./firebase-config"
import {getFirestore,query,getDocs,updateDoc,doc,deleteDoc,collection,where,addDoc,onSnapshot} from "firebase/firestore"
import "./Sidebar.css"


export default function Sidebar() {
const [rooms,setRooms]=useState([]);
const [{user},dispatch]=useStateValue();

const usersCollectionref=collection(db,"rooms")


useEffect(()=>{
 const getRooms=async()=>{
    const data=await getDocs(usersCollectionref);

    setRooms(data.docs.map((doc)=>({
        ...doc.data(),id:doc.id
      })))
 }
 getRooms()
},[rooms])

const createChat=async()=>{
    const roomName=prompt("please enter name for chat").trim();

    if(roomName!==""){
        await addDoc(usersCollectionref,{name:roomName})

        window.alert("Room Added Successfully !");

    }
    else{
        window.alert("Enter Valid Room Name!");
    }
   };

  return (
    <div className="sidebar">
    <div className="sidebar-header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar-headerRight">
            <IconButton>
                <DonutLargeIcon/>
            </IconButton>
            <IconButton>
                <ChatIcon/>
            </IconButton>
            <IconButton>
                <MoreVertIcon/>
            </IconButton> 
        </div>
    
    </div>
    <div className="sidebar-search">
        <div className="sidebar-searchcontainer" >
            <SearchOutlinedIcon/>
            <input  placeholder="search or start new chat" type="text"/>
        </div>
 
    </div>
    <div className="sidebar-chats">
         <SidebarChat addNewChat createChat={createChat}/>
         {
            rooms.map((room)=>{
              return  <SidebarChat key={room.id} name={room.name} id={room.id} />
            })
         }
        
            
            
    
    
    </div>
    </div>
  )
}
