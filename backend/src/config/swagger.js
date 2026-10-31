
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "Todo List API",
            version: "1.0.0",
            description:
                "API REST para gestionar tareas con Express, Mongoose y MongoDB Atlas."
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ],

        tags: [
            {
                name: "Tasks",
                description: "Gestión de tareas"
            }
        ],

        components: {
            schemas: {
                Task: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "671234567890abcdef123456"
                        },
                        title: {
                            type: "string",
                            example: "Probar Swagger"
                        },
                        completed: {
                            type: "boolean",
                            example: false
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                TaskInput: {
                    type: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            type: "string",
                            minLength: 1,
                            example: "Probar Swagger"
                        },
                        completed: {
                            type: "boolean",
                            default: false,
                            example: false
                        }
                    }
                },

                Error: {
                    type: "object",
                    required: ["message"],
                    properties: {
                        message: {
                            type: "string",
                            example: "Task not found"
                        }
                    }
                }
            }
        }
    },

    apis: [
        path.join(__dirname, "../routes/*.js")
    ]
};

module.exports = swaggerJsdoc(options);
