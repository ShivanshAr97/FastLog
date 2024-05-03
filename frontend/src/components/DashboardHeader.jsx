import React from 'react'
import { Link } from 'react-router-dom'

const DashboardHeader = () => {
  return (
    <>
        <Link to="/dashboard">
            <h1>techNotes</h1>
        </Link>
    </>
  )
}

export default DashboardHeader