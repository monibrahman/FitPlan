import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [registermessage, setRegistermessage] = useState('')
  const [loginmessage, setLoginmessage] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleRegister = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        full_name: fullname,
      }),
    })

const data = await response.json()

    if (response.ok) {
      setRegistermessage("Registration successful!")
      
    } else {
      setRegistermessage(data.detail)
      
    }
  } catch (error) {
    setRegistermessage("Network error, could not register!")
  }
}

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('Could not reach the backend'))
  }, [])



 const handleLogin = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,  
      }),
    })

const loginData = await response.json()

    if (response.ok) {
      localStorage.setItem("token", loginData.access_token)
      setLoginmessage("Welcome! Login successful!")
      
    } else {
      setLoginmessage(loginData.detail)
      
    }
  } catch (error) {
    setLoginmessage("Network error, could not login!")
  }
}


  

  return (
    <div className="app-container">
     <div>
      <h1>FitPlan</h1>
      <p>Your personalized fitness and nutrition companion.</p>
      <p>Backend says: {message}</p>
      </div>
      <div><h2>Register</h2>
        <input 
  type="text" 
  placeholder='Full Name'
  value={fullname} 
  onChange={(e) => setFullname(e.target.value)} 
/></div>

<div>
<input 
  type="email" 
  placeholder='Email'
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
  /></div>
  
  <div>
  <input 
  type="password" 
  placeholder = "Password"
  value={password} 
  onChange={(e) => setPassword(e.target.value)} 
/></div>
<div><button onClick={handleRegister}>Register</button><p>{registermessage}</p></div>
  <div><h2>Login</h2>
<input 
  type="email" 
  placeholder='Email'
  value={loginEmail} 
  onChange={(e) => setLoginEmail(e.target.value)} 
  /></div>
  
  <div>
  <input 
  type="password" 
  placeholder = "Password"
  value={loginPassword} 
  onChange={(e) => setLoginPassword(e.target.value)} 
/></div>
<div><button onClick={handleLogin}>Login</button><p>{loginmessage}</p></div>
  
  
  </div>
  
 

    

    
  )
}

export default App