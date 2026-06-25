import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { FaUserLarge } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";




const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isHam, setIsHam] = useState(false)

  const logingout = () => {
    logout()
    navigate("/")
  }
  return (
    <div className=' w-full h-[10vh] flex  sm:justify-around justify-between sm:p-0 p-2 items-center bg-[#ffffff] ' >
      <h1 className=' font-bold sm:text-2xl text-[1.3rem] ' >JOB<span className=' text-[#943CF3] ' >HUNT</span> </h1>
      {/* HAMBURGER */}
      {
        isHam ? (
          <IoIosCloseCircle onClick={() => setIsHam(false)} className=' sm:hidden flex text-3xl z-50   ' />
        ) : (
          <GiHamburgerMenu onClick={() => setIsHam(true)} className=' sm:hidden flex text-3xl z-50 ' />
        )
      }
      {
        role === "candidate" ? (
          <ul className={`${isHam ? "flex " : "hidden"} sm:flex sm:flex-row flex-col w-full sm:w-auto sm:h-full h-auto absolute sm:static top-15 sm:z-0 z-50 bg-[#ffffff]  font-semibold justify-center items-center sm:gap-4 gap-1.5 sm:shadow-xl p-2 sm:rounded-2xl`} >
            <li><NavLink to="home" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >Home</NavLink></li>
            <li><NavLink to="alljobs" className={({ isActive }) => isActive ? " text-[#943CF3] " : "text-[#000000] "} >Jobs</NavLink></li>
            <li><NavLink to="appliedjobs" className={({ isActive }) => isActive ? " text-[#943CF3] " : "text-[#000000] "} >Applied Jobs</NavLink></li>
            <li><NavLink to="savedjobs" className={({ isActive }) => isActive ? " text-[#943CF3] " : "text-[#000000] "} >Saved Jobs</NavLink></li>

          </ul>
        ) : (
          <ul className={`${isHam?"flex":"hidden"} sm:flex sm:flex-row flex-col w-full sm:w-auto sm:h-full h-auto absolute sm:static top-10 sm:z-0 z-50 bg-[#ffffff] font-semibold justify-center items-center sm:gap-4 gap-1.5 sm:shadow-xl p-2 sm:rounded-2xl`} >
            <li><NavLink to="recruiter" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >Home</NavLink></li>
            <li><NavLink to="myposts" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >My Posts</NavLink></li>
            <li><NavLink to="allcandidates" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >All Candidates</NavLink></li>
            <li><NavLink to="applicants" className={({ isActive }) => isActive ? " text-[#943CF3] " : " text-[#000000] "} >All Applicants</NavLink></li>
            <li><NavLink to="postjob" className={({ isActive }) => isActive ? " text-[#943CF3] flex justify-center items-center gap-1  " : " text-[#000000] flex justify-center items-center gap-1 "} >Post Job <MdAddBox /></NavLink></li>

          </ul>
        )
      }

      {
        token ? (
          <ul className={` ${isHam ? "flex" : "hidden"} sm:flex sm:h-full sm:flex-row sm:z-0 z-50 flex-col absolute sm:static top-50 sm:w-auto w-full bg-[#ffffff] justify-center items-center gap-4 font-semibold`} >
            <li onClick={logingout} ><NavLink className=" bg-[#943CF3] text-white px-1.5 rounded flex justify-center items-center border-[#ffffff] border hover:bg-[#ffffff] hover:text-[#943CF3]  hover:border-[#943CF3] transition-all duration-300 ease-in-out " >Logout</NavLink></li>
            {
              role === "candidate" ? (
                <li ><NavLink to="profile" className=" text-[#943CF3]  p-2 rounded-full flex justify-center items-center border-2 hover:bg-[#ffffff] hover:text-[#943CF3]  hover:border-[#943CF3] transition-all duration-300 ease-in-out " ><FaUserLarge /></NavLink></li>
              ) : (
                <li ><NavLink to="recruiterprofile" className=" text-[#943CF3]  p-2 rounded-full flex justify-center items-center border-2 hover:bg-[#ffffff] hover:text-[#943CF3]  hover:border-[#943CF3] transition-all duration-300 ease-in-out " ><FaUserLarge /></NavLink></li>

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