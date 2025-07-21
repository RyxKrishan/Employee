import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('https://localhost:7121/api/Employee/EmployeeList');
      setEmployees(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch employees");
    }
  };

const deleteEmp = async (employeeId) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    await axios.delete(`https://localhost:7121/api/Employee/DeleteEmployee/${employeeId}`);
    alert("Employee deleted successfully");
    fetchEmployees();
  } catch (err) {
    console.error(err);
    alert("Failed to delete employee");
  }
};

 const viewEmployee = (id) => {
    navigate(`/ViewEmployee/${id}`);
  };
  return (
    <div className="container mt-4">
      <h2>Employee List</h2>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/AddEmployee" className="btn btn-primary">
          Add New
        </Link>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Birthday</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employeeId}>
              <td>{emp.employeeId}</td>
              <td>{emp.firstname}</td>
              <td>{emp.middlename}</td>
              <td>{emp.lastname}</td>
              <td>{emp.address}</td>
              <td>{new Date(emp.birthday).toLocaleDateString()}</td>
              <td>{emp.email}</td>
              <td>{emp.phoneNumber}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>
                <button className="btn btn-info"onClick={()=>viewEmployee(emp.employeeId)}>View</button>
                {' '}
                <button className="btn btn-danger"onClick={() => deleteEmp(emp.employeeId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
