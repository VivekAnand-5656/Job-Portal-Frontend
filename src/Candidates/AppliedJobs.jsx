import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const statusConfig = {
    Pending: { color: "bg-[#fdab13]", ring: "ring-[#fdab13]/30", step: 1 },
    Shortlisted: { color: "bg-[#22c55e]", ring: "ring-[#22c55e]/30", step: 2 },
    Rejected: { color: "bg-[#ef4444]", ring: "ring-[#ef4444]/30", step: 2 },
};

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
        <div className="w-full min-h-screen p-4 md:p-6 bg-[#d7e1f7]">

            <h1 className="text-2xl font-bold mb-6 text-black">
                Applied Jobs
            </h1>

            <div className="flex flex-col gap-5">

                {
                    jobs.length > 0 ? (
                        jobs.map((job) => {
                            const status = job.status || "Pending";
                            const isRejected = status === "Rejected";
                            const cfg = statusConfig[status] || statusConfig.Pending;

                            return (
                                <div key={job._id}
                                    className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col md:flex-row"
                                >
                                    {/* ============= Job Info ========== */}
                                    <div className="w-full md:w-[62%] p-5 bg-gradient-to-br from-[#7C32CB] to-[#5B21B6] text-white relative">

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

                                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/15 text-sm flex-wrap gap-2">
                                            <span className="text-white/80">💼 {job.experience_level} yrs</span>
                                            <span className="text-white/80">
                                                📅 {job.createdAt
                                                    ? new Date(job.createdAt).toLocaleDateString("en-IN")
                                                    : "N/A"}
                                            </span>
                                            <span className="font-semibold text-[#FCD34D]">
                                                {job.salary_range}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ============== Application Tracking =========== */}
                                    <div className="w-full md:w-[38%] p-5 flex flex-col justify-center bg-[#faf9fc]">

                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                                            Track application
                                        </p>

                                        <div className="flex items-center">
                                            {/* Step 1 - Applied */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-9 h-9 rounded-full bg-[#7C32CB] text-white flex items-center justify-center text-xs font-bold ring-4 ring-[#7C32CB]/20">
                                                    ✓
                                                </div>
                                                <span className="text-[11px] text-gray-500 mt-1">Applied</span>
                                            </div>

                                            {/* Connector */}
                                            <div className={`flex-1 h-[3px] mx-2 rounded ${cfg.step >= 2 ? cfg.color : "bg-gray-200"}`} />

                                            {/* Step 2 - Current status */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-9 h-9 rounded-full text-white flex items-center justify-center text-xs font-bold ring-4 ${cfg.color} ${cfg.ring}`}>
                                                    {isRejected ? "✕" : status === "Shortlisted" ? "✓" : "…"} 
                                                </div>
                                                <span className="text-[11px] text-gray-500 mt-1">{status}</span>
                                            </div>
                                        </div>

                                        <div className={`mt-5 text-sm font-medium px-3 py-2 rounded-lg text-center ${
                                            isRejected ? "bg-red-50 text-red-600" :
                                            status === "Shortlisted" ? "bg-green-50 text-green-600" :
                                            "bg-amber-50 text-amber-600"
                                        }`}>
                                            { status === "Shortlisted" ? "You're shortlisted 🎉" :
                                             "Awaiting recruiter response"}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-black">Not Jobs Applied</p>
                    )
                }

            </div>
        </div>
    );
};

export default AppliedJobs;