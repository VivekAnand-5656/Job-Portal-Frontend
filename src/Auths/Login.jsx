import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom"; 

import { toast, Bounce } from "react-toastify";

const Login = () => {
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
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
        email: "",
        password: ""
      })
      toast.success('Login Successfully ☑️', {
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
      if (data.role === "candidate") {
        navigate("/home")
      } else {
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
    <div className="w-full h-screen flex sm:flex-row flex-col items-center justify-center bg-[#d7e1f7] "> 
      <form
        onSubmit={handleLogin}
        className="h-auto w-[90%] sm:w-[30%] p-6 rounded-xl bg-[#ffffff] text-[#000000] border border-[#943CF3] shadow-[4px_-4px_12px_rgba(148,60,243,0.25),-4px_4px_12px_rgba(59,130,246,0.25)]"
      >
        <h2 className="text-2xl text-[#000000] font-bold mb-4 text-center">
          Login to <span className=' font-bold sm:text-2xl text-[1.3rem] ' >JOB<span className=' text-[#943CF3] ' >HUNT</span></span>
        </h2> 
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
          className="w-full p-2 text-black placeholder:text-black border-r-2 border-l-2 border-b-2 border-[#b675fb] rounded mb-3 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 text-black placeholder:text-black border-r-2 border-l-2 border-b-2 border-[#b675fb] rounded mb-3 outline-none"
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00073b] text-white p-2 rounded hover:bg-[#7c01ff] hover:text-white font-bold cursor-pointer transition-all duration-500 ease-in-out "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>Don't have account ? <span onClick={() => navigate("/signup")} className=" cursor-pointer text-[#b675fb] " >Create Account</span> </p>
      </form>
    </div>
  );
};

export default Login;