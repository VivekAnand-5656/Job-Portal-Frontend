import React, { useContext, useEffect, useState } from 'react'
import girlemp from '../assets/girlemp.png'
import logo from '../assets/candidate.png'
import { GrFormNextLink } from "react-icons/gr";
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaEnvelope, FaPhone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";
import { toast, Bounce } from 'react-toastify';

const RecruiterHome = () => {

    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    const [candidates, setCandidates] = useState([])
    const [expandedSkills, setExpandedSkills] = useState({})
    const [search, setSearch] = useState("")
    const [searchCandidates, setSearchCandidates] = useState([])
    const [candidateId, setCandidateId] = useState(null)
    const [findCandidate, setFindCandidate] = useState({})
    const [loading, setLoading] = useState(false)

    const apibase = "https://job-portal-project-b2b0.onrender.com"

    // ======== Fetch Candidates ==========

    const fetchCandidates = async () => {

        try {

            setLoading(true)

            const response = await axios.get(
                `${apibase}/recruiter/allcandidates`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setCandidates(response.data || [])

        } catch (error) {

            console.log(`Error:- ${error}`)

        } finally {

            setLoading(false)

        }
    }


    // ============= Search Candidates =======

    const candidateSearch = async (txt) => {

        try {

            if (!txt.trim()) {

                setSearchCandidates([])

                return

            }

            const response = await axios.get(
                `${apibase}/recruiter/searchcandidates/${txt}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setSearchCandidates(response.data || [])

        } catch (error) {

            console.log(`Error:- ${error}`)

            setSearchCandidates([])

        }
    }


    // ============== View Candidate Details ==============

    const viewCandidateDetail = async (id) => {

        try {

            setCandidateId(id)

            const response = await axios.get(
                `${apibase}/recruiter/viewCandidate/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setFindCandidate(response.data)

        } catch (error) {

            console.log(`Error:- ${error}`)

        }
    }


    // ================= Update Hiring Status =================

    const updateStatus = async (jobId, canStatus) => {

        try {

            if (!jobId) {

                toast.error("Job ID not found", {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "colored",
                    transition: Bounce
                })

                return
            }

            await axios.put(
                `${apibase}/recruiter/hiringstatusupdate/${jobId}`,
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

            toast.success(`Candidate ${canStatus}`, {
                position: "top-right",
                autoClose: 1200,
                theme: "colored",
                transition: Bounce
            })

            setCandidateId(null)

        } catch (error) {

            console.log(`Error:- ${error}`)

            toast.error(
                error.response?.data?.detail || "Unable to update status",
                {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored"
                }
            )

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

            <div className='w-full min-h-screen bg-[#f7f3ff] flex flex-col justify-center items-center'>


                {/* ================= TOP BANNER ================= */}

                <div className='sm:w-[90%] w-full min-h-[80vh] sm:p-6 p-4 flex sm:flex-row flex-col sm:justify-between gap-5 items-center'>


                    {/* -------- Left -------- */}

                    <div className='sm:w-[55%] w-full flex flex-col justify-center gap-5'>

                        <span className='w-fit px-4 py-1 rounded-full bg-[#e9d5ff] text-[#943CF3] font-semibold text-sm'>
                            Smart Hiring Platform
                        </span>

                        <h1 className='sm:text-6xl text-4xl flex flex-col font-bold leading-tight'>

                            Find.Connect.

                            <span className='text-[#943CF3]'>
                                Hire The Best Talent
                            </span>

                        </h1>

                        <p className='text-gray-600 sm:text-lg text-sm max-w-xl'>

                            Discover talented candidates, review their profiles,
                            shortlist the right people and build your perfect
                            team faster.

                        </p>


                        <div className='flex gap-3'>

                            <button
                                onClick={() => navigate("/allcandidates")}
                                className='w-fit bg-[#943CF3] px-5 py-2.5 text-white font-semibold border border-[#943CF3] hover:bg-white hover:text-black transition-all duration-500 rounded-lg cursor-pointer'
                            >

                                Find Candidates

                            </button>

                            <button
                                onClick={() => navigate("/postjob")}
                                className='w-fit bg-black px-5 py-2.5 text-white font-semibold hover:bg-[#943CF3] transition-all duration-500 rounded-lg cursor-pointer'
                            >

                                Post A Job

                            </button>

                        </div>


                        {/* Small Stats */}

                        <div className='flex gap-8 mt-5'>

                            <div>

                                <h2 className='text-2xl font-bold'>
                                    {candidates.length}
                                </h2>

                                <p className='text-sm text-gray-500'>
                                    Candidates
                                </p>

                            </div>

                            <div>

                                <h2 className='text-2xl font-bold'>
                                    Fast
                                </h2>

                                <p className='text-sm text-gray-500'>
                                    Hiring Process
                                </p>

                            </div>

                            <div>

                                <h2 className='text-2xl font-bold'>
                                    Easy
                                </h2>

                                <p className='text-sm text-gray-500'>
                                    Candidate Search
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* -------- Right -------- */}

                    <div className='sm:flex hidden sm:w-[45%] h-full items-center justify-center'>

                        <img
                            src={girlemp}
                            alt="employee"
                            className='w-[90%] h-[75%] object-contain'
                        />

                    </div>

                </div>


                {/* ================= CANDIDATES SECTION ================= */}

                <div className='bg-[#e9d5ff] w-full min-h-screen flex flex-col gap-6 p-5 sm:p-8 rounded-t-[2rem]'>


                    {/* Heading */}

                    <div className='w-full flex flex-col items-center justify-center gap-2'>

                        <h1 className='text-3xl font-bold text-center'>
                            Find Your Next Great Hire
                        </h1>

                        <p className='text-gray-600 text-center'>
                            Search and explore talented candidates
                        </p>

                    </div>


                    {/* Search */}

                    <div className='w-full flex justify-center items-center gap-2'>

                        <div className='sm:w-[50%] w-[85%] relative'>

                            <FaSearch className='absolute left-3 top-3 text-gray-400' />

                            <input
                                type="search"
                                name="search"
                                placeholder='Search Candidates...'
                                value={search}
                                onChange={(e) => {

                                    setSearch(e.target.value)

                                    if (!e.target.value.trim()) {
                                        setSearchCandidates([])
                                    }

                                }}
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        candidateSearch(search)
                                    }

                                }}
                                className='w-full bg-white outline-0 p-2 pl-10 rounded-lg border border-transparent focus:border-[#943CF3]'
                            />

                        </div>


                        <button
                            onClick={() => candidateSearch(search)}
                            className='bg-[#943CF3] text-white p-2.5 rounded-lg cursor-pointer hover:bg-black transition-all duration-300'
                        >

                            <FaSearch />

                        </button>

                    </div>


                    {/* ================= CANDIDATE LIST ================= */}

                    <div className='w-full flex flex-wrap justify-center gap-6'>


                        {loading ? (

                            <div className='w-full flex justify-center items-center p-10'>

                                <p className='font-semibold text-gray-600'>
                                    Loading Candidates...
                                </p>

                            </div>

                        ) : displayjobs.length === 0 ? (

                            <div className='w-full flex flex-col justify-center items-center p-10'>

                                <img
                                    src={logo}
                                    alt="candidate"
                                    className='w-20 h-20 opacity-50'
                                />

                                <p className='text-center text-gray-700 font-medium mt-3'>
                                    No candidates found
                                </p>

                            </div>

                        ) : (

                            displayjobs.map((candidate, index) => (

                                <div
                                    key={candidate._id || index}
                                    className='sm:w-72 w-full min-h-[360px] bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
                                >


                                    {/* Profile Image */}

                                    <img
                                        src={logo}
                                        alt="profile"
                                        className='w-20 h-20 rounded-full self-center object-cover border-4 border-[#e9d5ff]'
                                    />


                                    {/* Name */}

                                    <h1 className='font-bold text-center text-xl'>
                                        {candidate.name}
                                    </h1>


                                    {/* Headline */}

                                    <p className='text-sm text-center text-gray-600 line-clamp-2'>
                                        {candidate.headline || "Candidate"}
                                    </p>


                                    {/* Location */}

                                    <div className='flex justify-center items-center gap-1 text-xs text-gray-500'>

                                        <FaMapMarkerAlt />

                                        <span>
                                            {candidate.city || "Location"}, {candidate.state || ""}
                                        </span>

                                    </div>


                                    {/* Work Mode */}

                                    <div className='flex justify-center gap-2'>

                                        <span className='text-xs bg-[#ede9fe] text-[#7c3aed] px-3 py-1 rounded-full'>
                                            {candidate.preferred_work_mode || "Not specified"}
                                        </span>

                                        <span className='text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full'>
                                            {candidate.preferred_job_type || "Full Time"}
                                        </span>

                                    </div>


                                    {/* Skills */}

                                    <ul className='flex flex-wrap justify-center gap-2 mt-2'>

                                        {

                                            candidate.skills?.length > 0 ? (

                                                <>

                                                    {
                                                        candidate.skills
                                                            .slice(
                                                                0,
                                                                expandedSkills[index]
                                                                    ? candidate.skills.length
                                                                    : 3
                                                            )
                                                            .map((skill, i) => (

                                                                <li
                                                                    key={i}
                                                                    className='text-xs bg-yellow-300 text-black px-2 py-1 rounded-full'
                                                                >
                                                                    {skill}
                                                                </li>

                                                            ))
                                                    }


                                                    {candidate.skills.length > 3 && (

                                                        <button
                                                            onClick={() =>
                                                                setExpandedSkills((prev) => ({
                                                                    ...prev,
                                                                    [index]: !prev[index],
                                                                }))
                                                            }
                                                            className='text-xs cursor-pointer font-semibold text-[#943CF3]'
                                                        >

                                                            {
                                                                expandedSkills[index]
                                                                    ? "Show less"
                                                                    : `+${candidate.skills.length - 3} more`
                                                            }

                                                        </button>

                                                    )}

                                                </>

                                            ) : (

                                                <li className='text-xs text-gray-500'>
                                                    No skills
                                                </li>

                                            )

                                        }

                                    </ul>


                                    {/* Status */}

                                    {

                                        candidate.status && (

                                            <div className='flex justify-center'>

                                                <span
                                                    className={
                                                        candidate.status === "Shortlisted"
                                                            ? "text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full"
                                                            : candidate.status === "Rejected"
                                                                ? "text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full"
                                                                : candidate.status === "Hired"
                                                                    ? "text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                                                                    : "text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full"
                                                    }
                                                >

                                                    {candidate.status}

                                                </span>

                                            </div>

                                        )

                                    }


                                    {/* View Profile */}

                                    <button
                                        onClick={() => viewCandidateDetail(candidate._id)}
                                        className='mt-auto bg-black text-white text-sm py-2.5 rounded-lg flex justify-center items-center gap-1 hover:bg-[#943CF3] transition-all duration-300 cursor-pointer'
                                    >

                                        View Profile

                                        <GrFormNextLink />

                                    </button>


                                </div>

                            ))

                        )}

                    </div>

                </div>


                {/* ================= CANDIDATE PROFILE ================= */}

                {

                    candidateId && (

                        <div className='w-full h-screen fixed top-0 left-0 bg-black/50 z-50 flex justify-center items-center p-2'>


                            <div className='sm:w-[55%] w-full max-h-[95vh] overflow-y-scroll job bg-white rounded-2xl p-5'>


                                {/* Close */}

                                <button
                                    onClick={() => {

                                        setCandidateId(null)
                                        setFindCandidate({})

                                    }}
                                    className='float-right text-2xl cursor-pointer hover:text-red-500'
                                >

                                    <IoMdCloseCircle />

                                </button>


                                <div className='clear-both'>


                                    {/* Header */}

                                    <div className='flex sm:flex-row flex-col sm:items-center gap-4 mt-2'>

                                        <img
                                            src={logo}
                                            alt="profile"
                                            className='w-20 h-20 rounded-full border-4 border-[#e9d5ff]'
                                        />


                                        <div>

                                            <h1 className='text-2xl font-bold'>
                                                {findCandidate.name}
                                            </h1>

                                            <p className='text-gray-600'>
                                                {findCandidate.headline}
                                            </p>

                                        </div>


                                        <div className='sm:ml-auto'>

                                            <span
                                                className={
                                                    findCandidate.status === "Shortlisted"
                                                        ? "px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                                                        : findCandidate.status === "Rejected"
                                                            ? "px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                                                            : findCandidate.status === "Hired"
                                                                ? "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                                                : "px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                                                }
                                            >

                                                {findCandidate.status || "Pending"}

                                            </span>

                                        </div>

                                    </div>


                                    {/* Basic Details */}

                                    <div className='mt-5 bg-gray-50 rounded-xl p-4 flex flex-col gap-3'>

                                        <h2 className='font-bold text-lg'>
                                            Candidate Information
                                        </h2>

                                        <p className='flex items-center gap-2'>
                                            <FaEnvelope className='text-[#943CF3]' />
                                            <strong>Email:</strong>
                                            {findCandidate.email}
                                        </p>

                                        <p className='flex items-center gap-2'>
                                            <FaPhone className='text-[#943CF3]' />
                                            <strong>Mobile:</strong>
                                            {findCandidate.mobile}
                                        </p>

                                        <p className='flex items-center gap-2'>
                                            <FaMapMarkerAlt className='text-[#943CF3]' />
                                            <strong>Location:</strong>
                                            {findCandidate.city}, {findCandidate.state}
                                        </p>

                                        <p className='flex items-center gap-2'>
                                            <FaBriefcase className='text-[#943CF3]' />
                                            <strong>Work Mode:</strong>
                                            {findCandidate.preferred_work_mode}
                                        </p>

                                        <p>
                                            <strong>Job Type:</strong>{" "}
                                            {findCandidate.preferred_job_type}
                                        </p>

                                        <p>
                                            <strong>Expected Salary:</strong>{" "}
                                            {findCandidate.expected_salary}
                                        </p>

                                        <p>
                                            <strong>Notice Period:</strong>{" "}
                                            {findCandidate.notice_period}
                                        </p>

                                    </div>


                                    {/* Bio */}

                                    {

                                        findCandidate.bio && (

                                            <div className='mt-5'>

                                                <h2 className='font-bold text-lg mb-2'>
                                                    About Candidate
                                                </h2>

                                                <p className='text-gray-700 bg-gray-50 p-4 rounded-xl'>
                                                    {findCandidate.bio}
                                                </p>

                                            </div>

                                        )

                                    }


                                    {/* Skills */}

                                    <div className='mt-5'>

                                        <h2 className='font-bold text-lg mb-2'>
                                            Skills
                                        </h2>

                                        <div className='flex flex-wrap gap-2'>

                                            {

                                                findCandidate.skills?.map((skill, index) => (

                                                    <span
                                                        key={index}
                                                        className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm'
                                                    >

                                                        {skill}

                                                    </span>

                                                ))

                                            }

                                        </div>

                                    </div>


                                    {/* Education */}

                                    {

                                        findCandidate.education?.length > 0 && (

                                            <div className='mt-5'>

                                                <h2 className='font-bold text-lg mb-2'>
                                                    Education
                                                </h2>

                                                <div className='flex flex-col gap-2'>

                                                    {

                                                        findCandidate.education.map((edu, index) => (

                                                            <div
                                                                key={index}
                                                                className='border rounded-xl p-3'
                                                            >

                                                                <p className='font-semibold'>
                                                                    {edu.degree}
                                                                </p>

                                                                <p className='text-gray-600'>
                                                                    {edu.institution_name}
                                                                </p>

                                                                <p className='text-sm text-gray-500'>
                                                                    {edu.cgpa_percentage}
                                                                </p>

                                                            </div>

                                                        ))

                                                    }

                                                </div>

                                            </div>

                                        )

                                    }


                                    {/* Projects */}

                                    {

                                        findCandidate.projects?.length > 0 && (

                                            <div className='mt-5'>

                                                <h2 className='font-bold text-lg mb-2'>
                                                    Latest Project
                                                </h2>

                                                <div className='border rounded-xl p-4'>

                                                    <p className='font-semibold'>
                                                        {findCandidate.projects[0].title}
                                                    </p>

                                                    <p className='text-sm text-gray-600 mt-2'>
                                                        {findCandidate.projects[0].description}
                                                    </p>

                                                </div>

                                            </div>

                                        )

                                    }


                                    {/* Links */}

                                    <div className='flex flex-wrap gap-2 mt-5'>

                                        {

                                            findCandidate.resume_url && (

                                                <a
                                                    href={findCandidate.resume_url}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='px-4 py-2 bg-blue-600 text-white rounded-lg'
                                                >

                                                    View Resume

                                                </a>

                                            )

                                        }


                                        {

                                            findCandidate.linkedin_url && (

                                                <a
                                                    href={findCandidate.linkedin_url}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='px-4 py-2 bg-gray-800 text-white rounded-lg'
                                                >

                                                    LinkedIn

                                                </a>

                                            )

                                        }


                                        {

                                            findCandidate.github_url && (

                                                <a
                                                    href={findCandidate.github_url}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='px-4 py-2 bg-black text-white rounded-lg'
                                                >

                                                    GitHub

                                                </a>

                                            )

                                        }


                                        {

                                            findCandidate.portfolio_url && (

                                                <a
                                                    href={findCandidate.portfolio_url}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='px-4 py-2 bg-[#943CF3] text-white rounded-lg'
                                                >

                                                    Portfolio

                                                </a>

                                            )

                                        }

                                    </div>


                                    {/* Hiring Buttons */}

                                    <div className='flex flex-wrap gap-2 mt-5 pt-4 border-t'>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    findCandidate.job_id,
                                                    "Shortlisted"
                                                )
                                            }
                                            className='px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700'
                                        >

                                            Shortlist

                                        </button>


                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    findCandidate.job_id,
                                                    "Rejected"
                                                )
                                            }
                                            className='px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700'
                                        >

                                            Reject

                                        </button>


                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    findCandidate.job_id,
                                                    "Hired"
                                                )
                                            }
                                            className='px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700'
                                        >

                                            Hire

                                        </button>

                                    </div>


                                </div>

                            </div>

                        </div>

                    )

                }

            </div>

        </>

    )
}

export default RecruiterHome