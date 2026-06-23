import React, { useContext, useEffect, useState } from 'react'
import girlemp from '../assets/girlemp.png'
import logo from '../assets/candidate.png'
import { GrFormNextLink } from "react-icons/gr";
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

const RecruiterHome = () => {
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

    // ============= Search Candidates =======
    const [search, setSearch] = useState("")
    const [searchCandidates, setSearchCandidates] = useState([])

    const candidateSearch = async (txt) => {
        try {
            if (!txt.trim()) {
                setSearchCandidates([])
                return;
            }
            const response = await axios.get(`${apibase}/recruiter/searchcandidates/${txt}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setSearchCandidates(response.data || [])
            console.log(`Data ${response.data}`);


        } catch (error) {
            console.log(`Error:- ${error}`);
            setSearchCandidates([])

        }
    }

    useEffect(() => {
        if (token) {
            fetchCandidates()
        }
    }, [token])
    const displayjobs =
        search.trim() === "" ? candidates : searchCandidates
    return (
        <>
            <div className=' w-full h-auto flex flex-col justify-center items-center ' >
                {/* ------------- Top Banner --------- */}
                <div className=' w-[80%] h-screen p-4 flex   rounded-2xl justify-arround gap-3   items-center ' >
                    {/* -------- Left ------- */}
                    <div className=' w-[50%] h-full  flex flex-col justify-center p-4 ' >
                        <h1 className=' text-5xl flex flex-col font-bold ' >Find.Connect. <span className=' text-[#943CF3] ' >Hire The Best Talent</span></h1>
                        <p>Discover pre-vetted candidates, streamline your hiring process and build winning teams faster.</p>
                        <button
                            className=' w-[40%] bg-[#943CF3] p-1.5 text-white font-semibold border hover:bg-[#ffffff] hover:text-black hover:border hover:border-[#943CF3] transition-all duration-500 ease-in-out rounded cursor-pointer ' >Find Candidates</button>
                    </div>
                    {/* -------- Right ------- */}
                    <div className=' w-[50%] h-full  flex items-center  justify-center p-4 ' >
                        <img src={girlemp} alt="employee"
                            className='w-[80%] h-[70%]  ' />
                    </div>
                </div>
                {/* --------------- Featured Candidates ------------- */}
                <div className="bg-[#e2c7ff] w-full min-h-screen flex flex-col  justify-center gap-6 p-6 rounded-2xl">
                    <div className=' w-full flex justify-center items-center gap-2 ' >
                        <input type="search" name="search" placeholder='Search Candidates...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className=' w-[40%] bg-[#ffffff] outline-0 p-2 rounded  ' />
                        <button className=' cursor-pointer '
                            onClick={() => candidateSearch(search)}
                        ><FaSearch /></button>
                    </div>
                    <div className="bg-[#e2c7ff] w-full min-h-screen flex flex-wrap  justify-center gap-6 p-6 rounded-2xl">
                        {
                            displayjobs.length === 0 ? (

                                <p className="text-center w-full text-gray-700 font-medium">
                                    No candidates Found
                                </p>
                            ) : (
                                displayjobs.map((candidate, index) => (

                                    <div
                                        key={index}
                                        className="w-64 h-[320px] bg-white rounded-2xl p-4 flex flex-col gap-3
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
                            )
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default RecruiterHome