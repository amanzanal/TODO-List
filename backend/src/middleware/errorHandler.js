const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation error",
            errors: Object.values(err.errors).map(
                (error) => error.message
            ),
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID",
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: "A resource with this value already exists",
        });
    }

    const statusCode = Number.isInteger(err.statusCode)
        && err.statusCode >= 400
        && err.statusCode < 500
        ? err.statusCode
        : 500;

    if (statusCode >= 500) {
        console.error("Internal server error:", err);
    }

    return res.status(statusCode).json({
        message: statusCode === 500
            ? "Internal server error"
            : err.message,
    });
};

module.exports = errorHandler;