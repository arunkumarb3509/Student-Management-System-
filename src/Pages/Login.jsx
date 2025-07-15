import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row shadow rounded overflow-hidden w-100" style={{ maxWidth: '900px' }}>
        {/* Image Side */}
        <div className="col-md-6 d-none d-md-block bg-primary text-white p-4 text-center">
          <div className="h-100 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">Welcome Back 👋</h2>
            <p className="mt-2">Manage your students effectively with our system.</p>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Login" className="img-fluid mt-3" style={{ maxHeight: '200px' }} />
          </div>
        </div>

        {/* Form Side */}
        <div className="col-md-6 bg-white p-5">
          <form onSubmit={handleLogin} noValidate>
            <h3 className="text-center mb-4">Login</h3>

            {error && <div className="text-danger text-center mb-3">{error}</div>}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                className="form-control"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>

            <p className="text-center mt-3 small">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
