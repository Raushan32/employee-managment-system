const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();


router.post('/', async (req, res) => {
    const { name, employeeId, email, position, department, salary } = req.body;

    console.log("Request Body:", req.body); // Log the request body for debugging

    try {
        const employee = new Employee({ name, employeeId, email, position, department, salary });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        console.error("Error saving employee:", error.message); 
        res.status(500).json({ message: "Failed to add employee", error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Failed to fetch employees" });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json(employee);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Failed to update employee" });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Employee.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Failed to delete employee" });
    }
});

module.exports = router;
