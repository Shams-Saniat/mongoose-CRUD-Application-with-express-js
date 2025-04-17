const express = require("express");
const router = express.Router();

// GET ALL THE TODOS
router.get("/", async (req, res) => {});

// GET A TODO by ID
router.get("/:id", async (req, res) => {});

// POST TODO
router.post("/", async (req, res) => {});

// POST MULTIPLE TODOS
router.post("/all", async (req, res) => {});

// PUT TODO
router.put("/:id", async (req, res) => {});

// DELETE TODO
router.delete("/:id", async (req, res) => {});

module.export = router;
