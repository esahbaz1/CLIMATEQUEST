import React, { useState } from 'react';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Provjera passworda kod signup-a
  if (!isLogin && formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // ✅ Dinamički odabir backend URL-a
  const API_BASE =
    process.env.NODE_ENV === 'production'
      ? 'https://tvoj-backend-na-renderu.onrender.com' // 🔹 zamijeni ovim URL-om kad deployaš
      : 'http://localhost:3000';

  const endpoint = isLogin
  ? `${API_BASE}/api/auth/login`
  : `${API_BASE}/api/auth/signup`; // ✅


  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Something went wrong');
      return;
    }

    alert(isLogin ? 'Login successful!' : 'Signup successful!');
    console.log('Response:', data);

    // ✅ Reset forme
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while connecting to the server.');
  }
};


  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-card">
        <div className="card-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to continue your missions' : 'Join us on this eco journey'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-mode">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={toggleMode} className="toggle-link">
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
