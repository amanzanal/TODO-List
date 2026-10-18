const taskService = require("../services/task.service");

const getTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getAllTasks(req.user.id);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await taskService.getTaskById(
            req.params.id,
            req.user.id
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    try {
        const { title, completed } = req.body;

        const task = await taskService.createTask(
            {
                title: title.trim(),
                completed: completed ?? false,
            },
            req.user.id
        );

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { title, completed } = req.body;

        const task = await taskService.updateTask(
            req.params.id,
            {
                title: title.trim(),
                completed,
            },
            req.user.id
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await taskService.deleteTask(
            req.params.id,
            req.user.id
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};