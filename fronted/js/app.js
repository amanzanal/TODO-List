const API_URL = "http://localhost:3000/api/tasks";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");


// ==============================
// CARGAR TAREAS
// ==============================

const loadTasks = async () => {
    try {
        loading.classList.remove("hidden");
        errorMessage.classList.add("hidden");

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("No se pudieron cargar las tareas");
        }

        const tasks = await response.json();

        renderTasks(tasks);

    } catch (error) {
        console.error(error);

        showError("No se pudieron cargar las tareas");

    } finally {
        loading.classList.add("hidden");
    }
};


// ==============================
// MOSTRAR TAREAS
// ==============================

const renderTasks = (tasks) => {

    taskList.innerHTML = "";

    updateTaskCount(tasks.length);

    if (tasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty";

        emptyMessage.textContent = "No tienes tareas todavía.";

        taskList.appendChild(emptyMessage);

        return;
    }

    tasks.forEach(task => {

        const taskElement = createTaskElement(task);

        taskList.appendChild(taskElement);

    });
};


// ==============================
// CREAR ELEMENTO DE TAREA
// ==============================

const createTaskElement = (task) => {

    const li = document.createElement("li");

    li.className = "task";

    if (task.completed) {
        li.classList.add("completed");
    }

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className = "task-checkbox";

    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
        toggleTask(task);
    });


    const title = document.createElement("span");

    title.className = "task-title";

    title.textContent = task.title;


    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-button";

    deleteButton.textContent = "Eliminar";

    deleteButton.addEventListener("click", () => {
        deleteTask(task._id);
    });


    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(deleteButton);

    return li;
};


// ==============================
// CREAR TAREA
// ==============================

const createTask = async (title) => {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                completed: false
            })

        });

        if (!response.ok) {

            const error = await response.json();

            throw new Error(error.message || "No se pudo crear la tarea");
        }

        taskInput.value = "";

        await loadTasks();

    } catch (error) {

        console.error(error);

        showError(error.message);

    }
};


// ==============================
// CAMBIAR ESTADO
// ==============================

const toggleTask = async (task) => {

    try {

        const response = await fetch(`${API_URL}/${task._id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: task.title,
                completed: !task.completed
            })

        });

        if (!response.ok) {
            throw new Error("No se pudo actualizar la tarea");
        }

        await loadTasks();

    } catch (error) {

        console.error(error);

        showError(error.message);

    }
};


// ==============================
// ELIMINAR TAREA
// ==============================

const deleteTask = async (id) => {

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar la tarea");
        }

        await loadTasks();

    } catch (error) {

        console.error(error);

        showError(error.message);

    }
};


// ==============================
// CONTADOR
// ==============================

const updateTaskCount = (count) => {

    if (count === 1) {
        taskCount.textContent = "1 tarea";
    } else {
        taskCount.textContent = `${count} tareas`;
    }
};


// ==============================
// MOSTRAR ERROR
// ==============================

const showError = (message) => {

    errorMessage.textContent = message;

    errorMessage.classList.remove("hidden");

};


// ==============================
// FORMULARIO
// ==============================

taskForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) {
        return;
    }

    await createTask(title);
});


// ==============================
// INICIO
// ==============================

loadTasks();
