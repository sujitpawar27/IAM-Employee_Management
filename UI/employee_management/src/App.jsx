import "./App.css";
import AddEmployee from "./pages/AddEmployee";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/employee" element={<EmployeeForm />} />
      <Route path="/employee/:id" element={<EmployeeForm />} />
    </Routes>
  );
}

export default App;
