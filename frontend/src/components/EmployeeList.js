import React from "react";
import { deleteEmployee } from "../api";

const EmployeeList = ({ employees, refresh }) => {
  const handleDelete = async (id) => {
    await deleteEmployee(id);
    refresh();
  };

  return (
    <div>
      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.email}
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
