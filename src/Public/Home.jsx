import React, { useContext, useEffect, useState } from 'react'
import background from '../assets/background.png'
import work from '../assets/work.png'
import profile from '../assets/profile.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { FaRegSave } from "react-icons/fa";


const Home = () => {
  const {token,jobdetail,setJobdetail} = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchtxt, setSearchtxt] = useState("")
  const [jobs, setJobs] = useState([])
  const [searchJobs,setSearchJobs] = useState(null)
  const jobCategory = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "Data Analyst", "DevOps Engineer", "Marketing Jobs", "Remote Jobs"]
  const testimonials = [
    {
      "image":profile,
      "feedback":"“I got my first developer job within 2 weeks!”",
      "name":"Rahul Sharma"
    },
    {
      "image":profile,
      "feedback":"“Easy to use and very helpful platform.”",
      "name":"Priya Verma"
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
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      console.log("Job:- ",response.data);
      
      setJobdetail(response.data)
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // ============ Save job by id ==========
  const jobSave = async (jobid) => {
    try { 
      const response = await axios.put(
        `${apibase}/candidate/savejob/${jobid}`,{},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      ); 
      alert("job saved")
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
      <div className=' w-full flex flex-col justify-center items-center ' >
        {/* ----------- Top Banner ------------ */}
        <div className='bg-[#e2c7ff] w-full  h-[90vh] flex flex-col gap-4 justify-center items-center ' >
          <div className=' text-center ' >
            <h1 className=' text-7xl font-bold ' >Find The Job That Fits Your Life</h1>
            <p>Discover opportunities, build your career and achieve your goals with JobHunt.</p>
          </div>
          <div className='bg-[#ffffffaa] w-[80%] flex justify-center items-center rounded-2xl  ' >
            <input type="search" name="search" placeholder='Job title, skill, or company'
              className='w-[90%]    p-2 outline-0 border-r-2 border-r-[#000000] ' 
              value={searchtxt}
              onChange={(e)=>setSearchtxt(e.target.value)}
              />
            <button className=' cursor-pointer  rounded-full w-[10%] h-full ' 
            onClick={()=>jobSearch(searchtxt)}
            >🔍</button>
          </div>
          <div>
            <img src={background} alt="main" className='  w-63 h-63  ' />
          </div>
        </div>
        {/* -------------- Stats ---------------- */}
        <div className=' w-[50%] flex justify-center items-center gap-4 mb-4 ' >
          <div className=' bg-[#ffffff] rounded-2xl p-2 text-center cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out ' >
            <p>💼 10,000+ Active Jobs</p>
          </div>
          <div className=' bg-[#ffffff] rounded-2xl p-2 text-center cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out ' >
            <p>🏢 2,500+ Companies</p>
          </div>
          <div className=' bg-[#ffffff] rounded-2xl p-2 text-center cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out ' >
            <p>👨‍💻 50,000+ Job Seekers</p>
          </div>
          <div className=' bg-[#ffffff] rounded-2xl p-2 text-center cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out ' >
            <p>🌍 Opportunities Across India</p>
          </div>
        </div>
        {/* -------------- Job Catagories ----------------- */}

        <div className=' w-full bg-[#ffffff] flex justify-center items-center p-2 gap-4  flex-wrap ' >
          {
            jobCategory.map((catg,index) => (
              <div key={index}  className=' bg-[#7c01ff] text-white font-semibold rounded-2xl p-2 text-center cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out ' >
                <p>{catg}</p>
              </div>
            ))
          } 
        </div>
        {/* -------------------  Jobs -----------  */}
        <div className="w-full flex flex-wrap justify-center gap-6 p-8 bg-white">
          {
          displayjobs.length === 0?(
            <h2 className="text-xl font-semibold p-4">
              No Jobs Found
            </h2>
          ):(
            displayjobs.map((job, index) => (
            <div
              key={index}
              className="w-full sm:w-[300px] bg-[#ecdefb] p-4 rounded-2xl shadow-sm cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className=' flex justify-between items-center ' >
                <h5 className="text-xl font-semibold mb-2">
                {job.jobtitle}
              </h5>
              <FaRegSave onClick={()=>jobSave(job._id)} />
              </div>

              <div className=" w-full flex justify-between items-center mb-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  {job.jobtype}
                </span>

                <p className="text-indigo-600 font-semibold text-sm">
                  {job.salary_range.replace("per annum", "")}
                </p>
              </div>

              <p className="text-gray-500 text-sm mb-3">
                {job.work_mode} • {job.location}
              </p>

              <div className="flex justify-between text-xs text-gray-500 mb-3">
                <p>
                  Exp: <span className="text-gray-700">{job.experience_level}</span>
                </p>
                <p>{new Date(job.createdAt).toLocaleDateString("en-GB")}</p>
              </div>

              <button 
              onClick={()=>{
                navigate("/applyjob")
                jobSearchById(job._id)
              }
              }
              className="w-full bg-black text-white py-2 rounded-xl text-sm hover:bg-gray-800 transition">
                Full Details
              </button>
            </div>
          ))
          )
          }
        </div>
        {/* ---------------- How it works ----------- */}
        <h1 className=' text-center w-full font-bold text-4xl bg-white ' >How It Works ?</h1>
        <div className='bg-[#ffffff] w-full h-50 flex gap-2 p-2  justify-center items-center ' >
          <div className=' w-[50%] h-full flex justify-center items-center ' >
            <img src={work} alt="" 
            className=' w-[30%] h-full  '/>
          </div>
          <div className=' w-[50%] bg-[#943CF3] rounded-l-4xl text-white font-semibold h-full flex justify-center items-center ' >
              <ul className=' flex-col flex gap-5  ' >
                <li className='border-l-2 ' >🔎 Search Jobs — Find jobs based on skills & location</li>
                <li className='border-l-2 '>📝 Apply Easily — Submit your resume in one click</li>
                <li className='border-l-2 '>🎯 Get Hired — Connect directly with recruiters</li>
              </ul>
          </div>
        </div>
        {/* ----------------------- Testimonials ---------------- */}
        <div className=' bg-[#ffffff] w-full flex justify-center items-center flex-wrap gap-4 p-2 ' >
          {
            testimonials.map((content,index)=>(
              <div key={index} className=' bg-[#943CF3] text-white  w-[200px] h-[200px] flex flex-col justify-evenly rounded-2xl cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out items-center p-2  ' >
                <img src={content.image} alt="" className=' w-[50%] h-[50%] rounded-full ' />
                <p className=' font-semibold text-center ' >{content.feedback}</p>
                <p>{content.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home