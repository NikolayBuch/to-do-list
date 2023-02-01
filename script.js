const form = document.querySelector(".todo-list");
const message = document.querySelector(".message");
const tasksList = document.querySelector(".tasks-list");
const clearChecked = document.querySelector(".tasks__clear");
const checkedAll = document.querySelector(".checked-all");
const body = document.querySelector(".body");
const allTask = document.querySelector("#all");
const pendingTask = document.querySelector("#pending");
const completedTask = document.querySelector("#completed");

let todoList = [];
let activeFilter = "All";

const addTask = () => {
  if (message.value.trim() === "") return;
  let newTodo = {
    text: message.value.trim(),
    checked: false,
    id: Date.now(),
  };
  rendersItems(newTodo);

  todoList.push(newTodo);
  message.value = "";
  showClearChecked();
  saveTodoList();
  showPending();
  renderFilter(activeFilter);
};

const rendersItems = (item) => {
  const render = `
				  <li id='${item.id}' class='task ' >
					  <div class='task__container' >
						  <label class='custom-checkbox'  >
							  <input class='task__checked' onclick="updateStatus(this)" type='checkbox' id='${
                  item.id
                }' ${item.checked ? "checked" : ""}><span></span>
							</label>
						  <p ondblclick="editTask(this)" id=${item.id} class='p-normal text-task ${
    item.checked ? "checked " : ""
  }' >${item.text}</p>
						  <button onclick="deleteTask(this)" class='close-btn' ><img src='./img/close.svg' alt='close'> </button>
					  </div>
				  </li>`;

  tasksList.insertAdjacentHTML("beforeend", render);
};
const renderFilter = (filter) => {
  activeFilter = filter;
  tasksList.innerHTML = "";
  switch (filter) {
    case "all":
      todoList.forEach((elem) => rendersItems(elem));
      break;
    case "completed":
      const completedTasks = todoList.filter((newTodo) => newTodo.checked);
      completedTasks.forEach((elem) => rendersItems(elem));
      break;
    case "pending":
      const pendingTasks = todoList.filter((newTodo) => !newTodo.checked);
      pendingTasks.forEach((elem) => rendersItems(elem));
      break;
    default:
      todoList.forEach((elem) => rendersItems(elem));
  }
};

const editTask = (elem) => {
  const parentNode = elem.closest(".task");
  const idParentNode = Number(parentNode.id);
  const boxTask = elem.closest(".task__container");
  const task = todoList.findIndex((elem) => elem.id === idParentNode);
  const taskText = todoList.find((elem) => elem.id === idParentNode);
  boxTask.classList.add("hide");
  const renderInput = `<input type="text" class="p-normal edit">`;
  parentNode.insertAdjacentHTML("beforeend", renderInput);
  const render = parentNode.querySelector(".edit");
  render.value = taskText.text;
  render.focus();
  const editThisTask = () => {
    elem.innerHTML = render.value;
    taskText.text = render.value;
    if (render.value.trim() === "") {
      parentNode.remove();
      todoList.splice(task, 1);
    }
    parentNode.classList.remove("hide");
    render.remove();
    showClearChecked();
    showPending();
    saveTodoList();
  };
  render.addEventListener("blur", editThisTask);
  render.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      render.blur();
    } else if (e.key === "Escape") {
      render.value = taskText.text;
      elem.innerHTML = taskText.text;
      parentNode.classList.remove("hide");
      render.blur();
      render.remove();
    }
  });
};

const checkedAllTodo = () => {
  const isChecked =
    todoList.filter((elem) => !!elem.checked).length === todoList.length;
  todoList.forEach((elem) => (elem.checked = !isChecked));
  showPending();
  showClearChecked();
  saveTodoList();
};

const deleteTask = (elem) => {
  const parentNode = elem.closest(".task");
  const idTask = Number(parentNode.id);
  todoList = todoList.filter((elem) => elem.id !== idTask);
  showClearChecked();
  saveTodoList();
  showPending();
};

const deleteChecked = () => {
  const pendingTasks = todoList.filter((newTodo) => !newTodo.checked);
  todoList = pendingTasks;
  saveTodoList();
  showClearChecked();
};

const showPending = () => {
  const counter = document.querySelector(".counter");
  const pendingTasks = todoList.filter((newTodo) => !newTodo.checked);
  counter.innerHTML = pendingTasks.length;
};

const showClearChecked = () => {
  const completedTasks = todoList.filter((newTodo) => newTodo.checked);
  if (completedTasks.length === 0) {
    clearChecked.classList.add("hide");
  } else {
    clearChecked.classList.remove("hide");
  }
};

const updateStatus = (elem) => {
  const parentNode = elem.closest(".task");
  const taskName = Number(parentNode.querySelector(".text-task").id);
  const task = todoList.find((elem) => elem.id === taskName);
  task.checked = !task.checked;
  showClearChecked();
  saveTodoList();
  showPending();
};

const filterActive = (filter) => {
  const activeFilterBtn = document.querySelector("button.active");
  activeFilterBtn.classList.remove("active");
  renderFilter(filter);
  localStorage.setItem("filter", filter);
};

const handleUpdateFilter = (e) => {
  filterActive(e.target.id);
  e.target.classList.add("active");
};

allTask.addEventListener("click", handleUpdateFilter);
pendingTask.addEventListener("click", handleUpdateFilter);
completedTask.addEventListener("click", handleUpdateFilter);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
  message.focus();
});
checkedAll.addEventListener("click", checkedAllTodo);
body.addEventListener("click", (e) => {
  if (e.target === message) return;
  addTask();
});
clearChecked.addEventListener("click", deleteChecked);

const saveTodoList = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderFilter(activeFilter);
};
if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList.forEach((task) => rendersItems(task));
  if (localStorage.getItem("filter")) {
    activeFilter = localStorage.getItem("filter");
    document.querySelector(".active").classList.remove("active");
    document.getElementById(activeFilter).classList.add("active");
  }
  showClearChecked();
  showPending();
}
