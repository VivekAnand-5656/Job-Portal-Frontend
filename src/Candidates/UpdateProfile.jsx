import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const UpdateProfile = () => {
    const {token} = useContext(AuthContext)
    const navigate =useNavigate()
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
      const response = await axios.put(`${apibase}/candidate/updateprofile`,payload,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
      )
      alert("Profile Updated")
      navigate("/profile")
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
        />

        <input
          type="text"
          name="headline"
          placeholder="Headline"
          value={formData.headline}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="HTML, CSS, React"
          value={formData.skills}
          onChange={handleChange}
        />

        <input
          type="url"
          name="portfolio_url"
          placeholder="Portfolio URL"
          value={formData.portfolio_url}
          onChange={handleChange}
        />

        <input
          type="url"
          name="linkedin_url"
          placeholder="LinkedIn URL"
          value={formData.linkedin_url}
          onChange={handleChange}
        />

        <input
          type="url"
          name="github_url"
          placeholder="GitHub URL"
          value={formData.github_url}
          onChange={handleChange}
        />

        <input
          type="text"
          name="preferred_job_type"
          placeholder="Job Type"
          value={formData.preferred_job_type}
          onChange={handleChange}
        />

        <input
          type="text"
          name="preferred_work_mode"
          placeholder="Work Mode"
          value={formData.preferred_work_mode}
          onChange={handleChange}
        />

        <input
          type="text"
          name="expected_salary"
          placeholder="Expected Salary"
          value={formData.expected_salary}
          onChange={handleChange}
        />

        <input
          type="text"
          name="notice_period"
          placeholder="Notice Period"
          value={formData.notice_period}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="is_open_to_work"
            checked={formData.is_open_to_work}
            onChange={handleChange}
          />
          Open To Work
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;