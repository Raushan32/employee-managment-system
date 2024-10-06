import React, { useEffect, useState } from "react";
import { fetchEmployees, updateEmployee, deleteEmployee } from "../api";

const ManageEmployees = ({ mode, refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index][field] = value;
    setEmployees(updatedEmployees);
  };

  const handleUpdate = async (employee) => {
    const updatedData = {
      employeeId: employee.employeeId,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      salary: employee.salary,
    };

    try {
      await updateEmployee(employee._id, updatedData);
      alert("Employee updated successfully!"); // Alert for successful update
      refresh(); // Refresh the employee list after update
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again."); // Alert for failure
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      alert("Employee deleted successfully!");
      refresh();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{mode === "update" ? "Update Employees" : "Delete Employees"}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Employee ID</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            {mode === "update" ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>
                <span>{employee.name}</span> {}
              </td>
              <td>
                <input
                  type="email"
                  value={employee.email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={employee.employeeId}
                  onChange={(e) =>
                    handleInputChange(index, "employeeId", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={employee.position}
                  onChange={(e) =>
                    handleInputChange(index, "position", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={employee.department}
                  onChange={(e) =>
                    handleInputChange(index, "department", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={employee.salary}
                  onChange={(e) =>
                    handleInputChange(index, "salary", e.target.value)
                  }
                />
              </td>
              {mode === "update" && (
                <td>
                  <button onClick={() => handleUpdate(employee)}>Update</button>
                </td>
              )}
              {mode === "delete" && (
                <td>
                  <button onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;
