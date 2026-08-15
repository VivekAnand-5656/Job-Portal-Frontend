import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, Bounce } from 'react-toastify'

const ApplyJob = () => {
    const { token, jobdetail } = useContext(AuthContext)
    const navigate = useNavigate()
    if (!jobdetail) {
        return (
            <div className="text-center mt-10 text-gray-500">
                No job selected
            </div>
        )
    }

    //   =========== Apply Job =======
    const apibase = "https://job-portal-project-b2b0.onrender.com"

    const applyJob = async (jobid) => {
        try {
            const response = await axios.put(
                `${apibase}/candidate/applyjob/${jobid}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Apply response:", response.data);

            toast.success("Applied Successfully ☑️", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });

            navigate("/home");

        } catch (error) {
            console.log("Apply Job Error:", error);

            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);
            console.log("Headers:", error.response?.headers);

            toast.error(
                error.response?.data?.detail || "Failed to apply for this job",
                {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored"
                }
            );
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#d7e1f7] p-4 md:p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-br from-[#7C32CB] to-[#5B21B6] text-white p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {jobdetail?.jobtitle}
                            </h2>
                            <p className="text-white/70 mt-1 flex items-center gap-1">
                                📍 {jobdetail.work_mode} • {jobdetail.location}
                            </p>
                        </div>

                        <div className="text-left md:text-right">
                            <span className="inline-block bg-white/15 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                                {jobdetail?.jobtype}
                            </span>
                            <p className="mt-2 text-lg font-semibold text-[#FCD34D]">
                                {jobdetail?.salary_range}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">

                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#5B21B6] uppercase tracking-wide mb-2">
                            Job description
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {jobdetail?.description}
                        </p>
                    </div>

                    {/* Requirements */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-[#5B21B6] uppercase tracking-wide mb-2">
                            Requirements
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {jobdetail?.requirements}
                        </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-[#5B21B6] uppercase tracking-wide mb-2">
                            Responsibilities
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {jobdetail?.responsibilities}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-[#5B21B6] uppercase tracking-wide mb-3">
                            Required skills
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {
                                jobdetail?.skills?.length > 0 ? (
                                    jobdetail?.skills?.map((skill, i) => (
                                        <span key={i} className="bg-[#7C32CB]/10 text-[#5B21B6] px-3 py-1 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-sm">No skills required</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#faf9fc] p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500 space-y-1">
                        <p>
                            Experience required: <span className="font-medium text-gray-700">{jobdetail.experience_level}+ years</span>
                        </p>
                        <p>
                            Posted on {new Date(jobdetail?.createdAt).toLocaleDateString("en-GB")}
                        </p>
                    </div>

                    <button
                        onClick={() => applyJob(jobdetail?._id)}
                        className="bg-[#7C32CB] hover:bg-[#5B21B6] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full md:w-auto"
                    >
                        Apply now
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ApplyJob