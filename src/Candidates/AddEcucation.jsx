import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { GiCancel } from "react-icons/gi";


const AddEducation = () => {
  const { token,showEdu,setShowEdu } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [education, setEducation] = useState({
    level: "",
    institution_name: "",
    degree: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
    currently_studying: false,
    cgpa_percentage: "",
    location: "",
    description: ""
  })

  const apibase = "https://job-portal-project-b2b0.onrender.com"

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setEducation({
      ...education,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setMessage("")

      const response = await axios.put(
        `${apibase}/candidate/addeducation`,
        education,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(response.data)

      setMessage("Education Added Successfully ✅")

      setEducation({
        level: "",
        institution_name: "",
        degree: "",
        field_of_study: "",
        start_year: "",
        end_year: "",
        currently_studying: false,
        cgpa_percentage: "",
        location: "",
        description: ""
      })

    } catch (error) {
      console.log(error)
      setMessage("Failed to add education ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[50%] bg-transparent min-h-screen flex flex-col  justify-center items-center  p-5">
        <button 
        onClick={()=>setShowEdu(false)}
        className=' self-end cursor-pointer hover:text-[#ff0303]  transition-all duration-500 ease-in-out hover:scale-110 ' ><GiCancel/></button>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full max-w-2xl bg-white p-6 rounded-2xl shadow-md"
      >
        <h1 className="text-2xl font-bold ">
          Add Education
        </h1>

        <div className="flex justify-center items-center flex-wrap gap-2 ">

          <input
            type="text"
            name="level"
            placeholder="Level (10th, 12th, Graduation)"
            value={education.level}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="institution_name"
            placeholder="Institution Name"
            value={education.institution_name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={education.degree}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="field_of_study"
            placeholder="Field of Study"
            value={education.field_of_study}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="start_year"
            placeholder="Start Year"
            value={education.start_year}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="end_year"
            placeholder="End Year"
            value={education.end_year}
            onChange={handleChange}
            disabled={education.currently_studying}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="cgpa_percentage"
            placeholder="CGPA / Percentage"
            value={education.cgpa_percentage}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={education.location}
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={education.description}
          onChange={handleChange}
          rows="4"
          className="border p-2 rounded w-full mt-4"
        />

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="currently_studying"
            checked={education.currently_studying}
            onChange={handleChange}
          />
          <label>Currently Studying</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white p-3 rounded-lg mt-5 hover:bg-purple-700"
        >
          {loading ? "Adding..." : "Add Education"}
        </button>

        {message && (
          <p className="mt-4 text-center font-medium">
            {message}
          </p>
        )}
      </form>

    </div>
  )
}

export default AddEducation