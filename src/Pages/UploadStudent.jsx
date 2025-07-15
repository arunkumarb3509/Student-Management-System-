import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

const UploadStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '',
    gender: 'Male',
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.role !== 'ADMIN') {
      setError('Only admin can add students');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (photo) data.append('photo', photo);

    try {
      await axios.post('http://localhost:4000/api/upload', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError('');
      navigate('/studentTable');
    } catch (err) {
      setError('Failed to add student');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row shadow rounded overflow-hidden w-100" style={{ maxWidth: '900px' }}>

        {/* Left Image Panel */}
        <div className="col-md-5 d-none d-md-block bg-primary text-white p-4 text-center">
          <div className="h-100 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">📘 Add New Student</h2>
            <p className="mt-2">Only Admin can access this page.</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
              alt="Add student"
              className="img-fluid mt-3"
              style={{ maxHeight: '200px' }}
            />
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="col-md-7 bg-white p-5">
          {/* Back Button */}
          <div className="mb-3">
            <Link to="/dashboard" className="btn btn-link text-decoration-none ps-0">
              ← Back to Dashboard
            </Link>
          </div>

          <h4 className="mb-4 fw-bold">Upload Student</h4>

          {error && <div className="text-danger mb-3">{error}</div>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter student name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Class</label>
              <input
                className="form-control"
                type="text"
                name="class"
                placeholder="Enter class"
                value={formData.class}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Photo</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={e => setPhoto(e.target.files[0])}
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Submit Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadStudent;
