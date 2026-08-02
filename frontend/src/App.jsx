import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Profile from './Profile'
import { Dumbbell } from 'lucide-react'

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
  const [user, setUser] = useState(null)

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
  setUser(null)
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
const handleGetMe = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
      headers: { "Authorization": `Bearer ${token}` },
    })
    const userData = await response.json()
    if (response.ok) {
      setUser(userData)
    }
  } catch (error) {
    // silently ignore; name greeting just won't show
  }
}
  useEffect(() => {
  if (token) {
    handleGetProfile()
    handleGetMe()
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
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center gap-6 bg-slate-800 px-6 py-4 text-white">
 <Link to="/" className="flex items-center gap-2 text-xl">
  <Dumbbell className="text-blue-400" />
  <span className="font-bold">Uni<span className="text-blue-400">Fit</span></span>
</Link>
  <div className="flex gap-4 ml-auto">
    {!token && <Link to="/register" className="hover:text-blue-300">Register</Link>}
    {!token && <Link to="/login" className="hover:text-blue-300">Login</Link>}
    {token && <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>}
    {token && (
      <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
        Logout
      </button>
    )}
  </div>
</nav>
 <div className="max-w-2xl mx-auto p-6">
      

      <Routes>
        <Route path="/" element={
          <p align='center'>Your personalized fitness and nutrition companion.</p>
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
              user={user}
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
    </div>
  )
}

export default App