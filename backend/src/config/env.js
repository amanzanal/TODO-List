const validateEnv = () => {
    const requiredVariables = [
        "MONGODB_URI",
        "JWT_SECRET",
    ];

    for (const variable of requiredVariables) {
        if (!process.env[variable]?.trim()) {
            throw new Error(
                `Missing required environment variable: ${variable}`
            );
        }
    }

    if (
        Buffer.byteLength(process.env.JWT_SECRET, "utf8") < 32
    ) {
        throw new Error(
            "JWT_SECRET must contain at least 32 bytes"
        );
    }

    const port = Number(process.env.PORT || 3000);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("PORT must be a valid port number");
    }

    const nodeEnv = process.env.NODE_ENV || "development";

    if (!["development", "production", "test"].includes(nodeEnv)) {
        throw new Error(
            "NODE_ENV must be development, production or test"
        );
    }

    return { port, nodeEnv };
};

module.exports = validateEnv;