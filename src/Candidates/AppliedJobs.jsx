import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const AppliedJobs = () => {
    const { token } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    const apibase = "https://job-portal-project-b2b0.onrender.com";

    const fetchAppliedJobs = async () => {
        try {
            const response = await axios.get(
                `${apibase}/candidate/myaapliedjobs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setJobs(response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAppliedJobs();
        }
    }, [token]);

    return (
        <div className="w-full min-h-screen bg-[#d7e1f7] p-4 md:p-6">

            {/* Header */}
            <div className="mb-7">
                <p className="text-sm font-medium text-[#7C32CB]">
                    Career Dashboard
                </p>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                    Applied Jobs
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Keep track of the jobs you've applied for.
                </p>
            </div>

            {/* Jobs */}
            <div className="flex flex-col gap-5">

                {jobs.length > 0 ? (
                    jobs.map((application) => {

                        const job = application.job;
                        const status = application.status;

                        return (
                            <div
                                key={application._id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
                            >

                                {/* Top Section */}
                                <div className="p-5 md:p-6 bg-gradient-to-r from-[#7C32CB] to-[#5B21B6] text-white">

                                    <div className="flex justify-between items-start gap-4">

                                        <div className="flex items-start gap-3">

                                            {/* Logo */}
                                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0">
                                                {job.logo_url ? (
                                                    <img
                                                        src={job.logo_url}
                                                        alt={job.jobtitle}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-[#7C32CB] font-bold text-lg">
                                                        {job.jobtitle?.charAt(0)}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <h2 className="text-lg md:text-xl font-bold">
                                                    {job.jobtitle}
                                                </h2>

                                                <p className="text-sm text-white/70 mt-1">
                                                    📍 {job.location}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Work Mode */}
                                        <span className="text-xs font-semibold bg-white/15 px-3 py-1.5 rounded-full shrink-0">
                                            {job.work_mode}
                                        </span>

                                    </div>

                                    {/* Job Info */}
                                    <div className="flex flex-wrap gap-2 mt-5">

                                        <span className="text-xs bg-white/15 px-3 py-1.5 rounded-full">
                                            💼 {job.jobtype}
                                        </span>

                                        <span className="text-xs bg-white/15 px-3 py-1.5 rounded-full">
                                            🎯 {job.experience_level} yrs
                                        </span>

                                        <span className="text-xs bg-white/15 px-3 py-1.5 rounded-full">
                                            💰 {job.salary_range}
                                        </span>

                                    </div>

                                </div>

                                {/* Bottom Section */}
                                <div className="p-5 md:p-6">

                                    <div className="flex flex-col md:flex-row gap-6">

                                        {/* Description */}
                                        <div className="flex-1">

                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                                About this role
                                            </p>

                                            <p className="text-sm text-gray-600 leading-6">
                                                {job.description}
                                            </p>

                                            {/* Skills */}
                                            <div className="mt-4">

                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                                    Skills
                                                </p>

                                                <div className="flex flex-wrap gap-2">

                                                    {(job.skills || []).slice(0, 8).map(
                                                        (skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="text-xs font-medium text-[#5B21B6] bg-[#f1e9ff] px-3 py-1.5 rounded-full"
                                                            >
                                                                {skill}
                                                            </span>
                                                        )
                                                    )}

                                                    {job.skills?.length > 8 && (
                                                        <span className="text-xs text-gray-500 px-2 py-1.5">
                                                            +{job.skills.length - 8} more
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                        {/* Application Status */}
                                        <div className="w-full md:w-[280px] bg-[#faf9fc] rounded-xl p-4 border border-gray-100">

                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Application Status
                                            </p>

                                            {/* Status */}
                                            <div className="flex items-center gap-3 mt-4">

                                                <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                                                    <div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center text-white text-xs">
                                                        ✓
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-bold text-gray-800 capitalize">
                                                        {status}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        Application submitted
                                                    </p>
                                                </div>

                                            </div>

                                            {/* Line */}
                                            <div className="flex items-center mt-5">

                                                <div className="w-3 h-3 rounded-full bg-[#7C32CB]" />

                                                <div className="flex-1 h-[2px] bg-[#7C32CB]" />

                                                <div className="w-3 h-3 rounded-full bg-[#7C32CB]" />

                                            </div>

                                            <div className="flex justify-between text-[11px] text-gray-400 mt-2">
                                                <span>Applied</span>
                                                <span>Recruiter Review</span>
                                            </div>

                                            {/* Applied Date */}
                                            <div className="mt-5 pt-4 border-t border-gray-200">

                                                <p className="text-xs text-gray-400">
                                                    Applied on
                                                </p>

                                                <p className="text-sm font-semibold text-gray-700 mt-1">
                                                    {application.applied_at
                                                        ? new Date(
                                                              application.applied_at
                                                          ).toLocaleDateString(
                                                              "en-IN",
                                                              {
                                                                  day: "2-digit",
                                                                  month: "short",
                                                                  year: "numeric",
                                                              }
                                                          )
                                                        : "N/A"}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        );
                    })
                ) : (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                        <div className="text-4xl mb-3">📋</div>

                        <h2 className="text-lg font-bold text-gray-800">
                            No Jobs Applied
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Your applied jobs will appear here.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AppliedJobs;