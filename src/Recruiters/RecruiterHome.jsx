import React, { useContext, useEffect, useState } from 'react'
import girlemp from '../assets/girlemp.png'
import logo from '../assets/candidate.png'
import { GrFormNextLink } from "react-icons/gr";
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";


const RecruiterHome = () => {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
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


        } catch (error) {
            console.log(`Error:- ${error}`);
            setSearchCandidates([])

        }
    }

    // ============== Fetch Candidate By Id - View Candidate Detaisl =================
    const [candidateId, setCandidateId] = useState(null)
    const [findCandidate, setFindCandidate] = useState({})
    const viewCandidateDetail = async () => {
        try {
            const response = await axios.get(`${apibase}/recruiter/viewCandidate/${candidateId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(`Candidate by id:- ${response.data}`)
            setFindCandidate(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ================= Update Status ===============
    // const [candidateId,setCandidateId] = useState(null)
    const updateStatus = async (candidateId, canStatus) => {
        try {
            const response = await axios.put(`${apibase}/recruiter/hiringstatusupdate/${candidateId}`,
                {},
                {
                    params: {
                        status: canStatus
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await fetchCandidates()
            alert(`Candidate ${canStatus}`)
        } catch (error) {
            console.log(`Error:- ${error}`)
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
                <div className=' sm:w-[80%] w-full sm:h-screen  sm:p-4 p-2 flex sm:flex-row flex-col  sm:rounded-2xl  justify-arround gap-3   items-center ' >
                    {/* -------- Left ------- */}
                    <div className=' sm:w-[50%] w-full h-full  flex flex-col justify-center p-4 ' >
                        <h1 className=' text-5xl flex flex-col font-bold ' >Find.Connect. <span className=' text-[#943CF3] ' >Hire The Best Talent</span></h1>
                        <p>Discover pre-vetted candidates, streamline your hiring process and build winning teams faster.</p>
                        <button
                            onClick={() => navigate("/allcandidates")}
                            className=' w-[40%] bg-[#943CF3] p-1.5 text-white font-semibold border hover:bg-[#ffffff] hover:text-black hover:border hover:border-[#943CF3] transition-all duration-500 ease-in-out rounded cursor-pointer ' >Find Candidates</button>
                    </div>
                    {/* -------- Right ------- */}
                    <div className='sm:flex hidden w-[50%] h-full  items-center  justify-center p-4 ' >
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
                            className=' sm:w-[40%] w-[90%] bg-[#ffffff] outline-0 p-2 rounded  ' />
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
                                        className="w-64 h-[320px] bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-md transition-all duration-300"
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
                                            onClick={() => setCandidateId(candidate._id)}
                                            className="mt-auto bg-black text-white text-sm py-2 rounded-lg
            flex justify-center items-center gap-1
            hover:bg-gray-800 transition"
                                        >
                                            View Profile <GrFormNextLink />
                                        </button>

                                        {/* =========== View Profile ============ */}
                                        {
                                            candidateId === candidate._id && (
                                                <div className=' sm:w-[50vw] w-full overflow-scroll flex    flex-col  job h-full fixed top-0 sm:left-75 left-0 sm:p-2 p-1 sm:rounded-2xl bg-[#ffffff] z-50  ' >
                                                    <button onClick={() => setCandidateId(null)}
                                                        className=' self-end text-2xl '
                                                    ><IoMdCloseCircle/></button>
                                                    <h1 className=' text-[1.2rem] font-bold ' >Candidate Profile</h1>
                                                    <div
                                                        key={candidate._id}
                                                        className="border sm:w-[80%] w-full rounded-lg p-4 mb-4 bg-white shadow-sm"
                                                    >
                                                        {/* Header */}
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-xl font-semibold">
                                                                    {candidate.name}
                                                                </h3>
                                                                <p className="text-gray-600">
                                                                    {candidate.headline}
                                                                </p>
                                                            </div>

                                                            <span className={
                                                                candidate.status === "Shortlisted" ?
                                                                    "px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                                                                    : candidate.status === "Rejected" ?
                                                                        "px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                                                                        : candidate.status === "Hired" ?
                                                                            "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                                                            : "px-3 py-1 bg-orange-100 text-black-700 rounded-full text-sm"
                                                            }>
                                                                {
                                                                    candidate.status
                                                                }
                                                            </span>
                                                        </div>

                                                        {/* Basic Details */}
                                                        <div className="mt-3">
                                                            <p><strong>Email:</strong> {candidate.email}</p>
                                                            <p><strong>Mobile:</strong> {candidate.mobile}</p>
                                                            <p>
                                                                <strong>Location:</strong>{" "}
                                                                {candidate.city}, {candidate.state}
                                                            </p>
                                                            <p>
                                                                <strong>Expected Salary:</strong>{" "}
                                                                {candidate.expected_salary}
                                                            </p>
                                                            <p>
                                                                <strong>Work Mode:</strong>{" "}
                                                                {candidate.preferred_work_mode}
                                                            </p>
                                                        </div>

                                                        {/* Bio */}
                                                        <div className="mt-3">
                                                            <p className="text-gray-700">
                                                                {candidate.bio}
                                                            </p>
                                                        </div>

                                                        {/* Skills */}
                                                        <div className="mt-3">
                                                            <h4 className="font-semibold mb-2">Skills</h4>

                                                            <div className="flex flex-wrap gap-2">
                                                                {candidate.skills?.map((skill, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Education */}
                                                        {candidate.education?.length > 0 && (
                                                            <div className="mt-4">
                                                                <h4 className="font-semibold mb-2">
                                                                    Education
                                                                </h4>

                                                                {candidate.education.map((edu, index) => (
                                                                    <div key={index} className="border rounded p-2">
                                                                        <p>
                                                                            <strong>{edu.degree}</strong>
                                                                        </p>
                                                                        <p>{edu.institution_name}</p>
                                                                        <p>{edu.cgpa_percentage}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Project */}
                                                        {candidate.projects?.length > 0 && (
                                                            <div className="mt-4">
                                                                <h4 className="font-semibold mb-2">
                                                                    Latest Project
                                                                </h4>

                                                                <div className="border rounded p-2">
                                                                    <p className="font-medium">
                                                                        {candidate.projects[0].title}
                                                                    </p>

                                                                    <p className="text-sm text-gray-600 mt-1">
                                                                        {candidate.projects[0].description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Buttons */}
                                                        <div className="flex gap-3 mt-4 overflow-x-scroll job ">
                                                            <a
                                                                href={candidate.resume_url}
                                                                target="_blank"
                                                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                                            >
                                                                View Resume
                                                            </a>

                                                            <a
                                                                href={candidate.linkedin_url}
                                                                target="_blank"
                                                                className="px-4 py-2 bg-gray-800 text-white rounded"
                                                            >
                                                                LinkedIn
                                                            </a>

                                                            <button
                                                                onClick={() => updateStatus(candidate._id, "Shortlisted")}
                                                                className="px-4 py-2 bg-green-600 text-white rounded">
                                                                Shortlist
                                                            </button>

                                                            <button
                                                                onClick={() => updateStatus(candidate._id, "Rejected")}
                                                                className="px-4 py-2 bg-red-600 text-white rounded">
                                                                Reject
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(candidate._id, "Hired")}
                                                                className="px-4 py-2 bg-blue-600 text-white rounded">
                                                                Hire
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

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