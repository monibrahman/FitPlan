function RegisterForm({ fullname, setFullname, email, setEmail, password, setPassword, handleRegister, registermessage }) {
  return (
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
    </div>
  )
}

export default RegisterForm