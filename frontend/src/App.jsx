import { useState, useEffect } from 'react'
import './App.css'

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
        body: JSON.stringify({
          email: email,
          password: password,
          full_name: fullname,
        }),
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
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })

      const loginData = await response.json()

      if (response.ok) {
        localStorage.setItem("token", loginData.access_token)
        setToken(loginData.access_token)
        setLoginmessage('')
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
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
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
        setProfilemessage("Profile successfully updated!")
      } else {
        setProfilemessage(profileData.detail)
      }
    } catch (error) {
      setProfilemessage("Network error, could not register!")
    }
  }



  return (
    <div className="app-container">
      <h1>FitPlan</h1>
      <p>Your personalized fitness and nutrition companion.</p>
      <p>Backend says: {message}</p>

      {token ? (
        <div>
          <h2>Dashboard</h2>
          <button onClick={handleGetProfile}>Get Profile</button>
          <button onClick={handleLogout}>Logout</button>
          <p>{profilemessage}</p>

          {profile ? (
            <div>
              <h3>Your Profile</h3>
              <p>Age: {profile.age}</p>
              <p>Weight: {profile.weight}</p>
              <p>Height: {profile.height}</p>
              <p>Goal: {profile.goal}</p>
              <p>Activity Level: {profile.activity_level}</p>
              <p>Dietary Preference: {profile.dietary_preference}</p>
            </div>
          ) : (
            <div>
              <h3>Create Profile</h3>
              <div>
                <input
                  type="number"
                  placeholder="Age"
                  value={profileAge}
                  onChange={(e) => setProfileAge(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Weight (lbs)"
                  value={profileWeight}
                  onChange={(e) => setProfileWeight(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Height (inches)"
                  value={profileHeight}
                  onChange={(e) => setProfileHeight(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Goal"
                  value={profileGoal}
                  onChange={(e) => setProfileGoal(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Activity Level"
                  value={profileActivityLevel}
                  onChange={(e) => setProfileActivityLevel(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Dietary Preference"
                  value={profileDietaryPreference}
                  onChange={(e) => setProfileDietaryPreference(e.target.value)}
                />
              </div>
              <button onClick={handleCreateProfile}>Create Profile</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleRegister}>Register</button>
          <p>{registermessage}</p>

          <h2>Login</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          <p>{loginmessage}</p>
        </div>
      )}
    </div>
  )
}

export default App