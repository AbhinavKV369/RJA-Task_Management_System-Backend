import User from "../models/User.js";
import { hashPassword } from "../services/hashing.js";

export const handleGetEmployees = async (req, res, next) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const handleGetEmployee = async (req, res, next) => {
  try {
    const employee = await User.findById(req.params.id).select("-password");
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const handleCreateEmployee = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newEmployee = await User.create({
      name,
      email,
      password: await hashPassword(password),
      role: "employee",
    });

    res.status(201).json({
      _id: newEmployee._id,
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateEmployee = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) employee.name = name;
    if (email) employee.email = email;
    if (password) {
      employee.password = await hashPassword(password);
    }

    const updatedEmployee = await employee.save();

    res.json({
      _id: updatedEmployee._id,
      name: updatedEmployee.name,
      email: updatedEmployee.email,
      role: updatedEmployee.role,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteEmployee = async (req, res, next) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }

    await employee.deleteOne();

    res.json({ message: "Employee removed successfully" });
  } catch (error) {
    next(error);
  }
};
