const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const ToDo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {});

// GET A TODO by ID
router.get("/:id", async (req, res) => {});

// POST A TODO
router.post("/", async (req, res) => {
  try {
    const newToDo = new ToDo(req.body);
    await newToDo.save();
    res.status(200).json({
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
    await ToDo.insertMany(req.body); // <-- this handles arrays
    res.status(200).json({
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
    const result = await ToDo.updateOne(
      { _id: req.params.id },
      { $set: { status: "active" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No document found to update." });
    }

    res.status(200).json({
      message: "ToDo was updated successfully!",
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
      details: err.message,
    });
  }
});


// DELETE TODO
router.delete("/:id", async (req, res) => {});

module.exports = router;
