import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'

const PostJob = () => {
    const { token } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        jobtitle: "",
        description: "",
        requirements: "",
        responsibilities: "",
        work_mode: "",
        location: "",
        skills: "",
        experience_level: "",
        salary_range: "",
        jobtype: ""
    })
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const apibase = "https://job-portal-project-b2b0.onrender.com"
    // =========== Post Jobs =========
    const jobPost = async (e) => {
        e.preventDefault()
        const payload = {
            ...formData,
            skills: formData.skills.split(",").map((skill) => skill.trim()),
        }
        try {
            const response = await axios.post(`${apibase}/recruiter/postjob`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert("Job Posted Successfully")
            setFormData({
                jobtitle: "",
                description: "",
                requirements: "",
                responsibilities: "",
                work_mode: "",
                location: "",
                skills: "",
                experience_level: "",
                salary_range: "",
                jobtype: ""
            })
        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }
    return (
        <div>
            <form
                onSubmit={jobPost}
                className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">

                <input
                    type="text"
                    name="jobtitle"
                    placeholder="Job Title"
                    value={formData.jobtitle}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 rounded resize-none"
                />

                <textarea
                    name="requirements"
                    placeholder="Requirements"
                    rows="4"
                    value={formData.requirements}
                    onChange={handleChange}
                    className="border p-2 rounded resize-none"
                />

                <textarea
                    name="responsibilities"
                    placeholder="Responsibilities"
                    rows="4"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    className="border p-2 rounded resize-none"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <select
                    name="work_mode"
                    value={formData.work_mode}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Work Mode</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                </select>

                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma separated)"
                    value={formData.skills}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="experience_level"
                    placeholder="Experience Required (Years)"
                    value={formData.experience_level}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="salary_range"
                    placeholder="Salary Range"
                    value={formData.salary_range}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <select
                    name="jobtype"
                    value={formData.jobtype}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                </select>

                <button
                    type="submit"
                    className="bg-[#943CF3] text-white py-2 rounded hover:bg-purple-700"
                >
                    Post Job
                </button>

            </form>
        </div>
    )
}

export default PostJob