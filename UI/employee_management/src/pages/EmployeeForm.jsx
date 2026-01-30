import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../store/slices/employeeSlice";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Button from "../components/common/Button";

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employee.employees);
  const employeeToEdit = employees.find((e) => e.id === Number(id));

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    getDepartmentsApi().then(setDepartments);
  }, []);

  useEffect(() => {
    if (isEditMode && employeeToEdit) {
      setForm(employeeToEdit);
    }
  }, [isEditMode, employeeToEdit]);

  const submit = (e) => {
    e.preventDefault();
    isEditMode
      ? dispatch(updateEmployee({ id: Number(id), data: form }))
      : dispatch(addEmployee(form));
    navigate("/");
  };

  return (
    <>
      <Navbar />

      {/* Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex justify-center px-4 py-14">
        <form
          onSubmit={submit}
          className="relative w-full max-w-xl backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isEditMode ? "Edit Employee" : "Add Employee"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Create or update employee information
            </p>
          </div>

          {/* Floating Input */}
          {[
            { label: "Full Name", key: "name", type: "text" },
            { label: "Role", key: "role", type: "text" },
            { label: "Email Address", key: "email", type: "email" },
          ].map(({ label, key, type }) => (
            <div key={key} className="relative mb-6">
              <input
                required
                type={type}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="peer w-full bg-transparent border-b-2 border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-900 transition"
              />
              <label className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-900 peer-valid:-top-2 peer-valid:text-xs">
                {label}
              </label>
            </div>
          ))}

          {/* Department */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-2">
              Department
            </label>
            <select
              required
              value={form.department_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  department_id: Number(e.target.value),
                })
              }
              className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-800 to-cyan-700 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition"
            >
              {isEditMode ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
