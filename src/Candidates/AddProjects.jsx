import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { GiCancel } from "react-icons/gi";

const AddProjects = () => {
  const { token,showPro,setShowPro } = useContext(AuthContext)

  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: "",
    start_date: "",
    end_date: "",
    currently_working: false,
    github_url: "",
    live_url: ""
  })

  const apibase = "https://job-portal-project-b2b0.onrender.com"

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setProject({
      ...project,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = {
        ...project,
        technologies: project.technologies
          .split(",")
          .map((tech) => tech.trim())
      }

      const response = await axios.put(
        `${apibase}/candidate/addproject`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(response.data)
      alert("Project Added Successfully ✅")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-[50%] bg-transparent min-h-screen flex flex-col  justify-center items-center  p-5">
       <button 
              onClick={()=>setShowPro(false)}
              className=' self-end cursor-pointer hover:text-[#ff0303]  transition-all duration-500 ease-in-out hover:scale-110 ' ><GiCancel/></button>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col gap-1.5 max-w-2xl bg-white p-6 rounded-2xl shadow-md"
      >
        <h1 className='text-2xl text-center font-bold'>Add Project</h1>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={project.title}
          onChange={handleChange}
          className='border  p-2 rounded'
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleChange}
          className='border p-2 rounded'
        />

        <input
          type="text"
          name="technologies"
          placeholder="React, Node, MongoDB"
          value={project.technologies}
          onChange={handleChange}
          className='border p-2 rounded'
        />

        <input
          type="month"
          name="start_date"
          value={project.start_date}
          onChange={handleChange}
          className='border p-2 rounded'
        />

        <input
          type="month"
          name="end_date"
          value={project.end_date}
          onChange={handleChange}
          disabled={project.currently_working}
          className='border p-2 rounded'
        />

        <label className='flex gap-2'>
          <input
            type="checkbox"
            name="currently_working"
            checked={project.currently_working}
            onChange={handleChange}
          />
          Currently Working
        </label>

        <input
          type="url"
          name="github_url"
          placeholder="Github URL"
          value={project.github_url}
          onChange={handleChange}
          className='border p-2 rounded'
        />

        <input
          type="url"
          name="live_url"
          placeholder="Live URL"
          value={project.live_url}
          onChange={handleChange}
          className='border p-2 rounded'
        />

        <button
          type="submit"
          className='bg-purple-600 text-white p-2 rounded'
        >
          Add Project
        </button>
      </form>
    </div>
  )
}

export default AddProjects