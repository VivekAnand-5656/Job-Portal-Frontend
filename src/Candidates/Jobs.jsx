import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcFilledFilter } from "react-icons/fc";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterJob, setFilterJob] = useState(null);

  const apibase = "https://job-portal-project-b2b0.onrender.com";

  // ---------------- FETCH ALL JOBS ----------------
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${apibase}/alljobs`);
      setJobs(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // ---------------- FILTER JOBS ----------------
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

  useEffect(() => {
    fetchJobs();
  }, []);


  const displayJobs = filterJob ?? jobs;

  return (
    <div className="w-full sm:h-screen  flex sm:flex-row flex-col justify-between items-center">

      {/* ---------------- LEFT FILTER ---------------- */}
      <div className="sm:w-[15%] w-full sm:rounded-r-2xl text-white flex sm:flex-col flex-row overflow-scroll job p-2 sm:gap-4 gap-2 h-full bg-[#7c01ff]">

        <button
          className="cursor-pointer flex justify-center items-center font-semibold"
          onClick={() => jobfilter(filterText)}
        >
          Filter <FcFilledFilter />
        </button>

        <select
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="p-2 rounded bg-white text-black outline-0 cursor-pointer"
        >
          <option value="">All Jobs</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="ui/">UI/UX Designer</option>
          <option value="React Developer">React Developer</option>
          <option value="Java Developer">Java Developer</option>
          <option value="Python Developer">Python Developer</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Software Engineer">Software Engineer</option>
        </select>

        {/* ---------- Skills ------- */}
        <select
          name="skills"
          className="p-2 rounded bg-white text-black outline-0 cursor-pointer"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        >
          <option value="">Select Skill</option>

          {/* Frontend */}
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="React">React</option>
          <option value="Next.js">Next.js</option>
          <option value="Vue.js">Vue.js</option>
          <option value="Angular">Angular</option>
          <option value="Tailwind CSS">Tailwind CSS</option>

          {/* Backend */}
          <option value="Node.js">Node.js</option>
          <option value="Express.js">Express.js</option>
          <option value="FastAPI">FastAPI</option>
          <option value="Django">Django</option>
          <option value="Spring Boot">Spring Boot</option>
          <option value="Java">Java</option>

          {/* Database */}
          <option value="MongoDB">MongoDB</option>
          <option value="MySQL">MySQL</option>
          <option value="PostgreSQL">PostgreSQL</option>

          {/* Tools */}
          <option value="Git">Git</option>
          <option value="Docker">Docker</option>
          <option value="AWS">AWS</option>

          {/* Data */}
          <option value="Python">Python</option>
          <option value="Machine Learning">Machine Learning</option>

          {/* UI/UX */}
          <option value="Figma">Figma</option>
          <option value="Adobe XD">Adobe XD</option>
        </select>

        {/* -------------- Work Mode ----------- */}
        <select
          name="work_mode"
          className="p-2 rounded bg-white text-black outline-0 cursor-pointer"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        >
          <option value="">Select Work Mode</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">Onsite</option>

        </select>

        {/* ------------- Location --------------- */}
        <select
          name="location"
          className="p-2 rounded bg-white text-black outline-0 cursor-pointer"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
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

          {/* Optional extended cities */}
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Lucknow">Lucknow</option>
          <option value="Indore">Indore</option>
        </select>
      </div>

      {/* ---------------- RIGHT SIDE ---------------- */}
      <div className="sm:w-[85%] w-full  h-full p-2 flex flex-col gap-2">

        <h1 className="sm:text-3xl  font-bold">
          Find Jobs That Match Your Skills
        </h1>

        {/* ---------------- JOB LIST ---------------- */}
        <div className="job w-full bg-[#d2a8fe] p-2 flex gap-2 flex-wrap rounded-2xl justify-center overflow-scroll">

          {displayJobs.length === 0 ? (
            <h2 className="text-xl font-semibold p-4">
              No Jobs Found
            </h2>
          ) : (
            displayJobs.map((job) => (
              <div
                key={job._id}
                className="w-80 bg-white rounded-xl flex flex-col justify-between cursor-pointer hover:scale-105 shadow-md p-4 transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.jobtitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {job.location}
                    </p>
                  </div>

                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    {job.work_mode}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {job.description}
                </p>

                {/* SKILLS */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* EXPERIENCE + DATE */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>💼 {job.experience_level} years</span>
                  <span>
                    📅{" "}
                    {new Date(job.createdAt).toLocaleDateString(
                      "en-IN"
                    )}
                  </span>
                </div>

                {/* SALARY + BUTTON */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm font-medium text-green-600">
                    {job.salary_range.replace("per annum", "")}
                  </p>

                  <button className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-purple-700">
                    Apply
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;