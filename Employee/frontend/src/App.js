import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import ViewEmployee from './ViewEmployee';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/AddEmployee" element={<AddEmployee />} />
       <Route path="/ViewEmployee/:employeeid" element={<ViewEmployee />} />
    </Routes>
  );
}

export default App;
