import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { IoEyeSharp } from "react-icons/io5";
import { TiDelete, TiDeleteOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import AddEducation from '../Candidates/AddEcucation';
import AddProjects from '../Candidates/AddProjects';
import UpdateEducation from '../Candidates/UpdateEducation';



const Profile = () => {
    const { token, showEdu, setShowEdu,showPro,showUpdateEdu,setShowUpdateEdu } = useContext(AuthContext)
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
      
    // ----- Add Skill --- 
    const [skil,setSkil] = useState("")

    const apibase = "https://job-portal-project-b2b0.onrender.com"
    const getProfile = async () => {
        try {
            const response = await axios.get(`${apibase}/candidate/myprofile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(`Profile:- ${response.data.name}`);
            setProfile(response.data)

        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }
    // ================ Delete Skill ==========
    const deleteSkill = async (skillTxt)=>{
        try {
            const response = await axios.delete(`${apibase}/candidate/deleteskill/${skillTxt}`,
                 {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                 }
            )
            getProfile()
            alert("Skill Delete")
        } catch (error) {
            console.log(`Error:- ${error}`);
            
        }
    }
    // ======== Add Skill ======
    const addSkill = async ()=>{
        try {
            const data = {
                skills:[skil]
            }
            const response = await axios.patch(`${apibase}/candidate/updateskill`,data,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            alert("Skill Added")
            getProfile() 
            setSkil("")

        } catch (error) {
            console.log(`Error:- ${error}`);
            
        }
    }
    // =========== Delete Education ==== 
    const deleteEducation = async (leveltxt)=>{
        try {
            const response = await axios.delete(`${apibase}/candidate/deleteeducation/${leveltxt}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            alert("Delete Education")
            getProfile() 
        } catch (error) {
            console.log(`Error:- ${error}`);
            
        }
    }
    // =========== Delete Project ==== 
    const deleteProject = async (projecttxt)=>{
        try {
            const response = await axios.delete(`${apibase}/candidate/deleteproject/${projecttxt}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            alert("Delete Project")
            getProfile() 
        } catch (error) {
            console.log(`Error:- ${error}`);
            
        }
    }
    useEffect(() => {
        if (token) {
            getProfile()
        }
    }, [token])
    return (
        <div className="max-w-6xl flex flex-col mx-auto p-6 space-y-6">

            <button 
            onClick={()=>navigate("/updateprofile")}
            className=' bg-[#943CF3] text-white cursor-pointer p-2 rounded-2xl self-end ' >Update Profile</button>
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <p className="text-purple-600 font-medium">
                        {profile.headline}
                    </p>

                    <p className="text-gray-600 mt-2">
                        {profile.city}, {profile.state},{profile.country}
                    </p>

                    <p className="mt-4 text-gray-700">
                        {profile.bio}
                    </p>
                </div>

                <div className="text-right">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {
                            profile.is_open_to_work ? (
                                "Open To Work"
                            ) : (
                                "No"
                            )
                        }
                    </span>

                    <p className="mt-3 font-semibold">
                        Expected Salary
                    </p>
                    <p>{profile.expected_salary}</p>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>

                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Mobile:</strong> {profile.mobile}</p>
                    <p><strong>Notice Period:</strong> {profile.notice_period}</p>
                    <p><strong>Status:</strong> {profile.status}</p>
                </div>
            </div>

            {/* Skills */}
            <div className="bg-white flex flex-col gap-3 rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Skills</h2>

                <div className="flex flex-wrap gap-2">
                    {
                        (profile?.skills || []).length > 0 ? (
                            profile.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex justify-center items-center gap-2 "
                                >
                                    {skill} <span 
                                    onClick={()=>deleteSkill(skill)}
                                    className=' cursor-pointer text-[#ff0000] ' ><TiDeleteOutline /></span>
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-400">No skills added</p>

                        )
                    }
            {/* === Show Skill Add ==== */}
                    <div className=' w-full border p-2 rounded ' >
                        <input type="text" 
                        value={skil}
                        onChange={(e)=>setSkil(e.target.value)}
                        className=' outline-none rounded w-[95%] '
                        placeholder=' Add Skill.... ' />

                    </div>
                </div>
                <button 
                onClick={addSkill}
                className=' bg-[#943CF3] text-white cursor-pointer p-2 rounded-2xl  ' >Add Skills</button>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Education</h2>

                {
                    (profile?.education || []).length > 0 ? (
                        profile.education.map((edu, index) => (
                            <div key={index} className="border-l-4 border-purple-500 pl-4 mb-4">
                                <div className=' flex justify-end text-2xl items-center gap-3 ' >
                                    <MdDelete 
                                    onClick={()=>deleteEducation(edu.level)}
                                    className=' cursor-pointer text-[#ff0000] ' />
                                    <FiEdit 
                                    // onClick={()=>setShowUpdateEdu(true)}
                                    className=' cursor-pointer  ' />
                                </div>

                                <h3 className="font-semibold">{edu.degree}</h3>
                                <p>{edu.level}</p>
                                <p>{edu.institution_name}</p>
                                <p>{edu.field_of_study}</p>
                                <p>{edu.start_year} - {edu.end_year}</p>
                                <p>{edu.cgpa_percentage}</p>
                            </div>
                        ))
                    ) : (

                        <p className="text-gray-400">No Education added</p>
                    )
                }
                <button
                    onClick={() => setShowEdu(true)}
                    className=' bg-[#943CF3] text-white cursor-pointer p-2 rounded-2xl  ' >Add Education</button>
            </div>
            {/* ================= Show Education ========= */}

            {/* {
                showUpdateEdu ? (
                    <div className='w-full fixed top-0  flex justify-center items-center right-0 ' >
                        <UpdateEducation />
                    </div>
                ) : null
            } */}
            {
                showEdu ? (
                    <div className='w-full fixed top-0  flex justify-center items-center right-0 ' >
                        <AddEducation />
                    </div>
                ) : null
            }

            {/* Projects */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Projects</h2>

                {
                    (profile?.projects || []).length > 0 ? (
                        profile.projects.map((project, index) => (
                            <div key={index} className="border rounded-xl p-4 mb-4">
                                <div className=' flex justify-end text-2xl items-center gap-3 ' >
                                    <MdDelete
                                    onClick={()=>deleteProject(project.title)}
                                    className=' cursor-pointer text-[#ff0000] ' />
                                    <FiEdit className=' cursor-pointer  ' />
                                </div>
                                <h3 className="font-semibold text-lg">
                                    {project.title}
                                </h3>

                                <p className="text-gray-600 mt-2">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {
                                        project.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-100 px-2 py-1 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))
                                    }
                                </div>

                                <div className="mt-3 flex gap-4">
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        className="text-blue-600"
                                    >
                                        Live Project
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No Projects added</p>
                    )
                }
                <button 
                onClick={()=>setShowPro(true)}
                className=' bg-[#943CF3] text-white cursor-pointer p-2 rounded-2xl  ' >Add Projects</button>
            </div>
            {/* ================= Show Project ========= */}

            {
                showPro ? (
                    <div className='w-full fixed top-0  flex justify-center items-center right-0 ' >
                        <AddProjects />
                    </div>
                ) : null
            }

            {/* Resume */}
            <div className="bg-white flex justify-between rounded-2xl gap-2  shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Resume</h2>
                <div className=' flex gap-4 ' >
                    <a
                        href={profile.resume_url}
                        target="_blank"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg flex justify-center items-center gap-2 "
                    >
                        View Resume <IoEyeSharp />
                    </a>
                    <button className=' bg-[#943CF3] text-white cursor-pointer p-2 rounded-2xl self-end ' >Update Resume</button>
                </div>

            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Links</h2>

                <div className="flex gap-4">
                    <a href={profile.linkedin_url} target="_blank">
                        LinkedIn
                    </a>

                    <a href={profile.portfolio_url} target="_blank">
                        Portfolio
                    </a>

                    {
                        profile.github_url &&
                        <a href={profile.github_url} target="_blank">
                            GitHub
                        </a>
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile