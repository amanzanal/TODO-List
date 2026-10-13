const express = require("express");

const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/task.controller");

const authenticate = require("../middleware/auth.middleware");

const {
    validateTask,
    validateId,
} = require("../middleware/taskValidation");

const router = express.Router();

// Todas las rutas de tareas requieren autenticación.
router.use(authenticate);

router.get("/", getTasks);
router.get("/:id", validateId, getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateId, validateTask, updateTask);
router.delete("/:id", validateId, deleteTask);

module.exports = router;