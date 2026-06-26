import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IoMdCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import clogo from '../assets/clogo.png'
import { toast, Bounce } from 'react-toastify';

const MyPosts = () => {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    const [myposts, setMyposts] = useState([])
    const apibase = "https://job-portal-project-b2b0.onrender.com"

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${apibase}/recruiter/myposts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setMyposts(response.data)
            console.log(`My Posts:- ${response.data}`);

        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }

    // =========== Edit Posts =========
    const [isEdit, setIsEdit] = useState(null)
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

    const jobPost = async (e) => {
        e.preventDefault()
        const payload = {
            ...formData,
            skills: formData.skills.split(",").map((skill) => skill.trim()),
        }
        try {

            const response = await axios.put(`${apibase}/recruiter/updatepost/${isEdit}`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success('Post Updated ', {
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
            fetchPosts()
            setIsEdit(null)
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

    // ============ View Job Post ==============
    const [viewId, setViewId] = useState(null)
    const [post, setPost] = useState({})
    const viewPost = async () => {
        try {
            const response = await axios.get(`${apibase}/recruiter/viewPost/${viewId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setPost(response.data)
            for (const elm of response.data) {
                console.log(`Datas :- ${elm}`)
            }
            setViewId(null)
            console.log(`Data:- ${response.data}`);

        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }

    // ================== Delete Skill ==============
    const deleteSkill = async (postId, skil) => {
        try {
            const response = await axios.patch(`${apibase}/recruiter/deleteskill/${postId}?skill=${skil}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            viewPost()
            fetchPosts()
            alert("Skill Deleted")
        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }

    // =============== edit Skill =====
    const [skil, setSkil] = useState("")
    const editSkill = async (postId) => {
        try {
            const data = {
                skills: [skil]
            }
            const response = await axios.patch(`${apibase}/recruiter/editskill/${postId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert("Skills Updated")
            fetchPosts()
            viewPost()
            setSkil("")


        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // =================== Delete Post ========
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apibase}/recruiter/deletepost/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success('Post Deleted Successfully ☑️', {
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
            fetchPosts()
        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }
    // ============= Logo Upload =========
    // const [logo, setLogo] = useState(null)
    // const [selectedFiles, setSelectedFiles] = useState({});
    // const uploadLogo = async (postId, file) => {
    //     if (!file) {
    //         alert("Please Select File")
    //         return
    //     }
    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file)
    //         const response = await axios.put(`${apibase}/recruiter/uploadlogo/${postId}`,
    //             formData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //         ) 
    //         await fetchPosts()
    //         alert("Logo Uploaded")
    //         setSelectedFiles({})

    //     } catch (error) {
    //         console.log(`Error:- ${error}`)
    //     }
    // }

    useEffect(() => {
        if (token) {
            fetchPosts()
        }
    }, [token])

    return (
        <div className=' w-full p-1.5 ' >
            <h1 className=' text-[1rem] font-bold  ' >
                My Posts
            </h1>
            <div className=' w-full flex flex-wrap gap-2 ' >
                {
                    myposts?.length > 0 ? (
                        myposts.map((post, index) => (
                            <div key={post._id} className="w-full max-w-md bg-white rounded-xl shadow-md p-5 flex flex-col justify-between gap-3 hover:shadow-xl transition">
                                <MdDelete className=' self-end cursor-pointer text-[#ff0808]  '
                                    onClick={() => deletePost(post._id)}
                                />
                                {/* Top Title */}
                                {/* <div className=" w-full p-1 relative h-20  rounded-full flex justify-between items-center  ">

                                    <img
                                        src={post?.logo_url ? `${post.logo_url}` : `${clogo}`}
                                        alt="profile"
                                        className=" absolute w-20 h-20 rounded-full bg-white"
                                    />
                                     <label
                                        htmlFor="logoUpload"
                                        className=" absolute  left-10 -bottom-2 p-1.5 bg-[#943CF3] text-white rounded-full cursor-pointer"
                                    >
                                        📷
                                    </label>

                                    <input
                                        id="logoUpload"
                                        type="file"
                                        accept=".jpg,.png"
                                        onChange={(e) =>
                                            setSelectedFiles({ 
                                                [post._id]: e.target.files[0]
                                            })
                                        }
                                        className="hidden"
                                    />
                                    <button
                                        onClick={() => uploadLogo(post._id, selectedFiles[post._id])}
                                        className='  absolute right-0 rounded bg-[#943CF3] p-1 text-white '
                                    >Upload Logo</button>

                                </div> */}
                                <h1 className="text-xl font-bold text-gray-800">
                                    {post.jobtitle}
                                </h1>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                                        {post.work_mode}
                                    </span>
                                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                                        {post.location}
                                    </span>
                                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                                        {post.jobtype}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {post.description}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {post.skills?.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Salary + Experience */}
                                <div className="flex justify-between text-sm text-gray-700">
                                    <span>{post.salary_range.replace("per annum", "")}</span>
                                    <span>{post.experience_level}</span>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setViewId(post._id)
                                            viewPost()
                                        }}
                                        className="flex-1 bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800">
                                        View
                                    </button>

                                    <button
                                        onClick={() => {
                                            setIsEdit(post._id);

                                            setFormData({
                                                jobtitle: post.jobtitle,
                                                description: post.description,
                                                requirements: post.requirements,
                                                responsibilities: post.responsibilities,
                                                work_mode: post.work_mode,
                                                location: post.location,
                                                skills: post.skills?.join(", "),
                                                experience_level: post.experience_level,
                                                salary_range: post.salary_range,
                                                jobtype: post.jobtype
                                            });
                                        }}
                                        className="flex-1 border border-gray-300 text-sm py-2 rounded-lg hover:bg-gray-100">
                                        Edit
                                    </button>
                                </div>

                                {/* ============= View Post Detail ========= */}
                                {
                                    viewId === post._id && (
                                        <div className=' sm:w-[50vw] w-full overflow-scroll flex flex-col  job h-full fixed top-0 sm:left-75 left-0 sm:p-2 p-1 sm:rounded-2xl bg-[#ffffff] z-50  border ' >
                                            <button onClick={() => setViewId(null)} className='text-2xl self-end cursor-pointer ' ><IoMdCloseCircle /></button>
                                            <div>
                                                <div className="w-full min-h-screen bg-[#f8f3ff] flex justify-center sm:p-6 p-2 ">

                                                    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg sm:p-8 p-2 flex flex-col gap-8">

                                                        {/* Header */}
                                                        <div className="border-b pb-6">
                                                            <h1 className="text-4xl font-bold text-gray-800">
                                                                {post.jobtitle}
                                                            </h1>

                                                            <div className="flex flex-wrap gap-3 mt-4">

                                                                <span className="bg-[#f1e6ff] text-[#943CF3] px-3 py-1 rounded-full text-sm">
                                                                    {post.work_mode}
                                                                </span>

                                                                <span className="bg-[#f1e6ff] text-[#943CF3] px-3 py-1 rounded-full text-sm">
                                                                    {post.city} {post.location}
                                                                </span>

                                                                <span className="bg-[#f1e6ff] text-[#943CF3] px-3 py-1 rounded-full text-sm">
                                                                    {post.jobtype}
                                                                </span>

                                                                <span className="bg-[#f1e6ff] text-[#943CF3] px-3 py-1 rounded-full text-sm">
                                                                    {post.experience_level} Years Experience
                                                                </span>

                                                            </div>

                                                            <div className="mt-4 flex flex-wrap gap-6 text-gray-600">

                                                                <p>
                                                                    <span className="font-semibold">Salary:</span>{" "}
                                                                    {post.salary_range}
                                                                </p>

                                                                <p>
                                                                    <span className="font-semibold">Applicants:</span>{" "}
                                                                    {
                                                                        post.applied_candidates?.length != 0
                                                                            ? post.applied_candidates?.length
                                                                            : " No Applied "
                                                                    } {" "}
                                                                    Candidates
                                                                </p>

                                                            </div>

                                                        </div>

                                                        {/* Description */}
                                                        <div>
                                                            <h2 className="text-2xl font-semibold mb-3">
                                                                Job Description
                                                            </h2>

                                                            <p className="text-gray-600 leading-7">
                                                                {post.description}
                                                            </p>
                                                        </div>

                                                        {/* Requirements */}
                                                        <div>
                                                            <h2 className="text-2xl font-semibold mb-3">
                                                                Requirements
                                                            </h2>

                                                            <p className="text-gray-600 leading-7">
                                                                {post.requirements}
                                                            </p>
                                                        </div>

                                                        {/* Responsibilities */}
                                                        <div>
                                                            <h2 className="text-2xl font-semibold mb-3">
                                                                Responsibilities
                                                            </h2>

                                                            <p className="text-gray-600 leading-7">
                                                                {post.responsibilities}
                                                            </p>
                                                        </div>

                                                        {/* Skills */}
                                                        <div>
                                                            <h2 className="text-2xl font-semibold mb-4">
                                                                Required Skills
                                                            </h2>

                                                            <div className="flex flex-wrap gap-3">

                                                                {post.skills.map((skill, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="bg-[#943CF3] text-white px-4 flex justify-center items-center gap-2 py-2 rounded-full text-sm"
                                                                    >
                                                                        {skill} <span
                                                                            onClick={() => deleteSkill(post._id, skill.trim())}
                                                                            className=' text-[#ffe30e] cursor-pointer ' ><IoMdCloseCircle /></span>
                                                                    </span>
                                                                ))}

                                                                <div className=' w-full border outline-0 rounded p-2 ' >
                                                                    <input type="text" name='skills' placeholder='Add Skills...'
                                                                        value={skil}
                                                                        onChange={(e) => setSkil(e.target.value)}
                                                                    />
                                                                    <button className='text-white p-1.5 rounded bg-[#943CF3] '
                                                                        onClick={() => editSkill(post._id)}
                                                                    >Update Skills</button>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="border-t pt-6 flex justify-between items-center flex-wrap gap-4">

                                                            <p className="text-gray-500">
                                                                Posted on: {new Date(post.createdAt).toLocaleDateString("en-GB")}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    )
                                }

                                {/* ============= Edit Post ============== */}
                                {
                                    isEdit === post._id && (

                                        <div className=' sm:w-[50vw] w-full flex flex-col overflow-scroll h-full fixed top-0 sm:left-75 left-0 p-2 sm:rounded-2xl bg-[#ffffff]  sm:z-0 z-50 ' >
                                            <button onClick={() => setIsEdit(null)} className=' self-end text-2xl ' ><IoMdCloseCircle /> </button>
                                            <h1 className=' text-[1.2rem] font-bold ' >Post Edit</h1>
                                            <form
                                                onSubmit={jobPost}
                                                className="w-full max-w-3xl mx-auto bg-white sm:p-6 p-2 sm:rounded-xl sm:shadow-md flex flex-col gap-4">

                                                <input
                                                    type="text"
                                                    name="jobtitle"
                                                    placeholder="Job Title"
                                                    value={formData.jobtitle}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0 p-2 rounded"
                                                />

                                                <textarea
                                                    name="description"
                                                    placeholder="Job Description"
                                                    rows="4"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0  p-2 rounded resize-none"
                                                />

                                                <textarea
                                                    name="requirements"
                                                    placeholder="Requirements"
                                                    rows="4"
                                                    value={formData.requirements}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0  p-2 rounded resize-none"
                                                />

                                                <textarea
                                                    name="responsibilities"
                                                    placeholder="Responsibilities"
                                                    rows="4"
                                                    value={formData.responsibilities}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0  p-2 rounded resize-none"
                                                />

                                                <input
                                                    type="text"
                                                    name="location"
                                                    placeholder="Location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0  p-2 rounded"
                                                />

                                                <select
                                                    name="work_mode"
                                                    value={formData.work_mode}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0  p-2 rounded"
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
                                                    className="border border-[#943CF3] outline-0  p-2 rounded"
                                                />

                                                <input
                                                    type="number"
                                                    name="experience_level"
                                                    placeholder="Experience Required (Years)"
                                                    value={formData.experience_level}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0  p-2 rounded"
                                                />

                                                <input
                                                    type="text"
                                                    name="salary_range"
                                                    placeholder="Salary Range"
                                                    value={formData.salary_range}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0  p-2 rounded"
                                                />

                                                <select
                                                    name="jobtype"
                                                    value={formData.jobtype}
                                                    onChange={handleChange}
                                                    className="border border-[#943CF3] outline-0  p-2 rounded"
                                                >
                                                    <option value="">Select Job Type</option>
                                                    <option value="Full-time">Full-time</option>
                                                    <option value="Part-time">Part-time</option>
                                                    <option value="Internship">Internship</option>
                                                    <option value="Contract">Contract</option>
                                                </select>

                                                <button
                                                    type="submit"
                                                    className="bg-[#943CF3] font-bold text-white py-2 rounded hover:bg-purple-700"
                                                >
                                                    Post Job
                                                </button>

                                            </form>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    ) : (
                        <p>No Posts Found</p>
                    )
                }
            </div>
        </div>
    )
}

export default MyPosts