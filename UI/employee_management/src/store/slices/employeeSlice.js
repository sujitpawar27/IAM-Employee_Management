import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEmployeeApi, deleteEmployeeApi, getEmployeesApi, getEmployeesWithDepartmentApi, updateEmployeeApi } from "../../services/employeeApi";

export const fetchEmployees = createAsyncThunk(
  "employee/fetch",
  async () => {
    return await getEmployeesApi();
  }
);

export const addEmployee = createAsyncThunk(
  "employee/add",
  async (data) => {
    return await createEmployeeApi(data);
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id) => {
    await deleteEmployeeApi(id);
    return id;
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, data }) => {
    console.log("updateEmployee", id, data);
    const response = await updateEmployeeApi(id, data);
    console.log("response", response);
    return response;
  }
);

export const fetchEmployeesWithDepartment = createAsyncThunk(
  "employee/fetchWithDepartment",
  async () => {
    return await getEmployeesWithDepartmentApi();
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // READ
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })

      // CREATE
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      // DELETE
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (e) => e.id !== action.payload
        );
      })

      // UPDATE
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })

      // FETCH WITH DEPARTMENT
      .addCase(fetchEmployeesWithDepartment.fulfilled, (state, action) => {
        state.employeesWithDept = action.payload;
      });
  },
});

export default employeeSlice.reducer;
