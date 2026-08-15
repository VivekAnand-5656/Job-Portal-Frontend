import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return ( 
    <>
        <header className=' bg-[#d7e1f7] p-2 '><Navbar/></header>
        <main className='  ' ><Outlet/></main>
        <footer><Footer/></footer>
    </>
  )
}

export default Layout