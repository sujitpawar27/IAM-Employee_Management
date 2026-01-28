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
    if (isEditMode && employeeToEdit) {
      setForm(employeeToEdit);
    }
  }, [isEditMode, employeeToEdit]);

  const submit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(updateEmployee(form));
    } else {
      dispatch(addEmployee({ ...form, id: Date.now() }));
    }

    navigate("/");
  };

  return (
    <>
      <Navbar />

      <form className="p-6 max-w-md mx-auto" onSubmit={submit}>
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Employee" : "Add Employee"}
        </h2>

        <input
          required
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          required
          placeholder="Role"
          className="border p-2 w-full mb-2"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          required
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Button type="submit">
          {isEditMode ? "Update Employee" : "Save Employee"}
        </Button>
      </form>
    </>
  );
}
