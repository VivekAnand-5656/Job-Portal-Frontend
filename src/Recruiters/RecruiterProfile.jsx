import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'

const RecruiterProfile = () => {
    const {token} = useContext(AuthContext)
    const [profile,setProfile] = useState({})
    const apibase = "https://job-portal-project-b2b0.onrender.com"

    const fetchProfile = async ()=>{
        try {
            const response = await axios.get(`${apibase}/recruiter/viewProfile`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setProfile(response.data)
            console.log(`User:- ${response.data}`);
            
        } catch (error) {
            console.log(`Error:- ${error}`);
            
        }
    }

    useEffect(()=>{
        if(token){
            fetchProfile()
        }
    },[token])

  return (
    <div>
        <div className="w-full min-h-screen bg-[#f8f3ff] p-6 flex flex-col items-center">

  {/* Banner */}
  <div className="w-full max-w-5xl h-52 bg-[#943CF3] rounded-3xl relative">
    
    <div className="absolute -bottom-12 left-10">
      <img
        src=""
        alt="profile"
        className="w-28 h-28 rounded-full border-4 border-white bg-white"
      />
    </div>

  </div>

  {/* Main Card */}
  <div className="w-full max-w-5xl bg-white mt-16 rounded-3xl shadow-lg p-8 flex flex-col gap-8">

    {/* Header */}
    <div className="flex justify-between items-start flex-wrap gap-4">

      <div>
        <h1 className="text-3xl font-bold">
          {profile.name}
        </h1>

        <p className="text-gray-600">
          Technical {profile.role} • {profile.company}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {profile.city}, {profile.state}, {profile.country}
        </p>
      </div>

      <button className="bg-[#943CF3] text-white px-6 py-2 rounded-lg">
        Edit Profile
      </button>

    </div>

    {/* About */}
    <div>
      <h2 className="text-xl font-semibold mb-3">
        About
      </h2>

      <p className="text-gray-600 leading-7">
        {profile.discription}
      </p>
    </div>

    {/* Company Section */}
    <div>

      <h2 className="text-xl font-semibold mb-4">
        Company Information
      </h2>

      <div className="flex flex-col gap-3">

        <div className="bg-[#f8f3ff] p-4 rounded-xl">
          <span className="font-semibold">Company:</span> {profile.company}
        </div>

        <div className="bg-[#f8f3ff] p-4 rounded-xl">
          <span className="font-semibold">Role:</span> {profile.role}
        </div>

        <div className="bg-[#f8f3ff] p-4 rounded-xl">
          <span className="font-semibold">Website:</span>
          <a
            href={profile.websiteurl}
            target="_blank"
            className="ml-2 text-[#943CF3]"
          >
            {profile.websiteurl}
          </a>
        </div>

      </div>

    </div>

    {/* Contact */}
    <div>

      <h2 className="text-xl font-semibold mb-4">
        Contact Information
      </h2>

      <div className="flex flex-col gap-3">

        <div className="bg-[#f8f3ff] p-4 rounded-xl">
          <span className="font-semibold">Email:</span>
          <span className="ml-2"> {profile.email} </span>
        </div>

        <div className="bg-[#f8f3ff] p-4 rounded-xl">
          <span className="font-semibold">Mobile:</span>
          <span className="ml-2">{profile.mobile}</span>
        </div>

        <div className="bg-[#f8f3ff] p-4 rounded-xl">
          <span className="font-semibold">Location:</span>
          <span className="ml-2">{profile.city}, {profile.state}, {profile.country}</span>
        </div>

      </div>

    </div>

  </div>

</div>
    </div>
  )
}

export default RecruiterProfile