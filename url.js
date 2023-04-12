const title = document.getElementById("task");
async function getTask(id) {
  const response = await fetch("http://localhost:3000/task/" + id, {
    method: "GET",
    credentials: "include",
  });
  const task = await response.json();
  title.innerText = task.title;
}
const queryParams = new URLSearchParams(window.location.search);
getTask(queryParams.get("id"));