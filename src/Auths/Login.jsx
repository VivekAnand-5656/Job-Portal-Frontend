import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import logimg from '../assets/login.png'

const Login = () => {
  const { login,token } = useContext(AuthContext);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
  }

  const apibase = "https://job-portal-project-b2b0.onrender.com"

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(""); 
      const response = await axios.post(
        `${apibase}/login`,
        formData
      );

      const data = response.data;
      login(data) 

      setFormData({
        email:"",
        password:""
      })
      if(data.role === "candidate" ){
        navigate("/home")
      } else{
        navigate("/recruiter")
      }

    } catch (error) {
      console.log(`Error: ${error}`);
      setError("Server error or invalid credentials");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="w-full h-screen flex sm:flex-row flex-col items-center justify-center bg-gray-100">
      <div className=" w-[50%] flex justify-center items-center overflow-hidden " >
        <img src={logimg} alt=""
        className=" w-full h-full "
        />
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-[#943CF3] h-[70%] text-white p-6 rounded-xl shadow-md sm:w-[30%] w-[70%] "
      >
        <h2 className="text-2xl text-[#ffffff] font-bold mb-4 text-center">
          Welcome Back
        </h2>
        <p>Sign in to access your account, manage applications, track job opportunities, and continue your career journey.</p>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 bg-[#ffffff] text-black placeholder:text-black   rounded mb-3 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 bg-[#ffffff] text-black placeholder:text-black   rounded mb-3 outline-none"
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ffffff] text-black p-2 rounded hover:bg-[#b675fb] hover:text-white font-bold cursor-pointer transition-all duration-500 ease-in-out "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>Don't have account ? <span onClick={()=>navigate("/signup")} className=" cursor-pointer " >Create Account</span> </p>
      </form>
    </div>
  );
};

export default Login;