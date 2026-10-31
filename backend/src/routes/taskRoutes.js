
const express = require("express");

const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/task.controller");

const authenticate = require("../middleware/auth.middleware");

const {
    validateTask,
    validateId,
} = require("../middleware/taskValidation");

const router = express.Router();

// Todas las rutas de tareas requieren autenticación.
router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operaciones CRUD de tareas
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Devuelve todas las tareas almacenadas en MongoDB.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Busca una tarea utilizando su ID de MongoDB.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *           example: 671234567890abcdef123456
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", validateId, getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una tarea
 *     description: Crea una nueva tarea en MongoDB.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *           example:
 *             title: Probar Swagger
 *             completed: false
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos de la tarea no válidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", validateTask, createTask);
router.put("/:id", validateId, validateTask, updateTask);
router.delete("/:id", validateId, deleteTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: >
 *       Actualiza una tarea existente. El campo title es obligatorio.
 *       El campo completed es opcional.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea que se actualizará
 *         schema:
 *           type: string
 *           example: 671234567890abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *           example:
 *             title: Tarea actualizada
 *             completed: true
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: ID o datos de la tarea no válidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id", validateId, validateTask, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea utilizando su ID de MongoDB.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea que se eliminará
 *         schema:
 *           type: string
 *           example: 671234567890abcdef123456
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: Task deleted successfully
 *       400:
 *         description: ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", validateId, deleteTask);

module.exports = router;