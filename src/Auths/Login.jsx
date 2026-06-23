import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  // if (token){
  //   console.log(`User Role :- ${role}`)
  //   console.log(`User Login :- ${isLogin}`)
  // }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
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
          className="w-full p-2 border rounded mb-3 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 outline-none"
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>Don't have account ? <span onClick={()=>navigate("/signup")} >Create Account</span> </p>
      </form>
    </div>
  );
};

export default Login;