require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./src/config/database");
const validateEnv = require("./src/config/env");

const startServer = async () => {
    let server;

    try {
        const config = validateEnv();

        await connectDatabase();

        server = app.listen(config.port, () => {
            console.log(
                `Server running on port ${config.port} (${config.nodeEnv})`
            );
        });

        const shutdown = (signal) => {
            console.log(`${signal} received. Closing server...`);

            server.close(async (error) => {
                if (error) {
                    console.error("Error closing server:", error);
                    process.exitCode = 1;
                }

                try {
                    const mongoose = require("mongoose");
                    await mongoose.disconnect();
                    console.log("MongoDB connection closed");
                } catch (dbError) {
                    console.error(
                        "Error closing MongoDB connection:",
                        dbError
                    );
                    process.exitCode = 1;
                }

                if (error) {
                    process.exitCode = 1;
                }
            });
        };

        process.once("SIGINT", () => shutdown("SIGINT"));
        process.once("SIGTERM", () => shutdown("SIGTERM"));
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exitCode = 1;
    }
};

startServer();