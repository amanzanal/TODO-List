const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;

    if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
        throw new Error("JWT_SECRET must contain at least 32 bytes");
    }

    return secret;
};

const publicUser = (user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
});

const createAccessToken = (user) => {
    return jwt.sign(
        {},
        getJwtSecret(),
        {
            subject: user._id.toString(),
            expiresIn: "15m",
            issuer: "todo-api",
            audience: "todo-client",
            algorithm: "HS256",
        }
    );
};

const register = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        email: normalizedEmail,
    });

    if (existingUser) {
        const error = new Error("An account with this email already exists");
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            passwordHash,
        });

        return {
            user: publicUser(user),
            token: createAccessToken(user),
        };
    } catch (error) {
        // El índice único también protege frente a registros simultáneos.
        if (error.code === 11000) {
            const conflict = new Error(
                "An account with this email already exists"
            );
            conflict.statusCode = 409;
            throw conflict;
        }

        throw error;
    }
};

const login = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail,
    }).select("+passwordHash");

    if (
        !user ||
        !(await bcrypt.compare(password, user.passwordHash))
    ) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    return {
        user: publicUser(user),
        token: createAccessToken(user),
    };
};

module.exports = {
    register,
    login,
};