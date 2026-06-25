import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import girlemp from '../assets/girlemp.png'
import logo from '../assets/candidate.png'
import { GrFormNextLink } from "react-icons/gr";
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

const AllCandidates = () => {
    const { token } = useContext(AuthContext)
    const [candidates, setCandidates] = useState([])
    const [expandedSkills, setExpandedSkills] = useState({});


    const apibase = "https://job-portal-project-b2b0.onrender.com"

    // ======== Fetch Candidates ==========
    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`${apibase}/recruiter/allcandidates`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(`Candidates:- ${response.data}`);
            setCandidates(response.data)

        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }

    useEffect(() => {
        if (token) {
            fetchCandidates()
        }
    }, [token])
    return (
        <div className=' w-full h-auto flex flex-col justify-center items-center ' >
            <div className=' w-full flex flex-wrap justify-center items-center p-2 gap-2 ' >
                {
                    candidates?.length > 0 ? (
                        candidates.map((candidate, index) => (

                            <div
                                key={index}
                                className="w-64 h-[320px] border border-[#943CF3] sm:border-none bg-white rounded-2xl p-4 flex flex-col gap-3
                                  shadow-md hover:shadow-xl hover:-translate-y-1
                                  hover:bg-[#943CF3] hover:text-white transition-all duration-300"
                            >

                                {/* Profile Image */}
                                <img
                                    src={logo}
                                    alt="profile"
                                    className="w-16 h-16 rounded-full self-center object-cover border-2 border-gray-200"
                                />

                                {/* Name */}
                                <h1 className="font-bold text-center text-lg">
                                    {candidate.name}
                                </h1>

                                {/* Headline */}
                                <p className="text-sm text-center opacity-80 line-clamp-2">
                                    {candidate.headline}
                                </p>

                                {/* Work Mode */}
                                <p className="text-xs text-center opacity-70">
                                    {candidate.preferred_work_mode}
                                </p>

                                {/* Skills */}
                                <ul className="flex flex-wrap justify-center gap-2 mt-1">

                                    {
                                        candidate.skills?.length > 0 ? (
                                            <>
                                                {/* SHOW FIRST 3 SKILLS */}
                                                {candidate.skills
                                                    .slice(0, expandedSkills[index] ? candidate.skills.length : 3)
                                                    .map((skill, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full"
                                                        >
                                                            {skill}
                                                        </li>
                                                    ))
                                                }

                                                {/* MORE BUTTON */}
                                                {candidate.skills.length > 3 && (
                                                    <button
                                                        onClick={() =>
                                                            setExpandedSkills((prev) => ({
                                                                ...prev,
                                                                [index]: !prev[index],
                                                            }))
                                                        }
                                                        className="text-xs cursor-pointer font-semibold"
                                                    >
                                                        {expandedSkills[index]
                                                            ? "Show less"
                                                            : `+${candidate.skills.length - 3} more`}
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <li className="text-xs opacity-70">No skills</li>
                                        )
                                    }

                                </ul>

                                {/* Button */}
                                <button
                                    className="mt-auto bg-black text-white text-sm py-2 rounded-lg
                                    flex justify-center items-center gap-1
                                    hover:bg-gray-800 transition"
                                >
                                    View Profile <GrFormNextLink />
                                </button>

                            </div>

                        ))
                    ) : (
                        <p>No Candidates</p>
                    )
                }
            </div>
        </div>
    )
}

export default AllCandidates