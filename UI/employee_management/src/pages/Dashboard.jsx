import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../store/slices/employeeSlice";
import Button from "../components/common/Button";

export default function Dashboard() {
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-end items-center mb-6">
          <Link to="/employee">
            <Button>Add Employee</Button>
          </Link>
        </div>

        
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-center">Name</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-center">Email</th>
                <th className="px-4 py-3 text-center">Department</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-16 text-center">
                    <p className="text-gray-500 text-sm">
                      No employees found 👀
                    </p>
                    <Link to="/employee">
                      <button className="mt-3 text-blue-600 hover:underline text-sm">
                        Add your first employee
                      </button>
                    </Link>
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800 text-center">
                      {emp.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-center">
                      {emp.role}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-center">
                      {emp.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-center">
                      {emp.department}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Link to={`/employee/${emp.id}`}>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => dispatch(deleteEmployee(emp.id))}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
