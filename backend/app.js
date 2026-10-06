const express = require("express");

const taskRoutes = require("./src/routes/taskRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Todo API funcionando"
    });
});

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

module.exports = app;
