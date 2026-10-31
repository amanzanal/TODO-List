const Task = require("../models/task");

const getAllTasks = async (userId) => {
    return Task.find({ userId }).sort({ createdAt: -1 });
};

const getTaskById = async (id, userId) => {
    return Task.findOne({ _id: id, userId });
};

const createTask = async (taskData, userId) => {
    return Task.create({
        ...taskData,
        userId,
    });
};

const updateTask = async (id, taskData, userId) => {
    return Task.findOneAndUpdate(
        { _id: id, userId },
        taskData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteTask = async (id, userId) => {
    return Task.findOneAndDelete({
        _id: id,
        userId,
    });
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};