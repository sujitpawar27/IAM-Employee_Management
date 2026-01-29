import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employee" element={<EmployeeForm />} />
      <Route path="/employee/:id" element={<EmployeeForm />} />
    </Routes>
  );
}

export default App;
