const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
    const authorization = req.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    const token = authorization.slice(7).trim();

    if (!token || token.split(".").length !== 3) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
            issuer: "todo-api",
            audience: "todo-client",
        });

        if (
            typeof payload.sub !== "string" ||
            !mongoose.isValidObjectId(payload.sub)
        ) {
            return res.status(401).json({
                message: "Invalid or expired token",
            });
        }

        const user = await User.findById(payload.sub)
            .select("_id name email");

        if (!user) {
            return res.status(401).json({
                message: "Invalid or expired token",
            });
        }

        req.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };

        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError") {
            return res.status(401).json({
                message: "Invalid or expired token",
            });
        }

        next(error);
    }
};

module.exports = authenticate;