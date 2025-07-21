import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {
        const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    birthday: '',
    email: '',
    phoneNumber: '',
    salary: '',
    department: '',
    position: ''
  });

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
    const response = await axios.post('https://localhost:7121/api/Employee/Add', formData);

    console.log('Employee added:', response.data);
    alert('Employee successfully added!');
    
    setFormData({
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
    navigate("/");
  } catch (error) {
    console.error('Error adding employee:', error);
    alert('Failed to add employee');
  }
};

  return (
    <div className="container mt-4">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="col">
            <label className="form-label">Middle Name</label>
            <input type="text" className="form-control" name="middleName" value={formData.middleName} onChange={handleChange} />
          </div>
          <div className="col">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea className="form-control" name="address" value={formData.address} onChange={handleChange}></textarea>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Birthday</label>
            <input type="date" className="form-control" name="birthday" value={formData.birthday} onChange={handleChange} />
          </div>
          <div className="col">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Salary</label>
            <input type="number" className="form-control" name="salary" value={formData.salary} onChange={handleChange} />
          </div>
          <div className="col">
            <label className="form-label">Department</label>
            <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} />
          </div>
          <div className="col">
            <label className="form-label">Position</label>
            <input type="text" className="form-control" name="position" value={formData.position} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployee;
