
const express = require("express");
const cors = require("cors");

const taskRoutes = require("./src/routes/taskRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Ruta de comprobación
app.get("/", (req, res) => {
    res.json({
        message: "Todo API funcionando"
    });
});

// Rutas CRUD
app.use("/api/tasks", taskRoutes);

// Middleware de errores al final
app.use(errorHandler);

module.exports = app;
