import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState()
  const handleLogin = () => {
    if (password == 1234) {
      navigate('/usersdata')
    } else {
      alert('You are not authorised')
    }
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Admin page</h1>
      <input
        type="password"
        placeholder="enter admin password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>admin login</button>
    </div>
  )
}

export default AdminLogin
