# Todo List API — Backend

Backend de una aplicación Todo List desarrollada con Node.js, Express, MongoDB y Mongoose.

Este documento explica detalladamente cómo está construido el backend, cómo se organiza el proyecto, cómo funciona la API, cómo se conecta con MongoDB Atlas y cómo se realizan las operaciones CRUD sobre las tareas.

---

# Índice

1. [Descripción del proyecto](#1-descripción-del-proyecto)
2. [Tecnologías utilizadas](#2-tecnologías-utilizadas)
3. [Arquitectura del backend](#3-arquitectura-del-backend)
4. [Estructura del proyecto](#4-estructura-del-proyecto)
5. [Inicialización del proyecto](#5-inicialización-del-proyecto)
6. [Dependencias](#6-dependencias)
7. [Variables de entorno](#7-variables-de-entorno)
8. [MongoDB Atlas](#8-mongodb-atlas)
9. [Servidor](#9-servidor)
10. [Configuración de Express](#10-configuración-de-express)
11. [Conexión con MongoDB](#11-conexión-con-mongodb)
12. [Modelo Task](#12-modelo-task)
13. [Routes](#13-routes)
14. [Controllers](#14-controllers)
15. [Services](#15-services)
16. [Middleware](#16-middleware)
17. [API REST](#17-api-rest)
18. [GET /api/tasks](#18-get-apitasks)
19. [GET /api/tasks/:id](#19-get-apitasksid)
20. [POST /api/tasks](#20-post-apitasks)
21. [PUT /api/tasks/:id](#21-put-apitasksid)
22. [DELETE /api/tasks/:id](#22-delete-apitasksid)
23. [Manejo de errores](#23-manejo-de-errores)
24. [CORS](#24-cors)
25. [Flujo completo de una petición](#25-flujo-completo-de-una-petición)
26. [Pruebas de la API](#26-pruebas-de-la-api)
27. [Ejecutar el backend](#27-ejecutar-el-backend)
28. [Seguridad](#28-seguridad)
29. [Estado actual](#29-estado-actual)
30. [Mejoras futuras](#30-mejoras-futuras)

---

# 1. Descripción del proyecto

Este proyecto es el backend de una aplicación Todo List.

El objetivo del backend es proporcionar una API REST que permita al frontend crear, consultar, modificar y eliminar tareas.

Las tareas se almacenan en MongoDB Atlas, por lo que los datos son persistentes y no se pierden cuando el servidor se reinicia.

Las operaciones principales son:

- Crear una tarea.
- Obtener todas las tareas.
- Obtener una tarea concreta.
- Actualizar una tarea.
- Marcar una tarea como completada.
- Eliminar una tarea.

La comunicación entre frontend y backend se realiza mediante HTTP y JSON.

La arquitectura general es:

Frontend
    |
    | HTTP
    v
Express
    |
    v
Routes
    |
    v
Middleware
    |
    v
Controllers
    |
    v
Services
    |
    v
Mongoose
    |
    v
MongoDB Atlas

---

# 2. Tecnologías utilizadas

## Node.js

Node.js es el entorno de ejecución utilizado para ejecutar JavaScript en el servidor.

Permite ejecutar nuestro código backend sin necesidad de un navegador.

---

## Express

Express es el framework utilizado para crear el servidor HTTP y la API REST.

Permite crear rutas como:

GET /api/tasks

GET /api/tasks/:id

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

---

## MongoDB

MongoDB es la base de datos utilizada para almacenar las tareas.

Es una base de datos NoSQL orientada a documentos.

Cada tarea se almacena como un documento.

---

## MongoDB Atlas

MongoDB Atlas es el servicio cloud donde se aloja nuestra base de datos MongoDB.

El backend se conecta a MongoDB Atlas mediante una cadena de conexión almacenada en una variable de entorno.

---

## Mongoose

Mongoose es el ODM utilizado para trabajar con MongoDB desde Node.js.

Permite:

- Crear esquemas.
- Crear modelos.
- Validar datos.
- Buscar documentos.
- Crear documentos.
- Actualizar documentos.
- Eliminar documentos.

---

## dotenv

dotenv permite cargar variables de entorno desde un archivo `.env`.

Por ejemplo:

PORT=3000

MONGODB_URI=mongodb+srv://...

Después podemos acceder a ellas mediante:

process.env.PORT

process.env.MONGODB_URI

---

## CORS

CORS permite que el frontend pueda realizar peticiones HTTP al backend aunque frontend y backend estén ejecutándose en diferentes orígenes.

Por ejemplo:

Frontend:

http://127.0.0.1:5500

Backend:

http://localhost:3000

---

# 3. Arquitectura del backend

El backend está dividido en diferentes capas.

La arquitectura sigue este flujo:

Request
    |
    v
Route
    |
    v
Middleware
    |
    v
Controller
    |
    v
Service
    |
    v
Model
    |
    v
MongoDB

Cada parte tiene una responsabilidad concreta.

## Routes

Las rutas determinan qué endpoint se está solicitando.

Ejemplo:

GET /api/tasks

---

## Middleware

Los middleware permiten ejecutar lógica antes de llegar al controller.

Se utilizan principalmente para:

- Validar datos.
- Validar IDs.
- Gestionar errores.

---

## Controllers

Los controllers reciben la petición HTTP y devuelven la respuesta HTTP.

No deberían contener toda la lógica relacionada con la base de datos.

---

## Services

Los services contienen la lógica relacionada con las operaciones de las tareas.

Son utilizados por los controllers.

---

## Models

Los models representan la estructura de los documentos de MongoDB.

En nuestro caso tenemos un modelo:

Task

---

## MongoDB

MongoDB es la capa encargada de almacenar los datos de forma permanente.

---

# 4. Estructura del proyecto

La estructura del backend es:

backend/
│
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
├── package-lock.json
│
├── node_modules/
│
└── src/
    │
    ├── config/
    │   └── database.js
    │
    ├── controllers/
    │   └── task.controller.js
    │
    ├── middleware/
    │   ├── errorHandler.js
    │   └── taskValidation.js
    │
    ├── models/
    │   └── task.js
    │
    ├── routes/
    │   └── taskRoutes.js
    │
    └── services/
        └── task.service.js

Cada carpeta tiene una responsabilidad diferente.

---

# 5. Inicialización del proyecto

El proyecto utiliza Node.js.

Para crear inicialmente un proyecto Node.js se utiliza:

npm init -y

Esto genera el archivo:

package.json

El archivo package.json contiene la información del proyecto y sus dependencias.

---

# 6. Dependencias

Las principales dependencias utilizadas son:

- express
- mongoose
- dotenv
- cors

Se pueden instalar mediante:

npm install express mongoose dotenv cors

Después de instalar las dependencias aparece la carpeta:

node_modules/

y se genera:

package-lock.json

---

## node_modules

La carpeta node_modules contiene las dependencias instaladas.

No debe subirse al repositorio.

Por eso se incluye en `.gitignore`.

---

## package-lock.json

package-lock.json registra las versiones exactas de las dependencias instaladas.

Sí debe subirse al repositorio.

---

# 7. Variables de entorno

El backend utiliza un archivo:

.env

Este archivo se encuentra en la raíz del backend.

Ejemplo:

PORT=3000

MONGODB_URI=mongodb+srv://USUARIO:CONTRASEÑA@cluster.mongodb.net/todolist

La variable PORT indica el puerto donde se ejecutará el servidor.

La variable MONGODB_URI contiene la cadena de conexión con MongoDB Atlas.

La URI real no debe publicarse en GitHub porque puede contener credenciales.

---

# 8. MongoDB Atlas

MongoDB Atlas proporciona la base de datos MongoDB en la nube.

El backend utiliza MongoDB Atlas para almacenar las tareas.

La comunicación funciona de la siguiente manera:

Node.js
    |
    | Mongoose
    v
MongoDB Atlas
    |
    v
Base de datos
    |
    v
Colección de tareas

La aplicación no se conecta directamente desde el frontend a MongoDB.

El frontend siempre se comunica con el backend.

Por tanto:

Frontend
    |
    v
Backend
    |
    v
MongoDB

Esto permite mantener las credenciales de la base de datos fuera del frontend.

---

# 9. Servidor

El archivo:

server.js

es el punto de entrada de la aplicación.

Su responsabilidad principal es:

1. Cargar las variables de entorno.
2. Importar Express.
3. Conectar con MongoDB.
4. Iniciar el servidor HTTP.

Ejemplo:

```js
require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const startServer = async () => {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

startServer();
