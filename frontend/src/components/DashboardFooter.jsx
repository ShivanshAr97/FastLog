import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DashboardFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const goHome = () => navigate('/dashboard')

    let goHomeButton = null
    if (pathname !== '/dashboard') {
        goHomeButton = (
            <button title="Home" onClick={goHome}>
                Home
            </button>
        )
    }
  return (
    <>
        <footer>
            {goHomeButton}
            <p>Current User:</p>
            <p>Status:</p>
        </footer>
    </>
  )
}

export default DashboardFooter