import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { hashPassword } from "../services/hashing.js"

export const handleGetEmployees = async (req, res, next) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (err) {
    next(err);
  }
};


export const handleGetEmployee = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const handleCreateEmployee = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (await User.findOne({ email: email.toLowerCase() }))
      return res.status(400).json({ message: "Email already exists" });


    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: "employee",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

export const handleUpdateEmployee = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    Object.assign(user, req.body);

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await user.save();

    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    });
  } catch (err) {
    next(err);
  }
};

export const handleDeleteEmployee = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    next(err);
  }
};
