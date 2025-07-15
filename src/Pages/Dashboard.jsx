import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [classData, setClassData] = useState({});
  const [genderData, setGenderData] = useState({});
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      setUserName(decoded.name || 'User'); // default fallback
    } catch (err) {
      console.error('Invalid token');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    api.get('/getAllStudents')
      .then(res => {
        const list = res.data;
        setStudents(list);

        const classCounts = {};
        const genderCounts = { Male: 0, Female: 0 };

        list.forEach(s => {
          classCounts[s.class] = (classCounts[s.class] || 0) + 1;
          genderCounts[s.gender] = (genderCounts[s.gender] || 0) + 1;
        });

        setClassData({
          labels: Object.keys(classCounts),
          datasets: [{
            label: 'Students per Class',
            data: Object.values(classCounts),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          }],
        });

        setGenderData({
          labels: ['Male', 'Female'],
          datasets: [{
            label: 'Gender Ratio',
            data: [genderCounts.Male, genderCounts.Female],
            backgroundColor: ['#36A2EB', '#FF6384'],
          }],
        });
      })
      .catch(err => {
        if (err?.response?.status === 401) navigate('/login');
        else alert('Could not load dashboard data 😢');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-4">

      {/* ---------- Header Section with Greeting + Buttons ---------- */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold text-primary">📊 Student Dashboard</h2>
          <h6 className="text-muted">Welcome, <strong>{userName}</strong></h6>
        </div>

        <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
          {role === 'ADMIN' && (
            <Link to="/upload" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i> Add Student
            </Link>
          )}
          <Link to="/studentTable" className="btn btn-outline-secondary">
            <i className="bi bi-table me-2"></i> View Students
          </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>

      {/* ---------- Charts Section ---------- */}
      <div className="row">
        {classData?.labels?.length > 0 && (
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm p-3">
              <h5 className="text-center mb-3">Students per Class</h5>
              <Bar data={classData} />
            </div>
          </div>
        )}

        {genderData?.labels?.length > 0 && (
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm p-3">
              <h5 className="text-center mb-3">Gender Distribution</h5>
              <Pie data={genderData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
