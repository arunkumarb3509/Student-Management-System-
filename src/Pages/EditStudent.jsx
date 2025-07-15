import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    class: '',
    gender: 'Male',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudent(res.data);
    } catch (err) {
      alert('Failed to load student data');
    }
  };

  const handleChange = (e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/students/${id}`, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Student updated successfully!');
      navigate('/studentTable');
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row shadow rounded overflow-hidden w-100" style={{ maxWidth: '900px' }}>

        {/* Left Panel */}
        <div className="col-md-5 d-none d-md-block bg-success text-white p-4 text-center">
          <div className="h-100 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">✏️ Edit Student</h2>
            <p className="mt-2">Update student details here.</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3596/3596091.png"
              alt="Edit student"
              className="img-fluid mt-3"
              style={{ maxHeight: '200px' }}
            />
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div className="col-md-7 bg-white p-5">
          <div className="mb-3">
            <Link to="/studentTable" className="btn btn-link text-decoration-none ps-0">
              ← Back to Student Table
            </Link>
          </div>

          <h4 className="mb-4 fw-bold">Edit Student Details</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={student.name}
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
                value={student.email}
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
                value={student.class}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={student.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <button className="btn btn-success w-100" type="submit">
              Update Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
