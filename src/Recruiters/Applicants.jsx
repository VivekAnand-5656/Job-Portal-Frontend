import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Applicants = () => {
    const { token } = useContext(AuthContext);

    const [applicants, setApplicants] = useState([]);

    const apibase = "https://job-portal-project-b2b0.onrender.com";

    // ===== Fetch Applicants =====
    const fetchApplicants = async () => {
        try {
            const response = await axios.get(
                `${apibase}/recruiter/applicants`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setApplicants(response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    // ===== Update Hiring Status =====
    const updateStatus = async (jobId, canStatus) => {
        try {
            await axios.put(
                `${apibase}/recruiter/hiringstatusupdate/${jobId}`,
                {},
                {
                    params: {
                        status: canStatus,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchApplicants();

            alert(`Candidate ${canStatus}`);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchApplicants();
        }
    }, [token]);

    // ===== Status Style =====
    const getStatusStyle = (status) => {
        if (status === "Hired") {
            return "bg-green-50 text-green-600 border-green-200";
        }

        if (status === "Rejected") {
            return "bg-red-50 text-red-600 border-red-200";
        }

        if (status === "Shortlisted") {
            return "bg-blue-50 text-blue-600 border-blue-200";
        }

        return "bg-orange-50 text-orange-600 border-orange-200";
    };

    return (
        <div className="w-full min-h-screen bg-[#d7e1f7] p-4 md:p-6">

            {/* ================= Header ================= */}
            <div className="mb-7">

                <p className="text-sm font-medium text-[#7C32CB]">
                    Recruitment Dashboard
                </p>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                            Applicants
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Review candidates and manage their hiring status.
                        </p>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-400">
                            Total Applicants
                        </span>

                        <p className="text-xl font-bold text-[#7C32CB]">
                            {applicants.length}
                        </p>
                    </div>

                </div>
            </div>

            {/* ================= Applicants ================= */}
            <div className="flex flex-col gap-5">

                {applicants.length === 0 ? (

                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

                        <div className="text-4xl mb-3">
                            👥
                        </div>

                        <h2 className="text-lg font-bold text-gray-800">
                            No Applicants Found
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Applicants for your jobs will appear here.
                        </p>

                    </div>

                ) : (

                    applicants.map((applicant) => {

                        const candidate = applicant.candidate;
                        const status = applicant.status;

                        return (
                            <div
                                key={applicant._id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                            >

                                {/* ================= Purple Header ================= */}
                                <div className="bg-gradient-to-r from-[#7C32CB] to-[#5B21B6] p-5 md:p-6 text-white">

                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                                        {/* Candidate */}
                                        <div className="flex items-center gap-4">

                                            {/* Avatar */}
                                            <div className="w-14 h-14 rounded-2xl bg-white text-[#7C32CB] flex items-center justify-center text-xl font-bold shrink-0">
                                                {candidate?.name?.charAt(0)?.toUpperCase()}
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold">
                                                    {candidate?.name}
                                                </h2>

                                                <p className="text-sm text-white/75 mt-1">
                                                    {candidate?.headline}
                                                </p>

                                                <p className="text-xs text-white/60 mt-1">
                                                    📍 {candidate?.city}, {candidate?.state}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`self-start px-3 py-1.5 rounded-full text-xs font-semibold bg-white/15 border border-white/20`}
                                        >
                                            {status}
                                        </span>

                                    </div>

                                </div>

                                {/* ================= Candidate Details ================= */}
                                <div className="p-5 md:p-6">

                                    {/* Contact Info */}
                                    <div className="flex flex-wrap gap-3">

                                        <div className="bg-gray-50 rounded-xl px-4 py-3">
                                            <p className="text-[11px] text-gray-400 uppercase">
                                                Email
                                            </p>

                                            <p className="text-sm font-medium text-gray-700 mt-1">
                                                {candidate?.email || "N/A"}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl px-4 py-3">
                                            <p className="text-[11px] text-gray-400 uppercase">
                                                Mobile
                                            </p>

                                            <p className="text-sm font-medium text-gray-700 mt-1">
                                                {candidate?.mobile || "N/A"}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl px-4 py-3">
                                            <p className="text-[11px] text-gray-400 uppercase">
                                                Expected Salary
                                            </p>

                                            <p className="text-sm font-medium text-gray-700 mt-1">
                                                ₹{candidate?.expected_salary || "N/A"}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl px-4 py-3">
                                            <p className="text-[11px] text-gray-400 uppercase">
                                                Work Mode
                                            </p>

                                            <p className="text-sm font-medium text-gray-700 mt-1">
                                                {candidate?.preferred_work_mode || "N/A"}
                                            </p>
                                        </div>

                                    </div>

                                    {/* ================= Bio ================= */}
                                    {candidate?.bio && (
                                        <div className="mt-5">

                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                                About Candidate
                                            </p>

                                            <p className="text-sm text-gray-600 leading-6">
                                                {candidate.bio}
                                            </p>

                                        </div>
                                    )}

                                    {/* ================= Skills ================= */}
                                    <div className="mt-5">

                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                            Skills
                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                            {candidate?.skills?.map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs font-medium text-[#5B21B6] bg-[#f1e9ff] px-3 py-1.5 rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                    </div>

                                    {/* ================= Application Info ================= */}
                                    <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">

                                        <span>
                                            📅 Applied on{" "}
                                            <strong className="text-gray-700">
                                                {applicant.applied_at
                                                    ? new Date(
                                                          applicant.applied_at
                                                      ).toLocaleDateString(
                                                          "en-IN",
                                                          {
                                                              day: "2-digit",
                                                              month: "short",
                                                              year: "numeric",
                                                          }
                                                      )
                                                    : "N/A"}
                                            </strong>
                                        </span>

                                        {candidate?.notice_period && (
                                            <span>
                                                ⏱ Notice Period:{" "}
                                                <strong className="text-gray-700">
                                                    {candidate.notice_period} days
                                                </strong>
                                            </span>
                                        )}

                                        {candidate?.is_open_to_work && (
                                            <span className="text-green-600 font-medium">
                                                ● Open to Work
                                            </span>
                                        )}

                                    </div>

                                    {/* ================= Bottom Actions ================= */}
                                    <div className="mt-6 pt-5 border-t border-gray-100">

                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                            {/* Links */}
                                            <div className="flex flex-wrap gap-2">

                                                {candidate?.resume_url && (
                                                    <a
                                                        href={candidate.resume_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                                                    >
                                                        View Resume
                                                    </a>
                                                )}

                                                {candidate?.linkedin_url && (
                                                    <a
                                                        href={candidate.linkedin_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="px-4 py-2 bg-[#eef2ff] text-[#4338CA] rounded-lg text-sm font-medium hover:bg-[#e0e7ff] transition"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                )}

                                                {candidate?.github_url && (
                                                    <a
                                                        href={candidate.github_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}

                                            </div>

                                            {/* Hiring Actions */}
                                            <div className="flex flex-wrap gap-2">

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            applicant.job_id,
                                                            "Shortlisted"
                                                        )
                                                    }
                                                    disabled={
                                                        status === "Shortlisted"
                                                    }
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                >
                                                    Shortlist
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            applicant.job_id,
                                                            "Hired"
                                                        )
                                                    }
                                                    disabled={
                                                        status === "Hired"
                                                    }
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                >
                                                    Hire
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            applicant.job_id,
                                                            "Rejected"
                                                        )
                                                    }
                                                    disabled={
                                                        status === "Rejected"
                                                    }
                                                    className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        );
                    })
                )}

            </div>
        </div>
    );
};

export default Applicants;