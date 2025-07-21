import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewEmployee = () => {
        const navigate = useNavigate();
  const { employeeid } = useParams();

  const [formData, setFormData] = useState({
    Firstname: '',
    Middlename: '',
    Lastname: '',
    Address: '',
    Birthday: '',
    Email: '',
    PhoneNumber: '',
    Salary: '',
    Department: '',
    Position: ''
  });

  useEffect(() => {
    axios.get(`https://localhost:7121/api/Employee/ViewEmployee/${employeeid}`)
      .then(res => {
        const emp = res.data.data;
        setFormData({
          Firstname: emp.firstname,
          Middlename: emp.middlename,
          Lastname: emp.lastname,
          Address: emp.address,
          Birthday: emp.birthday,
          Email: emp.email,
          PhoneNumber: emp.phoneNumber,
          Salary: emp.salary,
          Department: emp.department,
          Position: emp.position
        });
      })
      .catch(err => console.error(err));
  }, [employeeid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://localhost:7121/api/Employee/UpdateEmployee/${employeeid}`, formData);
      alert('Employee updated successfully!');
         navigate("/");
    } catch (err) {
      console.error(err);
      alert('Failed to update employee');
    }
  };

  return (
    <div className="container mt-4">
      <h2>View / Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="Firstname"
              value={formData.Firstname}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="Middlename"
              value={formData.Middlename}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="Lastname"
              value={formData.Lastname}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Birthday</label>
            <input
              type="date"
              className="form-control"
              name="Birthday"
              value={formData.Birthday}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Salary</label>
            <input
              type="number"
              className="form-control"
              name="Salary"
              value={formData.Salary}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              name="Department"
              value={formData.Department}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label>Position</label>
            <input
              type="text"
              className="form-control"
              name="Position"
              value={formData.Position}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default ViewEmployee;
