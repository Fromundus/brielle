import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Admin/Navbar'
import Header from '../components/Admin/Header'

function AdminLayout() {
  return (
    <div className='text-sm'>
        <Header />
        <Outlet />
        <Navbar />
    </div>
  )
}

export default AdminLayout