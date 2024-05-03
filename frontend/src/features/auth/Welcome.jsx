import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <>
      Welcome
      <br />
      <Link to="/dashboard/notes">Visit notes</Link>
      <Link to="/dashboard/users">Visit users</Link>
    </>
  )
}

export default Welcome