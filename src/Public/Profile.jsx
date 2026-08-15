import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { IoEyeSharp } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import AddEducation from '../Candidates/AddEcucation';
import AddProjects from '../Candidates/AddProjects';



const Profile = () => {
    const { token, showEdu, setShowEdu, showPro, setShowPro } = useContext(AuthContext)
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})

    // ----- Add Skill --- 
    const [skil, setSkil] = useState("")

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
    const deleteSkill = async (skillTxt) => {
        try {
            const response = await axios.delete(`${apibase}/candidate/deleteskill/${skillTxt}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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
    const addSkill = async () => {
        try {
            const data = {
                skills: [skil]
            }
            const response = await axios.patch(`${apibase}/candidate/updateskill`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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
    const deleteEducation = async (leveltxt) => {
        try {
            const response = await axios.delete(`${apibase}/candidate/deleteeducation/${leveltxt}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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
    const deleteProject = async (projecttxt) => {
        try {
            const response = await axios.delete(`${apibase}/candidate/deleteproject/${projecttxt}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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
        <div className="w-full min-h-screen bg-[#d7e1f7] p-4 md:p-6">
            <div className="max-w-5xl mx-auto flex flex-col gap-5">

                <button
                    onClick={() => navigate("/updateprofile")}
                    className="bg-[#7C32CB] hover:bg-[#5B21B6] transition-colors text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-medium self-end"
                >
                    Update Profile
                </button>

                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-br from-[#7C32CB] to-[#5B21B6] p-6 flex flex-col sm:flex-row justify-between gap-4 text-white">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-xl font-semibold shrink-0">
                                {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{profile.name}</h1>
                                <p className="text-white/80 font-medium">{profile.headline}</p>
                                <p className="text-white/70 text-sm mt-1">
                                    📍 {profile.city}, {profile.state}, {profile.country}
                                </p>
                            </div>
                        </div>

                        <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1 sm:text-right">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${profile.is_open_to_work ? "bg-green-400/20 text-green-100" : "bg-white/15 text-white/80"}`}>
                                {profile.is_open_to_work ? "Open to work" : "Not open to work"}
                            </span>
                            <div className="sm:mt-2">
                                <p className="text-white/70 text-xs">Expected salary</p>
                                <p className="font-semibold">{profile.expected_salary}</p>
                            </div>
                        </div>
                    </div>

                    {profile.bio && (
                        <p className="p-6 text-gray-700 text-sm leading-relaxed">
                            {profile.bio}
                        </p>
                    )}
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Contact information</h2>

                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                        <p><span className="text-gray-400">Email</span><br />{profile.email}</p>
                        <p><span className="text-gray-400">Mobile</span><br />{profile.mobile}</p>
                        <p><span className="text-gray-400">Notice period</span><br />{profile.notice_period}</p>
                        <p><span className="text-gray-400">Status</span><br />{profile.status}</p>
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Skills</h2>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {
                            (profile?.skills || []).length > 0 ? (
                                profile.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#7C32CB]/10 text-[#5B21B6] px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium"
                                    >
                                        {skill}
                                        <TiDeleteOutline
                                            onClick={() => deleteSkill(skill)}
                                            className="cursor-pointer text-red-500 text-base"
                                        />
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">No skills added</p>
                            )
                        }
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text"
                            value={skil}
                            onChange={(e) => setSkil(e.target.value)}
                            className="flex-1 outline-none border border-gray-200 focus:border-[#7C32CB] rounded-lg px-3 py-2 text-sm"
                            placeholder="Add skill..." />
                        <button
                            onClick={addSkill}
                            className="bg-[#7C32CB] hover:bg-[#5B21B6] transition-colors text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Add skill
                        </button>
                    </div>
                </div>

                {/* Education */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Education</h2>

                    <div className="flex flex-col gap-4 mb-4">
                        {
                            (profile?.education || []).length > 0 ? (
                                profile.education.map((edu, index) => (
                                    <div key={index} className="border-l-4 border-[#7C32CB] pl-4 py-1 relative">
                                        <div className="flex justify-between items-start gap-3">
                                            <div>
                                                <h3 className="font-semibold">{edu.degree}</h3>
                                                <p className="text-sm text-gray-500">{edu.level}</p>
                                                <p className="text-sm text-gray-700 mt-1">{edu.institution_name}</p>
                                                <p className="text-sm text-gray-500">{edu.field_of_study}</p>
                                                <p className="text-xs text-gray-400 mt-1">{edu.start_year} - {edu.end_year} · {edu.cgpa_percentage}</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-lg shrink-0">
                                                <FiEdit className="cursor-pointer text-gray-500 hover:text-gray-700" />
                                                <MdDelete
                                                    onClick={() => deleteEducation(edu.level)}
                                                    className="cursor-pointer text-red-500 hover:text-red-600" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">No education added</p>
                            )
                        }
                    </div>

                    <button
                        onClick={() => setShowEdu(true)}
                        className="bg-[#7C32CB] hover:bg-[#5B21B6] transition-colors text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-medium"
                    >
                        Add education
                    </button>
                </div>

                {
                    showEdu ? (
                        <div className="w-screen h-screen overflow-scroll bg-white fixed top-5 p-2 flex justify-center items-center right-0">
                            <AddEducation />
                        </div>
                    ) : null
                }

                {/* Projects */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Projects</h2>

                    <div className="flex flex-col gap-4 mb-4">
                        {
                            (profile?.projects || []).length > 0 ? (
                                profile.projects.map((project, index) => (
                                    <div key={index} className="border border-gray-100 rounded-xl p-4">
                                        <div className="flex justify-between items-start gap-3">
                                            <h3 className="font-semibold text-base">{project.title}</h3>
                                            <div className="flex items-center gap-3 text-lg shrink-0">
                                                <FiEdit className="cursor-pointer text-gray-500 hover:text-gray-700" />
                                                <MdDelete
                                                    onClick={() => deleteProject(project.title)}
                                                    className="cursor-pointer text-red-500 hover:text-red-600" />
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mt-2">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {
                                                project.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))
                                            }
                                        </div>

                                        {project.live_url && (
                                            
                                            <a    href={project.live_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-block mt-3 text-sm text-[#5B21B6] font-medium hover:underline"
                                            >
                                                View live project →
                                            </a>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">No projects added</p>
                            )
                        }
                    </div>

                    <button
                        onClick={() => setShowPro(true)}
                        className="bg-[#7C32CB] hover:bg-[#5B21B6] transition-colors text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-medium"
                    >
                        Add project
                    </button>
                </div>

                {
                    showPro ? (
                        <div className="w-screen h-screen overflow-auto bg-white fixed top-5 p-2 flex justify-center items-center right-0">
                            <AddProjects />
                        </div>
                    ) : null
                }

                {/* Resume */}
                <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold">Resume</h2>
                    <div className="flex flex-wrap gap-2">
                        
                        <a   href={profile.resume_url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#7C32CB] hover:bg-[#5B21B6] transition-colors text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                        >
                            View resume <IoEyeSharp />
                        </a>
                        <button className="border border-[#7C32CB] text-[#5B21B6] hover:bg-[#7C32CB]/10 transition-colors cursor-pointer px-4 py-2 rounded-lg text-sm font-medium">
                            Update resume
                        </button>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Links</h2>

                    <div className="flex flex-wrap gap-3">
                        {profile.linkedin_url && (
                            <a href={profile.linkedin_url} target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#7C32CB] hover:text-[#5B21B6] transition-colors">
                                <FaLinkedin /> LinkedIn
                            </a>
                        )}
                        {profile.portfolio_url && (
                            <a href={profile.portfolio_url} target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#7C32CB] hover:text-[#5B21B6] transition-colors">
                                <FaGlobe /> Portfolio
                            </a>
                        )}
                        {profile.github_url && (
                            <a href={profile.github_url} target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#7C32CB] hover:text-[#5B21B6] transition-colors">
                                <FaGithub /> GitHub
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile