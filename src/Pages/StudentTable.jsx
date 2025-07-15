import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate, Link } from 'react-router-dom';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = JSON.parse(atob(token.split('.')[1])).role;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/getAllStudents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Student deleted successfully!');
      fetchStudents();
    } catch (err) {
      alert('Error deleting student');
      console.error(err);
    }
  };

  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterClass === '' || student.class === filterClass)
  );

  const totalPages = Math.ceil(filtered.length / studentsPerPage);
  const paginated = filtered.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

  return (
    <div className="container mt-5">

      {/* Top Section: Back + Title + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <Link to="/dashboard" className="btn btn-link text-decoration-none ps-0 mb-2">
            ← Back to Dashboard
          </Link>
          <h3 className="fw-bold text-primary">Student List</h3>
        </div>
        {role === 'ADMIN' && (
          <Link to="/upload" className="btn btn-primary mt-2">
            ➕ Add Student
          </Link>
        )}
      </div>

      {/* Search & Filter */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="🔍 Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="🏫 Filter by class"
            value={filterClass}
            onChange={e => setFilterClass(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Photo</th>
              {role === 'ADMIN' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.class}</td>
                <td>{student.gender}</td>
                <td>
                  <img
                    src={`http://localhost:4000/uploads/${student.photo}`}
                    alt="profile"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                </td>
                {role === 'ADMIN' && (
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/edit-student/${student.id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={role === 'ADMIN' ? 6 : 5}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default StudentTable;
