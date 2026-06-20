import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const AppliedJobs = () => {
    const { token } = useContext(AuthContext)
    const [jobs, setJobs] = useState([])
    const apibase = "https://job-portal-project-b2b0.onrender.com"
    const fetchAppliedJobs = async () => {
        try {
            const response = await axios.get(`${apibase}/candidate/myaapliedjobs`,
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
    useEffect(() => {
        if (token) {
            fetchAppliedJobs()
        }
    }, [token])
    return (
        <div className="w-full min-h-screen p-4 bg-gray-100">

            <h1 className="text-2xl font-bold mb-4">
                Applied Jobs
            </h1>

            <div className="flex flex-col gap-4">

                {
                    jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white p-4 rounded-lg shadow"
                            >

                                {/* Top */}
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {job.jobtitle}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {job.location}
                                        </p>
                                    </div>

                                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                                        {job.work_mode}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mt-2">
                                    {job.description}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {(job.skills || []).map((skill, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Bottom */}
                                <div className="flex justify-between mt-4 text-sm text-gray-500">
                                    <span>💼 {job.experience_level} yrs</span>

                                    <span>
                                        📅{" "}
                                        {job.createdAt
                                            ? new Date(job.createdAt).toLocaleDateString("en-IN")
                                            : "N/A"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-green-600 font-medium text-sm">
                                        {job.salary_range}
                                    </p>

                                    <button
                                        disabled
                                        className="bg-purple-600 disabled:opacity-50 cursor-not-allowed text-white px-3 py-1 rounded text-sm">
                                        Applied
                                    </button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p>Not Jobs Applied</p>
                    )
                }

            </div>
        </div>
    );
};

export default AppliedJobs;