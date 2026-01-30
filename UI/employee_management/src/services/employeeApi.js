const BASE_URL = "http://127.0.0.1:8000/users";

export const getEmployeesApi = async () => {
    console.log("getEmployeesApi", BASE_URL);
    
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createEmployeeApi = async (data) => {
  const res = await fetch(BASE_URL + "/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateEmployeeApi = async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  };

export const deleteEmployeeApi = async (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

export const getEmployeesWithDepartmentApi = async () => {
    const res = await fetch(`${BASE_URL}/with-department`);
    return res.json();
  };

  export const getDepartmentsApi = async () => {
    const res = await fetch("http://127.0.0.1:8000/departments");
    return res.json();
  };
  