import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast, Bounce } from "react-toastify";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-[#7C32CB] focus:ring-2 focus:ring-[#7C32CB]/20";
const labelClass = "text-xs font-medium text-gray-500 mb-1 block";

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
    <div className="w-full min-h-screen bg-[#d7e1f7] p-4 md:p-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-2xl font-bold mb-6 text-black">Update profile</h2>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-2xl shadow-sm overflow-hidden"
        >

          {/* ===== Basic info ===== */}
          <div className="p-6 flex flex-col gap-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-[#5B21B6] uppercase tracking-wide">Basic info</h3>

            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-[48%]">
                <label className={labelClass}>Email</label>
                <input type="email" name="email" placeholder="you@example.com"
                  value={formData.email} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full md:w-[48%]">
                <label className={labelClass}>Mobile</label>
                <input type="text" name="mobile" placeholder="+91 98765 43210"
                  value={formData.mobile} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full">
                <label className={labelClass}>Headline</label>
                <input type="text" name="headline" placeholder="e.g. Full Stack Developer"
                  value={formData.headline} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full">
                <label className={labelClass}>Bio</label>
                <textarea name="bio" placeholder="Tell recruiters a bit about yourself"
                  value={formData.bio} onChange={handleChange}
                  className={`${inputClass} min-h-[110px] resize-none`} />
              </div>
            </div>
          </div>

          {/* ===== Location ===== */}
          <div className="p-6 flex flex-col gap-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-[#5B21B6] uppercase tracking-wide">Location</h3>

            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-[31%]">
                <label className={labelClass}>City</label>
                <input type="text" name="city" placeholder="City"
                  value={formData.city} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full md:w-[31%]">
                <label className={labelClass}>State</label>
                <input type="text" name="state" placeholder="State"
                  value={formData.state} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full md:w-[31%]">
                <label className={labelClass}>Country</label>
                <input type="text" name="country" placeholder="Country"
                  value={formData.country} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* ===== Skills & links ===== */}
          <div className="p-6 flex flex-col gap-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-[#5B21B6] uppercase tracking-wide">Skills and links</h3>

            <div className="flex flex-wrap gap-4">
              <div className="w-full">
                <label className={labelClass}>Skills (comma separated)</label>
                <input type="text" name="skills" placeholder="HTML, CSS, React"
                  value={formData.skills} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full">
                <label className={labelClass}>Portfolio URL</label>
                <input type="url" name="portfolio_url" placeholder="https://yourportfolio.com"
                  value={formData.portfolio_url} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full md:w-[48%]">
                <label className={labelClass}>LinkedIn URL</label>
                <input type="url" name="linkedin_url" placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin_url} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full md:w-[48%]">
                <label className={labelClass}>GitHub URL</label>
                <input type="url" name="github_url" placeholder="https://github.com/..."
                  value={formData.github_url} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* ===== Job preferences ===== */}
          <div className="p-6 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-[#5B21B6] uppercase tracking-wide">Job preferences</h3>

            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-[48%]">
                <label className={labelClass}>Job type</label>
                <input type="text" name="preferred_job_type" placeholder="Full-time, Internship"
                  value={formData.preferred_job_type} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full md:w-[48%]">
                <label className={labelClass}>Work mode</label>
                <input type="text" name="preferred_work_mode" placeholder="Remote, Hybrid, On-site"
                  value={formData.preferred_work_mode} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full md:w-[48%]">
                <label className={labelClass}>Expected salary</label>
                <input type="text" name="expected_salary" placeholder="e.g. 6 LPA"
                  value={formData.expected_salary} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full md:w-[48%]">
                <label className={labelClass}>Notice period</label>
                <input type="text" name="notice_period" placeholder="e.g. Immediate, 30 days"
                  value={formData.notice_period} onChange={handleChange} className={inputClass} />
              </div>

              <div className="w-full flex items-center pt-1">
                <label className="flex items-center gap-3 text-sm text-gray-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_open_to_work"
                    checked={formData.is_open_to_work}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#7C32CB]"
                  />
                  Open to work
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              type="submit"
              className="w-full bg-[#7C32CB] hover:bg-[#5B21B6] text-white py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Update profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;