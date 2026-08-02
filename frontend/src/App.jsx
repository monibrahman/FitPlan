import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Profile from './Profile'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [registermessage, setRegistermessage] = useState('')
  const [loginmessage, setLoginmessage] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [profile, setProfile] = useState(null)
  const [profilemessage, setProfilemessage] = useState('')
  const [profileAge, setProfileAge] = useState('')
  const [profileHeight, setProfileHeight] = useState('')
  const [profileWeight, setProfileWeight] = useState('')
  const [profileGoal, setProfileGoal] = useState('')
  const [profileActivityLevel, setProfileActivityLevel] = useState('')
  const [profileDietaryPreference, setProfileDietaryPreference] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('Could not reach the backend'))
  }, [])

  const handleRegister = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, full_name: fullname }),
      })
      const data = await response.json()
      if (response.ok) {
        setRegistermessage("Registration successful! You can now log in.")
      } else {
        setRegistermessage(data.detail)
      }
    } catch (error) {
      setRegistermessage("Network error, could not register!")
    }
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const loginData = await response.json()
      if (response.ok) {
  localStorage.setItem("token", loginData.access_token)
  setToken(loginData.access_token)
  setLoginmessage('')
  navigate("/dashboard")
} else {
        setLoginmessage(loginData.detail)
      }
    } catch (error) {
      setLoginmessage("Network error, could not login!")
    }
  }

  const handleLogout = () => {
  localStorage.removeItem("token")
  setToken(null)
  setProfile(null)
  setProfilemessage('')
  setLoginEmail('')
  setLoginPassword('')
  navigate("/")
}

  const handleGetProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: { "Authorization": `Bearer ${token}` },
      })
      const profileData = await response.json()
      if (response.ok) {
        setProfile(profileData)
        setProfilemessage('')
      } else {
        setProfilemessage(profileData.detail)
      }
    } catch (error) {
      setProfilemessage("Network error, could not load profile!")
    }
  }

  useEffect(() => {
    if (token) {
      handleGetProfile()
    }
  }, [token])

  const handleCreateProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          age: profileAge,
          height: profileHeight,
          weight: profileWeight,
          goal: profileGoal,
          activity_level: profileActivityLevel,
          dietary_preference: profileDietaryPreference,
        }),
      })
      const profileData = await response.json()
      if (response.ok) {
        setProfile(profileData)
        setProfilemessage("Profile created!")
      } else {
        setProfilemessage(profileData.detail)
      }
    } catch (error) {
      setProfilemessage("Network error, could not create profile!")
    }
  }

return (
    <div className="app-container">
      <nav>
        <Link to="/">Home</Link>
        {!token && <Link to="/register"> Register</Link>}
        {!token && <Link to="/login"> Login</Link>}
        {token && <Link to="/dashboard"> Dashboard</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>

      <h1>FitPlan</h1>

      <Routes>
        <Route path="/" element={
          <p>Your personalized fitness and nutrition companion.</p>
        } />

        <Route path="/register" element={
          <RegisterForm
            fullname={fullname} setFullname={setFullname}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            handleRegister={handleRegister}
            registermessage={registermessage}
          />
        } />

        <Route path="/login" element={
          <LoginForm
            loginEmail={loginEmail} setLoginEmail={setLoginEmail}
            loginPassword={loginPassword} setLoginPassword={setLoginPassword}
            handleLogin={handleLogin}
            loginmessage={loginmessage}
          />
        } />

        <Route path="/dashboard" element={
          token ? (
            <Profile
              profile={profile}
              profilemessage={profilemessage}
              profileAge={profileAge} setProfileAge={setProfileAge}
              profileWeight={profileWeight} setProfileWeight={setProfileWeight}
              profileHeight={profileHeight} setProfileHeight={setProfileHeight}
              profileGoal={profileGoal} setProfileGoal={setProfileGoal}
              profileActivityLevel={profileActivityLevel} setProfileActivityLevel={setProfileActivityLevel}
              profileDietaryPreference={profileDietaryPreference} setProfileDietaryPreference={setProfileDietaryPreference}
              handleCreateProfile={handleCreateProfile}
              handleGetProfile={handleGetProfile}
              handleLogout={handleLogout}
            />
          ) : (
            <p>Please log in to view your dashboard.</p>
          )
        } />
        <Route path="*" element={
  <div>
    <h2>404 — Page not found</h2>
    <p>That page doesn't exist.</p>
    <Link to="/">Go home</Link>
  </div>
} />
      </Routes>
    </div>
  )
}

export default App