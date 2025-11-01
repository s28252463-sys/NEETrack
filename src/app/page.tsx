
export default function Home() {
  return (
    <main id="Container" className="bg-gray-900 relative">
       <button className="signup-button">SIGN UP</button>
      <div id="rays">
        <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{stopColor: 'rgba(130, 225, 255, 0.3)'}} />
              <stop offset="100%" style={{stopColor: 'rgba(130, 225, 255, 0)'}} />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grad1)" />
        </svg>
      </div>
      <form className="form w-full max-w-md">
        <label id="login-lable">LOGIN</label>
        <input
          id="email"
          className="form-content"
          type="email"
          placeholder="EMAIL"
          required
        />
        <input
          id="password"
          className="form-content"
          type="password"
          placeholder="PASSWORD"
          required
        />
        <button type="submit">LOGIN</button>
      </form>
    </main>
  );
}
