"use client"

import { Compass, Layout } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'

const dashboardRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: '/'
    },
    {
        icon: Compass,
        label: "Browse",
        href: '/search'
    },
]
const SidebarRoutes = () => {
    const routes = dashboardRoutes;

    return (
        <div className='flex flex-col w-full'>
            {
                routes.map(route => (
                    <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href}>

                    </SidebarItem>
                ))
            }
        </div>
    )
}

export default SidebarRoutes