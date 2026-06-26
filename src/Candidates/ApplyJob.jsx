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
                No Job Selected
            </div>
        )
    }

    //   =========== Apply Job =======
    const apibase = "https://job-portal-project-b2b0.onrender.com"
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
            toast.success('Applied Successfully ☑️', {
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
            navigate("/home")

        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }
    return (
        <div>
            {/* ---------------------- Job Full Card ------------------- */}
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">

                {/* <!-- Header --> */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {jobdetail?.jobtitle}
                        </h2>
                        <p className="text-gray-500">{jobdetail.work_mode} • {jobdetail.location}</p>
                    </div>

                    <div className="text-right">
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            {jobdetail?.jobtype}
                        </span>
                        <p className="mt-2 text-lg font-semibold text-indigo-600">
                            {jobdetail?.salary_range}
                        </p>
                    </div>
                </div>

                {/* <!-- Description --> */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Job Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {jobdetail?.description}
                    </p>
                </div>

                {/* <!-- Requirements --> */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Requirements
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {jobdetail?.requirements}
                    </p>
                </div>

                {/* <!-- Responsibilities --> */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Responsibilities
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {jobdetail?.responsibilities}
                    </p>
                </div>

                {/* <!-- Skills --> */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Required Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {
                            jobdetail?.skills?.length > 0 ? (
                                jobdetail?.skills?.map((skill) => (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                                ))

                            ) : (
                                <p>No Skills Required</p>
                            )
                        }
                    </div>
                </div>

                {/* <!-- Footer --> */}
                <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-t pt-4">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Experience Required:
                            <span className="font-medium text-gray-700">{jobdetail.experience_level}+ Years</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Posted on: {new Date(jobdetail?.createdAt).toLocaleDateString("en-GB")}
                        </p>
                    </div>

                    <button
                        onClick={() => applyJob(jobdetail?._id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition">
                        Apply Now
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ApplyJob