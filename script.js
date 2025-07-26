const newTaskInput = document.getElementById('new-task');
const dueDateInput = document.getElementById('due-date');
const addTaskBtn = document.getElementById('add-btn');
const searchTasksInput = document.getElementById('search-tasks');
const filterSelect = document.getElementById('filter-select');
const deleteAllBtn = document.getElementById('delete-all-btn');
const taskListTableBody = document.querySelector('.task-list tbody');

let tasks = []; // Array to store tasks (in memory)

// Function to generate a unique ID for each task
function generateId() {
    return Math.floor(Math.random() * 1000);
}

// Function to add a new task
function addTask() {
    const taskName = newTaskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskName === '') {
        alert('Task name cannot be empty.');
        return;
    }

    const newTask = {
        id: generateId(),
        name: taskName,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(newTask);
    renderTasks(); // Re-render the table with updated tasks
    clearInputFields();
}

// Function to clear input fields
function clearInputFields() {
    newTaskInput.value = '';
    dueDateInput.value = '';
}

// Function to render tasks in the table
function renderTasks() {
    taskListTableBody.innerHTML = ''; // Clear existing rows

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.dueDate}</td>
            <td><span class="status">${task.completed ? 'Completed' : 'Pending'}</span></td>
            <td>
                <button onclick="toggleCompleteTask(${task.id})">Toggle Complete</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskListTableBody.appendChild(row);
    });
}

// Function to toggle the completion status of a task
function toggleCompleteTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks(); // Re-render to update display
    }
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks(); // Re-render the table
}

// Function to handle search functionality
function filterTasks() {
    const searchTerm = searchTasksInput.value.toLowerCase();
    const selectedFilter = filterSelect.value;

    let filteredTasks = tasks;

    if (searchTerm !== '') {
        filteredTasks = filteredTasks.filter(task => task.name.toLowerCase().includes(searchTerm));
    }

    if (selectedFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.completed === (selectedFilter === 'completed'));
    }

    // Render the filtered tasks
    taskListTableBody.innerHTML = '';
    filteredTasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.dueDate}</td>
            <td><span class="status">${task.completed ? 'Completed' : 'Pending'}</span></td>
            <td>
                <button onclick="toggleCompleteTask(${task.id})">Toggle Complete</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskListTableBody.appendChild(row);
    });
}

// Function to delete all tasks
function deleteAllTasks() {
    tasks = [];
    renderTasks();
}


// Event Listeners
addTaskBtn.addEventListener('click', addTask);
searchTasksInput.addEventListener('input', filterTasks);
filterSelect.addEventListener('change', filterTasks);
deleteAllBtn.addEventListener('click', deleteAllTasks);

// Initial rendering of tasks (if any)
renderTasks();
