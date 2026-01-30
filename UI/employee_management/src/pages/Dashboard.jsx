import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "../store/slices/employeeSlice";
import Button from "../components/common/Button";
import { useEffect } from "react";

export default function Dashboard() {
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  console.log("employees", employees);
  
  return (
    <>
      <Navbar />

      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Employees</h2>
          <Link to="/employee">
            <Button>Add Employee</Button>
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Department</th>  
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="text-center">
                  <td className="border p-2">{emp.name}</td>
                  <td className="border p-2">{emp.role}</td>
                  <td className="border p-2">{emp.email}</td>
                  <td className="border p-2">{emp.department}</td>
                  <td className="border p-2">
                    <Link to={`/employee/${emp.id}`} className="mr-2">
                      <Button variant="secondary">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(deleteEmployee(emp.id))}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
