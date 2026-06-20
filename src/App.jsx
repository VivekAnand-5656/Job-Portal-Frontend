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

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<Home />} />
              <Route path='alljobs' element={<Jobs />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='profile' element={<Profile/>} />
              <Route path='appliedjobs' element={<AppliedJobs/>} />
              <Route path='savedjobs' element={<SavedJobs/>} />
              <Route path='applyjob' element={<ApplyJob/>} />

            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
