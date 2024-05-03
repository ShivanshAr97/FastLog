import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Public from './components/Public'
import Layout from './components/Layout'
import Login from './features/auth/Login';
import Welcome from './features/auth/Welcome'
import DashboardContent from './components/DashboardContent'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Public/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<DashboardContent />} >
          <Route index element={<Welcome/>}/>

          <Route path='notes'>
            <Route index element={<NotesList />} />
          </Route>

          <Route path='users'>
            <Route index element={<UsersList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
