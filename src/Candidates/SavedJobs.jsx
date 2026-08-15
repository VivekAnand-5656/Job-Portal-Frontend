import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const SavedJobs = () => {
    const { token } = useContext(AuthContext)
    const [jobs, setJobs] = useState([])
    const apibase = "https://job-portal-project-b2b0.onrender.com"
    const fetchAppliedJobs = async () => {
        try {
            const response = await axios.get(`${apibase}/candidate/getsavedjobs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setJobs(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }
    //   =========== Apply Job =======

    const applyJob = async (jobid) => {
        try {
            const response = await axios.put(`${apibase}/candidate/applyjob/${jobid}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert("Applied Successfully")

        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }
    useEffect(() => {
        if (token) {
            fetchAppliedJobs()
        }
    }, [token])

    return (
        <div className="w-full min-h-screen p-4 md:p-6 bg-[#d7e1f7]">

            <h1 className="text-2xl font-bold mb-6 text-black">
                Saved Jobs
            </h1>

            <div className="flex flex-col gap-5">

                {
                    jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                            >
                                {/* Top - gradient header */}
                                <div className="p-5 bg-gradient-to-br from-[#7C32CB] to-[#5B21B6] text-white">

                                    <div className="flex justify-between items-start gap-3">
                                        <div>
                                            <h2 className="text-lg font-semibold leading-tight">
                                                {job.jobtitle}
                                            </h2>
                                            <p className="text-sm text-white/70 mt-1 flex items-center gap-1">
                                                <span>📍</span>{job.location}
                                            </p>
                                        </div>

                                        <span className="text-xs font-medium bg-white/15 backdrop-blur px-3 py-1 rounded-full shrink-0">
                                            {job.work_mode}
                                        </span>
                                    </div>

                                    <p className="text-sm text-white/85 mt-3 line-clamp-2">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {(job.skills || []).map((skill, i) => (
                                            <span
                                                key={i}
                                                className="text-[11px] font-medium bg-white/90 text-[#5B21B6] px-2.5 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom - meta + action */}
                                <div className="p-4 bg-[#faf9fc] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                                        <span>💼 {job.experience_level} yrs</span>
                                        <span>
                                            📅 {job.createdAt
                                                ? new Date(job.createdAt).toLocaleDateString("en-IN")
                                                : "N/A"}
                                        </span>
                                        <span className="font-semibold text-green-600">
                                            {job.salary_range}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => applyJob(job._id)}
                                        className="bg-[#7C32CB] hover:bg-[#5B21B6] transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium w-full sm:w-auto"
                                    >
                                        Apply now
                                    </button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-black">Not Jobs Applied</p>
                    )
                }

            </div>
        </div>
    );
};

export default SavedJobs;