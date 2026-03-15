import Navbar from "../components/Navebar";
import { useState } from "react";
import axios from "axios";

export default function Create(){

  const [title,setTitle] = useState("");
  const [location,setLocation] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();

    await axios.post("/api/entries",{
      title,
      location
    });
  }

  return(
    <>
      <Navbar/>

      <form onSubmit={handleSubmit}>
        <input placeholder="title" onChange={(e)=>setTitle(e.target.value)}/>
        <input placeholder="location" onChange={(e)=>setLocation(e.target.value)}/>
        <button>Create Entry</button>
      </form>
    </>
  )
}