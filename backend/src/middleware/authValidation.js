const isValidEmail = (email) => {
    return (
        typeof email === "string" &&
        email.length <= 254 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
};

const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body || {};

    if (
        typeof name !== "string" ||
        name.trim().length < 2 ||
        name.trim().length > 80
    ) {
        return res.status(400).json({
            message: "Name must contain between 2 and 80 characters",
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            message: "A valid email is required",
        });
    }

    if (
        typeof password !== "string" ||
        password.length < 12 ||
        password.length > 72
    ) {
        return res.status(400).json({
            message: "Password must contain between 12 and 72 characters",
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body || {};

    if (
        !isValidEmail(email) ||
        typeof password !== "string" ||
        password.length === 0 ||
        password.length > 72
    ) {
        return res.status(400).json({
            message: "Valid email and password are required",
        });
    }

    next();
};

module.exports = {
    validateRegister,
    validateLogin,
};