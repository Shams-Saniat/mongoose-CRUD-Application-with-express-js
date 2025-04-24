const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

const Todo = mongoose.model("Todo", todoSchema);

// GET ALL THE ACTIVE TODOS
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find({ status: "active" })
      .select({ _id: 0, __v: 0, date: 0 })
      .limit(2);

    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
});

// GET A TODO by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findById(req.params.id).select({
      _id: 0,
      __v: 0,
      date: 0,
    });

    if (data) {
      res.status(200).json({
        result: data,
        message: "Success",
      });
    } else {
      res.status(404).json({
        error: "ToDo not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
});

// POST A TODO
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json({
      message: "ToDo was inserted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
});

// POST MULTIPLE TODOS
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body); // expects an array
    res.status(201).json({
      message: "ToDos were inserted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
});

// PUT TODO
router.put("/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { status: "active" } },
      { new: true }
    );

    if (result) {
      res.status(200).json({
        message: "ToDo was updated successfully!",
      });
    } else {
      res.status(404).json({
        error: "ToDo not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
      res.status(200).json({
        message: "ToDo was deleted successfully",
      });
    } else {
      res.status(404).json({
        error: "ToDo not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
});

module.exports = router;
