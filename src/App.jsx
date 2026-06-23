import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Public/Layout'
import Home from './Public/Home'
import Login from './Auths/Login'
import Signup from './Auths/Signup'
import Jobs from './Candidates/Jobs'
import { AuthProvider } from './Context/AuthContext'
import Profile from './Public/Profile'
import ApplyJob from './Candidates/ApplyJob'
import AppliedJobs from './Candidates/AppliedJobs'
import SavedJobs from './Candidates/SavedJobs'
import UpdateProfile from './Candidates/UpdateProfile'
import RecruiterHome from './Recruiters/RecruiterHome'
import MyPosts from './Recruiters/MyPosts'
import AllCandidates from './Recruiters/AllCandidates'
import PostJob from './Recruiters/PostJob'
import RecruiterProfile from './Recruiters/RecruiterProfile'
import Applicants from './Recruiters/Applicants'
import CandidateProfile from './Recruiters/CandidateProfile'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="alljobs" element={<Jobs />} />
              <Route path="signup" element={<Signup />} />
              <Route path="profile" element={<Profile />} />
              <Route path="appliedjobs" element={<AppliedJobs />} />
              <Route path="savedjobs" element={<SavedJobs />} />
              <Route path="applyjob" element={<ApplyJob />} />
              <Route path="updateprofile" element={<UpdateProfile />} />
              <Route path="recruiter" element={<RecruiterHome />} />
              <Route path="myposts" element={<MyPosts />} />
              <Route path="allcandidates" element={<AllCandidates />} />
              <Route path="postjob" element={<PostJob />} />
              <Route path="recruiterprofile" element={<RecruiterProfile />} />
              <Route path="applicants" element={<Applicants />} />
              <Route path="applicantprofile" element={<CandidateProfile />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
