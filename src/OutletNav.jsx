import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/AppNavbar'

export const OutletNav = () => {
  return (
    <>
        <main className='App'>
            <Navbar />
            <Outlet />
        </main>
    </> 
  )
}

export default OutletNav