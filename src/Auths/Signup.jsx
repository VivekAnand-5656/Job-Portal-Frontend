import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: ""
  })
  const handlechange = (e) => {
    setFormdata({
      ...formdata, [e.target.name]: e.target.value
    })
  }

  const apibase = "https://job-portal-project-b2b0.onrender.com"

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      const response = await axios.post(`${apibase}/createaccount`, formdata)
      alert("Account Regestered") 
      setFormdata({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: ""
      })
      navigate("/login")

    } catch (error) {
      console.log(`Error:- ${error}`)
      setError("Inavlid Credentials")
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formdata.name}
          onChange={handlechange}
          className="w-full p-2 border rounded mb-3 outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formdata.email}
          onChange={handlechange}
          className="w-full p-2 border rounded mb-3 outline-none"
        />
        {/* MOBILE */}
        <input
          type="number"
          name="mobile"
          placeholder="Mobile "
          value={formdata.mobile}
          onChange={handlechange}
          className="w-full p-2 border rounded mb-3 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formdata.password}
          onChange={handlechange}
          className="w-full p-2 border rounded mb-3 outline-none"
        />
        {/* ROLE */}
        <select 
        name="role" 
        value={formdata.role}
        onChange={handlechange}
        className='border p-2 rounded w-full mb-3 outline-none '
        >
          <option value="recruiter">Recruiter</option>
          <option value="candidate">Candidate</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          {loading ? "Registering...." : "Register"}
        </button>
      <p>already have an account ? <span onClick={()=>navigate("/login")} >Login Here</span></p>
      <p>{error}</p>
      </form>
    </div>
  )
}

export default Signup