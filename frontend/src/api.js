import axios from "axios";

const api = axios.create({
//   baseURL: "http://localhost:5000/api",
baseURL: "https://backend-lciw.onrender.com/api",
});

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

export const fetchEmployees = () => api.get("/employees");
export const createEmployee = async (data) => {
    try {
        const response = await api.post("/employees", data);
        return response.data; 
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        throw error; 
    }
};

export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const createAttendance = (name, data) => api.post(`/attendance/log`, { name, ...data });

export const createPayroll = (data) => api.post(`/payroll/add`, data);

export default api;
