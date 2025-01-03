import React from 'react'
import Sidebar from './_components/Sidebar'
import TopNavbar from './_components/top-navbar'

const DashboardLayout = ({ children }) => {
    return (
        <div className='h-full'>
            <div className='h-[80px] md:pl-56 fixed inset-y-0 z-50 w-full'>
                <TopNavbar />
            </div>
            <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
                <Sidebar />
            </div>
            <main className='md:pl-56 pt-[80px] h-full'>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout