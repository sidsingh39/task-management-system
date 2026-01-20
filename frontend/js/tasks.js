const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const logoutBtn = document.getElementById("logoutBtn");

// LOGOUT
logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

// FETCH TASKS
async function fetchTasks() {
  const data = await apiFetch("/tasks");
  taskList.innerHTML = "";

  data.tasks.forEach((task) => {
   const li = document.createElement("li");
li.className = "task-card";

li.innerHTML = `
  <div class="task-left">
    <h3>${task.title}</h3>
    <p>${task.description || "No description"}</p>
    <span class="${task.completed ? "status-done" : "status-pending"}">
      ${task.completed ? "Completed" : "Pending"}
    </span>
  </div>

  <div class="task-actions">
    <button class="btn-gold" onclick="toggleTask('${task.id}')">
      ${task.completed ? "Undo" : "Complete"}
    </button>
    <button class="btn-delete" onclick="deleteTask('${task.id}')">
      Delete
    </button>
  </div>
`;

    taskList.appendChild(li);
  });
}

// CREATE TASK
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ title, description })
  });

  taskForm.reset();
  fetchTasks();
});

// TOGGLE TASK
async function toggleTask(id) {
  await apiFetch(`/tasks/${id}/toggle`, {
    method: "PATCH"
  });
  fetchTasks();
}

// DELETE TASK
async function deleteTask(id) {
  await apiFetch(`/tasks/${id}`, {
    method: "DELETE"
  });
  fetchTasks();
}

// INITIAL LOAD
fetchTasks();
