import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast, Bounce } from "react-toastify";

const UpdateProfile = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    headline: "",
    bio: "",
    city: "",
    state: "",
    country: "",
    skills: "",
    portfolio_url: "",
    linkedin_url: "",
    github_url: "",
    preferred_job_type: "",
    preferred_work_mode: "",
    expected_salary: "",
    notice_period: "",
    is_open_to_work: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const apibase = "https://job-portal-project-b2b0.onrender.com"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
    };

    try {
      const response = await axios.put(`${apibase}/candidate/updateprofile`, payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      toast.success('Profile Updated Successfully ☑️', {
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
      navigate("/profile")
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong ', {
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
    }
  };

  return (
    <div className="max-w-3xl mx-auto sm:p-5 p-2 ">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-[#943CF3] rounded-3xl p-6 sm:p-8 flex flex-wrap gap-4 shadow-xl"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full md:w-[48%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full md:w-[48%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="headline"
          placeholder="Headline"
          value={formData.headline}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full min-h-[120px] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none resize-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full md:w-[31%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full md:w-[31%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full md:w-[31%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="skills"
          placeholder="HTML, CSS, React"
          value={formData.skills}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="url"
          name="portfolio_url"
          placeholder="Portfolio URL"
          value={formData.portfolio_url}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="url"
          name="linkedin_url"
          placeholder="LinkedIn URL"
          value={formData.linkedin_url}
          onChange={handleChange}
          className="w-full md:w-[48%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="url"
          name="github_url"
          placeholder="GitHub URL"
          value={formData.github_url}
          onChange={handleChange}
          className="w-full md:w-[48%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="preferred_job_type"
          placeholder="Job Type"
          value={formData.preferred_job_type}
          onChange={handleChange}
          className="w-full md:w-[48%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="preferred_work_mode"
          placeholder="Work Mode"
          value={formData.preferred_work_mode}
          onChange={handleChange}
          className="w-full md:w-[48%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="expected_salary"
          placeholder="Expected Salary"
          value={formData.expected_salary}
          onChange={handleChange}
          className="w-full md:w-[48%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <input
          type="text"
          name="notice_period"
          placeholder="Notice Period"
          value={formData.notice_period}
          onChange={handleChange}
          className="w-full md:w-[48%] px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#943CF3] focus:ring-4 focus:ring-[#943CF3]/20 hover:border-[#943CF3]/50 shadow-sm"
        />

        <div className="w-full flex items-center">
          <label className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              name="is_open_to_work"
              checked={formData.is_open_to_work}
              onChange={handleChange}
              className="h-5 w-5 accent-[#943CF3]"
            />
            Open To Work
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#943CF3] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;