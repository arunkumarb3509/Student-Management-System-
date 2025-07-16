import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const strengthMeter = (pwd) => {
  let score = 0;
  if (pwd.length >= 8)              score++;
  if (/[A-Z]/.test(pwd))            score++;
  if (/[a-z]/.test(pwd))            score++;
  if (/[0-9]/.test(pwd))            score++;
  if (/[^A-Za-z0-9]/.test(pwd))     score++;

  const levels = [
    { label: 'Very Weak',  color: 'bg-danger'  },
    { label: 'Weak',       color: 'bg-danger'  },
    { label: 'Fair',       color: 'bg-warning' },
    { label: 'Good',       color: 'bg-info'    },
    { label: 'Strong',     color: 'bg-success' },
    { label: 'Very Strong',color: 'bg-success' },
  ];
  return { score, ...levels[score] };
};

const Register = () => {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [role, setRole]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState('');
  const navigate              = useNavigate();

  const { score, label, color } = strengthMeter(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !email || !emailRegex.test(email) ||
      !password || !confirmPwd ||
      password !== confirmPwd ||
      !role
    ) return;

    try {
      await axios.post('http://localhost:4000/api/register', { email, password, role });
      alert('Registration successful');
      navigate('/login');
    } catch {
      setError('Registration failed. Try a different email.');
    }
  };

  const emailError =
    submitted && !email ? '* Email is required'
    : submitted && email && !emailRegex.test(email) ? '* Enter a valid email address'
    : '';

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row shadow rounded overflow-hidden w-100" style={{ maxWidth: 900 }}>
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block bg-success text-white p-4 text-center">
          <div className="h-100 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">Create Account 🚀</h2>
            <p className="mt-2">Join the Student Management System to streamline your work.</p>
            <img src="https://cdn-icons-png.flaticon.com/512/2913/2913461.png" alt="" className="img-fluid mt-3" style={{ maxHeight: 200 }} />
          </div>
        </div>

        {/* Form */}
        <div className="col-md-6 bg-white p-5">
          <form onSubmit={handleRegister} noValidate>
            <h3 className="text-center mb-4">Register</h3>
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

              {password && (
                <>
                  <div className="progress mt-2" style={{ height: 6 }}>
                    <div className={`progress-bar ${color}`} style={{ width: `${(score / 5) * 100}%` }} />
                  </div>
                  <span className="small text-muted">{label}</span>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                className={`form-control ${submitted && (!confirmPwd || confirmPwd !== password) ? 'input-error' : ''}`}
                type="password"
                placeholder="Re‑enter password"
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
              />
              {submitted && !confirmPwd && <div className="error-text">* Confirm password is required</div>}
              {submitted && confirmPwd && confirmPwd !== password && <div className="error-text">* Passwords do not match</div>}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="form-label">Select Role</label>
              <select
                className={`form-select ${submitted && !role ? 'input-error' : ''}`}
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="">-- Select Role --</option>
                <option value="ADMIN">Admin</option>
                <option value="TEACHER">Teacher</option>
              </select>
              {submitted && !role && <div className="error-text">* Role is required</div>}
            </div>

            <button className="btn btn-success w-100 mb-3" type="submit">Register</button>

            <p className="text-center small">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
