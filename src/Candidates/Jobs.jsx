import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FcFilledFilter } from "react-icons/fc";
import { AuthContext } from "../Context/AuthContext";
import { toast, Bounce } from "react-toastify";

const Jobs = () => {
    const { token } = useContext(AuthContext);

    const [jobs, setJobs] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filterJob, setFilterJob] = useState(null);

    // Applied jobs IDs
    const [appliedJobs, setAppliedJobs] = useState([]);

    const apibase = "https://job-portal-project-b2b0.onrender.com";

    // ================= FETCH ALL JOBS =================
    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${apibase}/alljobs`);
            setJobs(response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    // ================= FILTER JOBS =================
    const jobfilter = async (txt) => {
        try {
            if (!txt) {
                setFilterJob(null);
                return;
            }

            const response = await axios.get(
                `${apibase}/filterjobs/${txt}`
            );

            setFilterJob(response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    // ================= APPLY JOB =================
    const applyJob = async (jobid) => {
        try {
            const response = await axios.put(
                `${apibase}/candidate/applyjob/${jobid}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.is_applied === true) {

                setAppliedJobs((prev) => [...prev, jobid]);

                toast.error("Already applied this job!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });

                return;
            }

            toast.success("Applied Successfully ☑️", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });

            setAppliedJobs((prev) => [...prev, jobid]);

            console.log("Apply response:", response.data);

        } catch (error) {
            console.log("Apply Job Error:", error);
            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);

            toast.error(
                error.response?.data?.detail ||
                    "Failed to apply for this job",
                {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                }
            );
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const displayJobs = filterJob ?? jobs;

    return (
        <div className="w-full min-h-screen bg-[#d7e1f7] p-3 md:p-5">

            {/* ================= MAIN ================= */}
            <div className="w-full flex flex-col md:flex-row gap-4">

                {/* ================= FILTER ================= */}
                <div className="w-full md:w-[22%] bg-white/70 rounded-2xl p-4 shadow-sm">

                    <div className="flex items-center justify-between mb-4">

                        <div>
                            <p className="text-xs text-[#7C32CB] font-semibold">
                                EXPLORE
                            </p>

                            <h2 className="text-lg font-bold text-gray-900">
                                Filters
                            </h2>
                        </div>

                        <FcFilledFilter size={24} />

                    </div>

                    <div className="flex flex-col gap-3">

                        {/* Job Type */}
                        <select
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="p-3 rounded-xl bg-white text-gray-700 outline-none border border-gray-100 cursor-pointer text-sm"
                        >
                            <option value="">All Jobs</option>
                            <option value="Frontend Developer">
                                Frontend Developer
                            </option>
                            <option value="Backend Developer">
                                Backend Developer
                            </option>
                            <option value="Full Stack Developer">
                                Full Stack Developer
                            </option>
                            <option value="React Developer">
                                React Developer
                            </option>
                            <option value="Python Developer">
                                Python Developer
                            </option>
                            <option value="Java Developer">
                                Java Developer
                            </option>
                            <option value="DevOps Engineer">
                                DevOps Engineer
                            </option>
                            <option value="Data Analyst">
                                Data Analyst
                            </option>
                            <option value="Software Engineer">
                                Software Engineer
                            </option>
                        </select>

                        {/* Skills */}
                        <select
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="p-3 rounded-xl bg-white text-gray-700 outline-none border border-gray-100 cursor-pointer text-sm"
                        >
                            <option value="">Select Skill</option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="React">React</option>
                            <option value="Next.js">Next.js</option>
                            <option value="Tailwind CSS">Tailwind CSS</option>
                            <option value="Python">Python</option>
                            <option value="FastAPI">FastAPI</option>
                            <option value="Django">Django</option>
                            <option value="MongoDB">MongoDB</option>
                            <option value="MySQL">MySQL</option>
                            <option value="PostgreSQL">PostgreSQL</option>
                            <option value="Docker">Docker</option>
                            <option value="AWS">AWS</option>
                            <option value="Machine Learning">
                                Machine Learning
                            </option>
                        </select>

                        {/* Work Mode */}
                        <select
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="p-3 rounded-xl bg-white text-gray-700 outline-none border border-gray-100 cursor-pointer text-sm"
                        >
                            <option value="">Select Work Mode</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Onsite">Onsite</option>
                        </select>

                        {/* Location */}
                        <select
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="p-3 rounded-xl bg-white text-gray-700 outline-none border border-gray-100 cursor-pointer text-sm"
                        >
                            <option value="">Select Location</option>
                            <option value="Patna">Patna</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Noida">Noida</option>
                            <option value="Gurgaon">Gurgaon</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Pune">Pune</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Kolkata">Kolkata</option>
                        </select>

                        <button
                            onClick={() => jobfilter(filterText)}
                            className="w-full bg-[#7C32CB] text-white py-3 rounded-xl font-semibold hover:bg-[#6825ac] transition"
                        >
                            Apply Filter
                        </button>

                    </div>
                </div>

                {/* ================= JOB SECTION ================= */}
                <div className="w-full md:w-[78%]">

                    {/* Header */}
                    <div className="bg-white/70 rounded-2xl p-4 mb-4">

                        <p className="text-xs text-[#7C32CB] font-semibold">
                            JOB MARKET
                        </p>

                        <div className="flex justify-between items-center gap-3">

                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                Find Jobs That Match Your Skills
                            </h1>

                            <span className="hidden sm:block text-sm text-gray-500">
                                {displayJobs.length} Jobs
                            </span>

                        </div>

                    </div>

                    {/* Job List */}
                    <div className="flex flex-col gap-4">

                        {displayJobs.length === 0 ? (

                            <div className="bg-white rounded-2xl p-10 text-center">
                                <p className="text-3xl mb-2">🔎</p>

                                <h2 className="text-lg font-bold text-gray-800">
                                    No Jobs Found
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Try another filter.
                                </p>
                            </div>

                        ) : (

                            displayJobs.map((job) => {

                                const alreadyApplied =
                                    appliedJobs.includes(job._id);

                                return (
                                    <div
                                        key={job._id}
                                        className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300"
                                    >

                                        {/* Job Header */}
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">

                                            <div>

                                                <h2 className="text-xl font-bold text-gray-900">
                                                    {job.jobtitle}
                                                </h2>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    📍 {job.location}
                                                </p>

                                            </div>

                                            <span className="self-start bg-[#f1e9ff] text-[#7C32CB] px-3 py-1.5 rounded-full text-xs font-semibold">
                                                {job.work_mode}
                                            </span>

                                        </div>

                                        {/* Job Description */}
                                        <p className="text-sm text-gray-600 leading-6 mt-4">
                                            {job.description}
                                        </p>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2 mt-4">

                                            {job.skills?.slice(0, 8).map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs font-medium bg-[#f5f1fa] text-[#6B21A8] px-3 py-1.5 rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )}

                                            {job.skills?.length > 8 && (
                                                <span className="text-xs text-gray-400 px-2 py-1.5">
                                                    +{job.skills.length - 8} more
                                                </span>
                                            )}

                                        </div>

                                        {/* Job Details */}
                                        <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-500">

                                            <span>
                                                💼 {job.experience_level} years
                                            </span>

                                            <span>
                                                🏢 {job.jobtype}
                                            </span>

                                            <span className="text-[#6B21A8] font-semibold">
                                                💰 {job.salary_range?.replace(
                                                    "per annum",
                                                    ""
                                                )}
                                            </span>

                                            <span>
                                                📅{" "}
                                                {new Date(
                                                    job.createdAt
                                                ).toLocaleDateString("en-IN")}
                                            </span>

                                        </div>

                                        {/* Bottom */}
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-5 pt-4 border-t border-gray-100">

                                            <p className="text-xs text-gray-400">
                                                Apply before the position is filled
                                            </p>

                                            <button
                                                onClick={() =>
                                                    applyJob(job._id)
                                                }
                                                disabled={alreadyApplied}
                                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                                                    alreadyApplied
                                                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                                                        : "bg-[#050205] text-white hover:bg-[#1a003f]"
                                                }`}
                                            >
                                                {alreadyApplied
                                                    ? "Applied ✓"
                                                    : "Apply Now"}
                                            </button>

                                        </div>

                                    </div>
                                );
                            })
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;