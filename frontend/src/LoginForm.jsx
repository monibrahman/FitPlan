function LoginForm({ loginEmail, setLoginEmail, loginPassword, setLoginPassword, loginmessage, handleLogin, handleLogout, setLoginmessage }) {
return (
     <div>
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
)
}
export default LoginForm
      
