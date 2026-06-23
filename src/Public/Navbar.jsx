import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { FaUserLarge } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";



const Navbar = () => {
  const { token, role,logout } = useContext(AuthContext)
  const navigate = useNavigate() 
  
  const logingout = ()=>{
    logout()
    navigate("/")
  }
  return (
    <div className=' w-full h-[10vh] flex justify-around items-center bg-[#ffffff] ' >
      <h1 className=' font-bold ' >JOB<span className=' text-[#943CF3] ' >HUNT</span> </h1>
      {
        role === "candidate"?(
          <ul className=' flex font-semibold justify-center items-center gap-4 shadow-xl p-2 rounded-2xl ' >
        <li><NavLink to="home" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >Home</NavLink></li>
        <li><NavLink to="alljobs" className={({ isActive }) => isActive ? " text-[#943CF3] " : "text-[#000000] "} >Jobs</NavLink></li>
        <li><NavLink to="appliedjobs" className={({ isActive }) => isActive ? " text-[#943CF3] " : "text-[#000000] "} >Applied Jobs</NavLink></li>
        <li><NavLink to="savedjobs" className={({ isActive }) => isActive ? " text-[#943CF3] " : "text-[#000000] "} >Saved Jobs</NavLink></li>

      </ul>
        ):(
          <ul className=' flex font-semibold justify-center items-center gap-4 shadow-xl p-2 rounded-2xl ' >
        <li><NavLink to="recruiter" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >Home</NavLink></li>
        <li><NavLink to="myposts" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >My Posts</NavLink></li>
        <li><NavLink to="allcandidates" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >All Candidates</NavLink></li>
        <li><NavLink to="applicants" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >All Applicants</NavLink></li>
        <li><NavLink to="postjob" className={({ isActive }) => isActive ? " text-[#943CF3] flex justify-center items-center gap-1  " : " text-[#000000] flex justify-center items-center gap-1 "} >Post Job <MdAddBox/></NavLink></li>
         
      </ul>
        )
      }
      
      {
        token ? (
          <ul className=' flex justify-center items-center gap-4 font-semibold ' >
            <li onClick={logingout} ><NavLink className=" bg-[#943CF3] text-white px-1.5 rounded flex justify-center items-center border-[#ffffff] border hover:bg-[#ffffff] hover:text-[#943CF3]  hover:border-[#943CF3] transition-all duration-300 ease-in-out " >Logout</NavLink></li>
            {
              role === "candidate" ?(
                <li ><NavLink to="profile" className=" text-[#943CF3]  p-2 rounded-full flex justify-center items-center border-2 hover:bg-[#ffffff] hover:text-[#943CF3]  hover:border-[#943CF3] transition-all duration-300 ease-in-out " ><FaUserLarge/></NavLink></li>
              ):(
                <li ><NavLink to="recruiterprofile" className=" text-[#943CF3]  p-2 rounded-full flex justify-center items-center border-2 hover:bg-[#ffffff] hover:text-[#943CF3]  hover:border-[#943CF3] transition-all duration-300 ease-in-out " ><FaUserLarge/></NavLink></li>

              )
            }
            
          </ul>
        ) : (
          <ul className=' flex justify-center items-center gap-4 font-semibold ' >
            <li><NavLink to="/" className=" bg-[#943CF3] text-white px-1.5 rounded flex justify-center items-center border-[#ffffff] border hover:bg-[#ffffff] hover:text-[#943CF3] hover:border hover:border-[#943CF3] transition-all duration-300 ease-in-out " >Login</NavLink></li>
            <li><NavLink to="signup" className="bg-[#943CF3] text-white px-1.5 rounded flex justify-center items-center border-[#ffffff] border hover:bg-[#ffffff] hover:text-[#943CF3] hover:border hover:border-[#943CF3] transition-all duration-300 ease-in-out " >Signup</NavLink></li>
          </ul>
        )
      }


    </div>
  )
}

export default Navbar