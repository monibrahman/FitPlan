function LoginForm({ loginEmail, setLoginEmail, loginPassword, setLoginPassword, loginmessage, handleLogin, handleLogout, setLoginmessage }) {
return (
     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
     <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div>
            <input className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div>
            <input className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold" onClick={handleLogin}>Login</button>
          <p className="mt-4 text-center text-sm text-gray-600">{loginmessage}</p>
        </div>
)
}
export default LoginForm
      
