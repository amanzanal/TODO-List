const express = require("express");

const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/task.controller");

const {
    validateTask,
    validateId
} = require("../middleware/taskValidation");

const router = express.Router();

router.get("/", getTasks);

router.get("/:id", validateId, getTaskById);

router.post("/", validateTask, createTask);

router.put(
    "/:id",
    validateId,
    validateTask,
    updateTask
);

router.delete(
    "/:id",
    validateId,
    deleteTask
);

module.exports = router;
