import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('TEACHER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/register', { email, password, role });
      setError('');
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Try a different email.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row shadow rounded overflow-hidden w-100" style={{ maxWidth: '900px' }}>
        
        {/* Image Panel */}
        <div className="col-md-6 d-none d-md-block bg-success text-white p-4 text-center">
          <div className="h-100 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">Create Account 🚀</h2>
            <p className="mt-2">Join the Student Management System to streamline your work.</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2913/2913461.png"
              alt="Register"
              className="img-fluid mt-3"
              style={{ maxHeight: '200px' }}
            />
          </div>
        </div>

        {/* Form Panel */}
        <div className="col-md-6 bg-white p-5">
          <form onSubmit={handleRegister} noValidate>
            <h3 className="text-center mb-4">Register</h3>

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

            <div className="mb-4">
              <label htmlFor="role" className="form-label">Select Role</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="ADMIN">Admin</option>
                <option value="TEACHER">Teacher</option>
              </select>
            </div>

            <div className="d-grid">
              <button className="btn btn-success" type="submit">Register</button>
            </div>

            <p className="text-center mt-3 small">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
