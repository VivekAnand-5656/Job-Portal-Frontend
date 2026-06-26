import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import signlogo from '../assets/signup.png'

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
      navigate("/")

    } catch (error) {
      console.log(`Error:- ${error}`)
      setError("Inavlid Credentials")
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex sm:flex-row flex-col items-center justify-center bg-gray-100">
      <div className=" w-[50%] sm:flex hidden justify-center items-center overflow-hidden " >
              <img src={signlogo} alt=""
              className=" w-[80%] h-full "
              />
            </div>

      <form
        onSubmit={handleRegister}
        className="bg-[#943CF3] h-auto text-white p-6 rounded-xl shadow-md sm:w-[30%] w-[90%] "
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
      <p>already have an account ? <span onClick={()=>navigate("/")} className=' cursor-pointer ' >Login Here</span></p>
      <p>{error}</p>
      </form>
    </div>
  )
}

export default Signup