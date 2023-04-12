const tasksElement = document.getElementById("tasks");
const inputTaskElement = document.getElementById("inputTask");

async function getTasks() {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "GET"
  });
  const json = await response.json();

  renderTasks(json);
}

async function addTask() {
  const title = inputTaskElement.value;

  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      title: title
    })
  });

  inputTaskElement.value = "";
  getTasks();
}

async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    });

    getTasks();
}

async function editTask(id) {
    const newTitle = prompt("Wie soll der Task lauten?");
    const response = await fetch(`http://localhost:3000/tasks`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            id: id, 
            title: newTitle
        })
    });
    getTasks();
}

function renderTasks(tasks) {
  tasksElement.innerHTML = "";

  tasks.forEach(function (item) {
    const liElement = document.createElement("li");
    liElement.innerText = item.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "Delete-Edit"
    deleteButton.id = "deleteButton"
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
        deleteTask(item.id);
    };

    const editButton = document.createElement("button");
    editButton.className = "Delete-Edit"
    editButton.id = "editButton"
    editButton.innerText = "edit";
    editButton.onclick = function () {
        editTask(item.id);
    };

    liElement.append(deleteButton);
    liElement.append(editButton);
    tasksElement.append(liElement);
  });
}

document.getElementById("addTaskButton").addEventListener("click", addTask);
getTasks();
