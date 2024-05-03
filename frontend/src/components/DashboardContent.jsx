import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'
import { Outlet } from 'react-router-dom'

const DashboardContent = () => {
  return (
    <>
    <DashboardHeader/>
    <Outlet/>
    <DashboardFooter/>
    </>
  )
}

export default DashboardContent