import Task from "../models/Task.js";

export const handleGetTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("assignedTo", "name email");
    } else {
      tasks = await Task.find({ assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email",
      );
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const handleCreateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, priority, dueDate } =
      req.body;
    const task = await Task.create({
      title,
      description,
      assignedTo,
      status,
      priority,
      dueDate,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const handleUpdateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    if (req.user.role === "employee") {
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not allowed" });
      }

      if (req.body.status) {
        task.status = req.body.status;
      }
    }

    if (req.user.role === "admin") {
      const { title, description, assignedTo, status, priority, dueDate } =
        req.body;

      if (title) task.title = title;
      if (description) task.description = description;
      if (assignedTo) task.assignedTo = assignedTo;
      if (status) task.status = status;
      if (priority) task.priority = priority;
      if (dueDate) task.dueDate = dueDate;
    }

    const updatedTask = await task.save();
    await updatedTask.populate("assignedTo", "name email");

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const handleDeleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
