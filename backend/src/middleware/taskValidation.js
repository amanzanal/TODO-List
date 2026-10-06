const mongoose = require("mongoose");

const validateTask = (req, res, next) => {
    const { title, completed } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (typeof title !== "string") {
        return res.status(400).json({
            message: "Title must be a string"
        });
    }

    if (title.trim() === "") {
        return res.status(400).json({
            message: "Title cannot be empty"
        });
    }

    if (
        completed !== undefined &&
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({
            message: "Completed must be a boolean"
        });
    }

    next();
};

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    next();
};

module.exports = {
    validateTask,
    validateId
};
