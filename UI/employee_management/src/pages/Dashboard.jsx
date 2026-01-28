import Navbar from "../components/layout/Navbar";

const employees = [
  {
    id: 1,
    name: "Sujit pawar",
    role: "Frontend Developer",
    email: "sujit@gmail.com",
  },
  {
    id: 2,
    name: "Sarang Mahajan",
    role: "Backend Developer",
    email: "Sarang@gmail.com",
  },
];

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Employees</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium">{emp.name}</h3>
              <p className="text-gray-600">{emp.role}</p>
              <p className="text-sm text-gray-500">{emp.email}</p>

              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
