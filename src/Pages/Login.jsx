import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]   = useState('');
  const navigate            = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!email || !password || !emailRegex.test(email)) return;

    try {
      const res = await axios.post('http://localhost:4000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  };

  const emailError =
    submitted && !email ? '* Email is required'
    : submitted && email && !emailRegex.test(email) ? '* Enter a valid email address'
    : '';

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row shadow rounded overflow-hidden w-100" style={{ maxWidth: 900 }}>
        {/* Image */}
        <div className="col-md-6 d-none d-md-block bg-primary text-white p-4 text-center">
          <div className="h-100 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">Welcome Back 👋</h2>
            <p className="mt-2">Manage your students effectively with our system.</p>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="" className="img-fluid mt-3" style={{ maxHeight: 200 }} />
          </div>
        </div>

        {/* Form */}
        <div className="col-md-6 bg-white p-5">
          <form onSubmit={handleLogin} noValidate>
            <h3 className="text-center mb-4">Login</h3>
            {error && <div className="text-danger text-center mb-3">{error}</div>}

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className={`form-control ${emailError ? 'input-error' : ''}`}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {emailError && <div className="error-text">{emailError}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className={`form-control ${submitted && !password ? 'input-error' : ''}`}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {submitted && !password && <div className="error-text">* Password is required</div>}
            </div>

            <button className="btn btn-primary w-100 mb-3" type="submit">Login</button>

            <p className="text-center small">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
