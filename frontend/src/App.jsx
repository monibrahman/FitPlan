import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage('Could not reach the backend'))
  }, [])

  return (
    <div className="app-container">
      <h1>FitPlan</h1>
      <p>Your personalized fitness and nutrition companion.</p>
      <p>Backend says: {message}</p>
    </div>
  )
}

export default App