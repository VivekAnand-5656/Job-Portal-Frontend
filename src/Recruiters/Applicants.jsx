import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'

const Applicants = () => {
    const { token } = useContext(AuthContext)
    const [applicants, setApplicants] = useState([])
    const apibase = "https://job-portal-project-b2b0.onrender.com"

    // ======= Fetch Applicants ======
    const fetchApplicants = async () => {
        try {
            const response = await axios.get(`${apibase}/recruiter/applicants`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setApplicants(response.data)
            console.log(`Data Mila:- ${response.data}`)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }
    // =============== Update Status ==========
    const [candidateId,setCandidateId] = useState(null)
    const updateStatus = async (candidateId,canStatus)=>{
        try {
            const response = await axios.put(`${apibase}/recruiter/hiringstatusupdate/${candidateId}`,
                {},
                {
                    params:{
                        status:canStatus
                    },
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            await fetchApplicants()
            alert(`Candidate ${canStatus}`)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }
    useEffect(()=>{
        if(token){
            fetchApplicants()
        }
    },[token])
    return (
        <div>
            <h1>Applicants</h1>
            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-4">
                    Applicants ({applicants.length})
                </h2>

                {
                    applicants?.length === 0 ? (
                        <p>No Applicants Found</p>
                    ) : (
                        applicants.map((applicant) => (
                            <div
                                key={applicant._id}
                                className="border rounded-lg p-4 mb-4 bg-white shadow-sm"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {applicant.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {applicant.headline}
                                        </p>
                                    </div>

                                    <span className={
                                        applicant.status === "Shortlisted"? 
                                        "px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                                        :applicant.status === "Rejected"?
                                        "px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                                        :applicant.status === "Hired"?
                                        "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                        :"px-3 py-1 bg-orange-100 text-black-700 rounded-full text-sm"
                                    }>
                                        {
                                            applicant.status 
                                        }
                                    </span>
                                </div>

                                {/* Basic Details */}
                                <div className="mt-3">
                                    <p><strong>Email:</strong> {applicant.email}</p>
                                    <p><strong>Mobile:</strong> {applicant.mobile}</p>
                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {applicant.city}, {applicant.state}
                                    </p>
                                    <p>
                                        <strong>Expected Salary:</strong>{" "}
                                        {applicant.expected_salary}
                                    </p>
                                    <p>
                                        <strong>Work Mode:</strong>{" "}
                                        {applicant.preferred_work_mode}
                                    </p>
                                </div>

                                {/* Bio */}
                                <div className="mt-3">
                                    <p className="text-gray-700">
                                        {applicant.bio}
                                    </p>
                                </div>

                                {/* Skills */}
                                <div className="mt-3">
                                    <h4 className="font-semibold mb-2">Skills</h4>

                                    <div className="flex flex-wrap gap-2">
                                        {applicant.skills.map((skill, index) => (
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
                                {applicant.education?.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold mb-2">
                                            Education
                                        </h4>

                                        {applicant.education.map((edu, index) => (
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
                                {applicant.projects?.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold mb-2">
                                            Latest Project
                                        </h4>

                                        <div className="border rounded p-2">
                                            <p className="font-medium">
                                                {applicant.projects[0].title}
                                            </p>

                                            <p className="text-sm text-gray-600 mt-1">
                                                {applicant.projects[0].description}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-3 mt-4">
                                    <a
                                        href={applicant.resume_url}
                                        target="_blank"
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                    >
                                        View Resume
                                    </a>

                                    <a
                                        href={applicant.linkedin_url}
                                        target="_blank"
                                        className="px-4 py-2 bg-gray-800 text-white rounded"
                                    >
                                        LinkedIn
                                    </a>

                                    <button 
                                    onClick={()=>updateStatus(applicant._id,"Shortlisted")}
                                    className="px-4 py-2 bg-green-600 text-white rounded">
                                        Shortlist
                                    </button>

                                    <button 
                                    onClick={()=>updateStatus(applicant._id,"Rejected")}
                                    className="px-4 py-2 bg-red-600 text-white rounded">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Applicants