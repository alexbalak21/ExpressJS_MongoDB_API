const { json } = require("body-parser");
const express = require("express");
const { message } = require("statuses");
const router = express.Router();
const Todo = require("../models/todo");

module.exports = router;

//GET ALL
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({}, { _id: 0 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//GET ONE

router.get("/:id", getTodo, (req, res) => {
    res.json(res.todo);
});

//CREATE ONE

router.post("/", async (req, res) => {
    const todo = new Todo({
        name: req.body.name,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//UPDATE ONE

router.patch("/:id", getTodo, async (req, res) => {
    if (req.body.name != null) {
        res.todo.name = req.body.name;
    }
    try {
        const uppdatedTask = await res.todo.save();
        res.json(uppdatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//DELETE ONE
router.delete("/:id", getTodo, async (req, res) => {
    try {
        let remouved = await Todo.remove(res.todo);
        res.json(remouved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//MIDDLEWERE
async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findOne({ index: req.params.id });
        if (todo == null) {
            return res.status(404).json({ message: "Cant find Task" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.todo = todo;
    next();
}
