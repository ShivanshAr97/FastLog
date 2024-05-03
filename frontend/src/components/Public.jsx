import React from 'react'
import { Link } from 'react-router-dom'
const Public = () => {
  return (
    <>
    This is the home page
    <br />
    <Link to="/login">Login Here</Link>
    </>
  )
}

export default Public