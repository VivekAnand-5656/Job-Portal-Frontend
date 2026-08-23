import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "",
    });

    const apibase = "https://job-portal-project-b2b0.onrender.com";

    const handlechange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await axios.post(
                `${apibase}/createaccount`,
                formdata
            );

            console.log("Register response:", response.data);

            toast.success("Account Registered Successfully ☑️", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });

            setFormdata({
                name: "",
                email: "",
                mobile: "",
                password: "",
                role: "",
            });

            navigate("/");

        } catch (error) {
            console.log("Error:", error);
            console.log("Response:", error.response?.data);

            setError(
                error.response?.data?.detail ||
                "Unable to create account"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#d7e1f7] p-4">

            <form
                onSubmit={handleRegister}
                className="h-auto w-full sm:w-[30%] min-w-0 p-6 rounded-xl bg-white text-black border border-[#943CF3] shadow-[4px_-4px_12px_rgba(148,60,243,0.25),-4px_4px_12px_rgba(59,130,246,0.25)]"
            >

                {/* ================= BRAND ================= */}
                <h2 className="text-2xl font-bold mb-1 text-center">
                    Join{" "}
                    <span className="font-bold">
                        JOB<span className="text-[#943CF3]">HUNT</span>
                    </span>
                </h2>

                <p className="text-center text-sm text-gray-500 mb-5">
                    Create your account and start your journey
                </p>

                {/* ================= ERROR ================= */}
                {error && (
                    <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded">
                        {error}
                    </p>
                )}

                {/* ================= NAME ================= */}
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formdata.name}
                    onChange={handlechange}
                    className="w-full p-2.5 text-black placeholder:text-black border-r-2 border-l-2 border-b-2 border-[#b675fb] rounded mb-3 outline-none focus:border-[#943CF3] transition"
                    required
                />

                {/* ================= EMAIL ================= */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formdata.email}
                    onChange={handlechange}
                    className="w-full p-2.5 text-black placeholder:text-black border-r-2 border-l-2 border-b-2 border-[#b675fb] rounded mb-3 outline-none focus:border-[#943CF3] transition"
                    required
                />

                {/* ================= MOBILE ================= */}
                <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formdata.mobile}
                    onChange={handlechange}
                    className="w-full p-2.5 text-black placeholder:text-black border-r-2 border-l-2 border-b-2 border-[#b675fb] rounded mb-3 outline-none focus:border-[#943CF3] transition"
                    required
                />

                {/* ================= PASSWORD ================= */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formdata.password}
                    onChange={handlechange}
                    className="w-full p-2.5 text-black placeholder:text-black border-r-2 border-l-2 border-b-2 border-[#b675fb] rounded mb-3 outline-none focus:border-[#943CF3] transition"
                    required
                />

                {/* ================= ROLE ================= */}
                <select
                    name="role"
                    value={formdata.role}
                    onChange={handlechange}
                    className="w-full p-2.5 text-black border-r-2 border-l-2 border-b-2 border-[#b675fb] rounded mb-4 outline-none focus:border-[#943CF3] transition bg-white cursor-pointer"
                    required
                >
                    <option value="" disabled>
                        Select Account Type
                    </option>

                    <option value="candidate">
                        Candidate
                    </option>

                    <option value="recruiter">
                        Recruiter
                    </option>
                </select>

                {/* ================= BUTTON ================= */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00073b] text-white p-2.5 rounded hover:bg-[#7c01ff] font-bold cursor-pointer transition-all duration-500 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Registering..." : "Create Account"}
                </button>

                {/* ================= LOGIN ================= */}
                <p className="text-sm mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="cursor-pointer text-[#943CF3] font-semibold hover:text-[#7c01ff]"
                    >
                        Login Here
                    </span>
                </p>

            </form>
        </div>
    );
};

export default Signup;