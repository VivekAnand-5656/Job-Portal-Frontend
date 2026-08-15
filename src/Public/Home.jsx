import React, { useContext, useEffect, useState } from 'react'
import work from '../assets/work.png'
import profile from '../assets/profile.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { FaRegSave } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify'


const Home = () => {
  const { token, jobdetail, setJobdetail } = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchtxt, setSearchtxt] = useState("")
  const [jobs, setJobs] = useState([])
  const [searchJobs, setSearchJobs] = useState(null)
  const jobCategory = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Data Analyst", "DevOps Engineer", "Marketing Jobs", "Remote Jobs"]
  const testimonials = [
    {
      "image": profile,
      "feedback": "“I got my first developer job within 2 weeks!”",
      "name": "Rahul Sharma"
    },
    {
      "image": profile,
      "feedback": "“Easy to use and very helpful platform.”",
      "name": "Priya Verma"
    }
  ]


  const apibase = "https://job-portal-project-b2b0.onrender.com"
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${apibase}/alljobs`)
      setJobs(response.data)
    } catch (error) {
      console.log(`Error:- ${error}`);

    }
  }
  // ---------------- Search JOBS ----------------
  const jobSearch = async (txt) => {
    try {
      if (!txt) {
        setSearchJobs(null);
        return;
      }

      const response = await axios.get(
        `${apibase}/searchjobs/${txt}`
      );

      setSearchJobs(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // ============ Search job by id ==========
  const jobSearchById = async (jobid) => {
    try {
      const response = await axios.get(
        `${apibase}/candidate/searcjjobbyid/${jobid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setJobdetail(response.data)
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // ============ Save job by id ==========
  const jobSave = async (jobid) => {
    try {
      const response = await axios.put(
        `${apibase}/candidate/savejob/${jobid}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Job Saved ☑️', {
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

    } catch (error) {
      console.log("Error:", error);
    }
  };


  useEffect(() => {
    fetchJobs()
  }, [])
  // ----------Display --------
  const displayjobs = searchJobs ?? jobs
  return (
    <>
      <div className=' w-full flex flex-col justify-center items-center  ' >

        {/* ----------- Top Banner ------------ */}
        <div className='relative w-full min-h-[90vh] overflow-hidden   text-black flex flex-col gap-6 p-4 items-center justify-center ' >

          <div className='absolute -top-16 -left-16 w-72 h-72 bg-[#7c01ff] rounded-full blur-[100px] opacity-30 pointer-events-none'></div>
          <div className='absolute -bottom-16 -right-16 w-72 h-72 bg-[#943CF3] rounded-full blur-[100px] opacity-30 pointer-events-none'></div>

          <div className='relative z-10 bg-white/10 backdrop-blur-md border border-white/20 w-[92%] sm:w-[55%] flex justify-between items-center rounded-full shadow-lg shadow-[#7c01ff]/20 p-1.5 ' >
            <input type="search" name="search" placeholder='Job title, skill, or company'
              className='w-[88%] bg-transparent p-2.5 outline-0 text-black placeholder-black '
              value={searchtxt}
              onChange={(e) => setSearchtxt(e.target.value)}
            />
            <button className=' cursor-pointer bg-linear-to-r from-[#7c01ff] to-[#943CF3] rounded-full w-11 h-11 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-md shrink-0 '
              onClick={() => jobSearch(searchtxt)}
            >🔍</button>
          </div>

          <div className='relative z-10 text-center p-2 max-w-2xl' >
            <h1 className='sm:text-[3.1em] text-[2em] font-extrabold leading-tight' >
              Find The Job That{" "}
              <span className='bg-linear-to-r from-[#c084fc] to-[#000000] bg-clip-text text-transparent'>Fits Your Life</span>
            </h1>
            <p className='text-black mt-2'>Discover opportunities, build your career and achieve your goals with JobHunt.</p>
          </div>

        </div>

        {/* -------------- Stats ---------------- */}
        <div className=' w-full flex sm:flex-row flex-wrap sm:justify-center justify-center p-4 items-center gap-3 mt-6 mb-4 ' >
          <div className=' bg-[#fcf5ca] border border-[#f0e2a3] rounded-full text-[0.85em] font-medium p-2 px-4 text-[#4a3b00] text-center cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300 ' >
            <p>💼 10,000+ Active Jobs</p>
          </div>
          <div className=' bg-[#fcf5ca] border border-[#f0e2a3] rounded-full text-[0.85em] font-medium p-2 px-4 text-[#4a3b00] text-center cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300 ' >
            <p>🏢 2,500+ Companies</p>
          </div>
          <div className=' bg-[#fcf5ca] border border-[#f0e2a3] rounded-full text-[0.85em] font-medium p-2 px-4 text-[#4a3b00] text-center cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300 ' >
            <p>👨‍💻 50,000+ Job Seekers</p>
          </div>
          <div className=' bg-[#fcf5ca] border border-[#f0e2a3] rounded-full text-[0.85em] font-medium p-2 px-4 text-[#4a3b00] text-center cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300 ' >
            <p>🌍 Opportunities Across India</p>
          </div>
        </div>


        {/* -------------- Job Catagories ----------------- */}

        <div className=' w-full bg-[#ffffff] flex justify-center items-center p-4 gap-3  flex-wrap ' >
          {
            jobCategory.map((catg, index) => (
              <div key={index} className=' bg-linear-to-r from-[#7c01ff] to-[#943CF3] text-white font-semibold rounded-full px-5 py-2.5 text-center text-sm cursor-pointer hover:shadow-lg hover:shadow-[#943CF3]/30 hover:-translate-y-0.5 transition-all duration-300 ' >
                <p>{catg}</p>
              </div>
            ))
          }
        </div>

        {/* -------------------  Jobs -----------  */}
        <div className="w-full flex flex-wrap justify-center gap-6 p-8 bg-linear-to-b from-white to-[#faf5ff]">
          {
            displayjobs.length === 0 ? (
              <h2 className="text-xl font-semibold p-4 text-gray-500">
                No Jobs Found
              </h2>
            ) : (
              displayjobs.map((job, index) => (
                <div
                  key={index}
                  className="w-full sm:w-75 bg-white border border-[#ecdefb] p-5 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[#943CF3]/10 hover:-translate-y-1 cursor-pointer transition-all duration-300"
                >
                  <div className=' flex justify-between items-center ' >
                    <h5 className="text-lg font-semibold mb-2">
                      {job.jobtitle}
                    </h5>
                    <FaRegSave className='text-[#7c01ff] hover:scale-110 transition-transform cursor-pointer' onClick={() => jobSave(job._id)} />
                  </div>

                  <div className=" w-full flex justify-between items-center mb-2">
                    <span className="bg-[#f0e6ff] text-[#7c01ff] px-2.5 py-1 rounded-full text-xs font-semibold">
                      {job.jobtype}
                    </span>

                    <p className="text-[#7c01ff] font-bold text-sm">
                      {job.salary_range.replace("per annum", "")}
                    </p>
                  </div>

                  <p className="text-gray-500 text-sm mb-3">
                    {job.work_mode} • {job.location}
                  </p>

                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <p>
                      Exp: <span className="text-gray-700">{job.experience_level}</span>
                    </p>
                    <p>{new Date(job.createdAt).toLocaleDateString("en-GB")}</p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/applyjob")
                      jobSearchById(job._id)
                    }
                    }
                    className="w-full bg-linear-to-r from-[#1a0533] to-[#2d0a4e] text-white py-2.5 rounded-xl text-sm font-medium hover:from-[#7c01ff] hover:to-[#943CF3] transition-all duration-300">
                    Full Details
                  </button>
                </div>
              ))
            )
          }
        </div>


        {/* ---------------- How it works ----------- */}
        <h1 className=' text-center w-full font-extrabold text-4xl bg-white pt-4 pb-2 ' >How It Works<span className='text-[#943CF3]'>?</span></h1>
        <div className='bg-[#ffffff] w-full sm:h-50  flex sm:flex-row flex-col gap-2 p-2  justify-center items-center ' >
          <div className=' sm:w-[50%] w-full h-50 sm:h-full  flex justify-center items-center ' >
            <img src={work} alt=""
              className=' sm:w-[30%] w-[70%] h-full  ' />
          </div>
          <div className=' sm:w-[50%] w-full sm:p-0 p-2 bg-linear-to-br from-[#7c01ff] to-[#4c0099] sm:rounded-l-4xl rounded-2xl text-white font-semibold h-full flex justify-center items-center ' >
            <ul className=' flex-col flex gap-6  ' >
              <li className='flex items-center gap-3' ><span className='bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm border border-white/30 shrink-0'>1</span>🔎 Search Jobs — Find jobs based on skills & location</li>
              <li className='flex items-center gap-3' ><span className='bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm border border-white/30 shrink-0'>2</span>📝 Apply Easily — Submit your resume in one click</li>
              <li className='flex items-center gap-3' ><span className='bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm border border-white/30 shrink-0'>3</span>🎯 Get Hired — Connect directly with recruiters</li>
            </ul>
          </div>
        </div>


        {/* ----------------------- Testimonials ---------------- */}
        <div className=' bg-linear-to-b from-[#faf5ff] to-white w-full flex justify-center items-center flex-wrap gap-6 p-8 ' >
          {
            testimonials.map((content, index) => (
              <div key={index} className=' bg-white border border-[#ecdefb] shadow-md w-55 flex flex-col justify-evenly rounded-2xl cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 items-center gap-3 p-5  ' >
                <img src={content.image} alt="" className=' w-16 h-16 rounded-full object-cover border-4 border-[#f0e6ff] ' />
                <p className=' font-medium text-center text-sm text-gray-600 italic ' >"{content.feedback}"</p>
                <p className='text-[#7c01ff] font-semibold text-sm'>{content.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home