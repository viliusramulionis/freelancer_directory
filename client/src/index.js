import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registration from './components/registration/Registration'
import ProfileCreate from './components/profile-create/ProfileCreate'
import ProfileList from './components/profile-list/ProfileList'
import ProfileEdit from './components/profile-edit/ProfileEdit'
import Profile from './components/profile/Profile'
import Header from './components/header/Header'
import Login from './components/login/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProfileList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/create-profile" element={<ProfileCreate />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit" element={<ProfileEdit />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


