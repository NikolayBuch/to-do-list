const form = document.querySelector(".todo-list");
const message = document.querySelector(".message");
const tasksList = document.querySelector(".tasks-list");
const clearChecked = document.querySelector(".tasks__clear");
const pending = document.querySelector(".pending");
const checkedAll = document.querySelector(".checked-all");
const body = document.querySelector(".body");
const allTask = document.querySelector("#all");
const pendingTask = document.querySelector("#pending");
const completedTask = document.querySelector("#completed");

let todoList = [];
let activeFilter = "All";
let currChecked = true;

const addTask = (e) => {
  if (message.value.trim() === "") return;
  let newTodo = {
    text: message.value.trim(),
    checked: false,
    id: Date.now(),
  };
  todoList.push(newTodo);
  rendersItems(newTodo);
  message.value = "";
  showClearChecked();
  seveTodoList();
  showPending();
};

const rendersItems = (item) => {
  const render = `
				  <li id='${item.id}' class='task ${item.checked ? "checkeds " : "pending"}' >
					  <div class='task__continer' >
						  <lable class='custom-checkbox'  >
							  <input class='task__checked' onclick="updateStatus(this)" type='checkbox' id='${
                  item.id
                }' ${item.checked ? "checked" : ""}  >
							  <p ondblclick="editTask(this)" id=${item.id} class='p-normal text-task ${
    item.checked ? "checked " : ""
  }' >${item.text}</p>
						  </lable>
						  <button onclick="deleteTask(this)" class='clouse-btn' ><img src='./img/close.svg' alt='close'> </button>
					  </div>
				  </li>`;

  tasksList.insertAdjacentHTML("beforeend", render);
};
renderFilter = (filter) => {
  if (filter === "all") {
    activeFilter = "all";
    tasksList.innerHTML = "";
    todoList.forEach((elem) => rendersItems(elem));
  } else if (filter === "completed") {
    activeFilter = "completed";
    tasksList.innerHTML = "";
    const completedTasks = todoList.filter((newTodo) => newTodo.checked);
    completedTasks.forEach((elem) => rendersItems(elem));
  } else if (filter === "pending") {
    activeFilter = "pending";
    tasksList.innerHTML = "";
    const pendingTasks = todoList.filter((newTodo) => !newTodo.checked);
    pendingTasks.forEach((elem) => rendersItems(elem));
  }
};

const editTask = (elem) => {
  const parentNode = elem.closest(".task");
  const idParentNode = Number(parentNode.id);
  const boxTask = elem.closest(".task__continer");
  const lableTask = elem.closest(".custom-checkbox");
  const buttonTask = parentNode.querySelector(".clouse-btn");
  const task = todoList.findIndex((elem) => elem.id === idParentNode);
  const taskText = todoList.find((elem) => elem.id === idParentNode);
  lableTask.classList.add("hide");
  buttonTask.classList.add("hide");
  const renderInput = `<input type="text" class="p-normal edit">`;
  boxTask.insertAdjacentHTML("beforeend", renderInput);
  const render = parentNode.querySelector(".edit");
  render.value = taskText.text;
  render.focus();
  render.onblur = () => {
    elem.innerHTML = render.value;
    taskText.text = render.value;
    if (render.value.trim() === "") {
      render.remove();
      parentNode.remove();
      todoList.splice(task, 1);
    }
    lableTask.classList.remove("hide");
    buttonTask.classList.remove("hide");
    render.remove();
    showClearChecked();
    showPending();
    seveTodoList();
  };
  render.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      render.blur();
    } else if (e.key === "Escape") {
      render.value = taskText.text;
      elem.innerHTML = taskText.text;
      lableTask.classList.remove("hide");
      buttonTask.classList.remove("hide");
      render.blur();
      render.remove();
    }
  });
};

const checkedAllTodo = () => {
  todoList.forEach((task) => {
    task.checked = currChecked;
  });
  currChecked = !currChecked;
  showPending();
  showClearChecked();
  seveTodoList();
};

const deleteTask = (elem) => {
  const parentNode = elem.closest(".task");
  const idTask = Number(parentNode.id);
  todoList = todoList.filter((elem) => elem.id !== idTask);
  showClearChecked();
  seveTodoList();
  showPending();
};

const deleteChecked = () => {
  const taskChecked = tasksList.querySelectorAll(".checkeds");
  for (let i = 0; i < taskChecked.length; i++) {
    const index = Number(taskChecked[i].id);
    todoList = todoList.filter((elem) => elem.id !== index);
  }
  seveTodoList();
  showClearChecked();
};

const showPending = () => {
  const pendingTasks = todoList.filter((newTodo) => !newTodo.checked);
  const renderPeding = `<p class="p-normal"> ${pendingTasks.length} items left</p>`;
  pending.innerHTML = renderPeding;
};

const showClearChecked = () => {
  const completedTasks = todoList.filter((newTodo) => newTodo.checked);
  if (completedTasks === 0) {
    clearChecked.classList.add("hide");
  } else {
    clearChecked.classList.remove("hide");
  }
};

const updateStatus = (elem) => {
  const parentNode = elem.closest(".task");
  const taskName = parentNode.querySelector(".text-task");
  const idTaskName = Number(taskName.id);
  if (elem.checked) {
    taskName.classList.add("checked");
  } else {
    taskName.classList.remove("checked");
  }
  const task = todoList.find((elem) => elem.id === idTaskName);
  task.checked = !task.checked;
  showClearChecked();
  seveTodoList();
  showPending();
};

const filterActive = (filter) => {
  const activeFilter = document.querySelector("button.active");
  activeFilter.classList.remove("active");
  renderFilter(filter);
  localStorage.setItem("filter", filter);
};

allTask.addEventListener("click", (e) => {
  filterActive(allTask.id);
  e.target.classList.add("active");
});
pendingTask.addEventListener("click", (e) => {
  filterActive(pendingTask.id);
  e.target.classList.add("active");
});
completedTask.addEventListener("click", (e) => {
  filterActive(completedTask.id);
  e.target.classList.add("active");
});

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

const seveTodoList = (list) => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderFilter(activeFilter);
};
if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList.forEach((task) => rendersItems(task));
  showClearChecked();
  showPending();
  renderFilter(activeFilter);
}

if (localStorage.getItem("filter")) {
  activeFilter = localStorage.getItem("filter");
  document.querySelector(".active").classList.remove("active");
  document.getElementById(activeFilter).classList.add("active");

  if (activeFilter === "all") {
    activeFilter = "all";
    tasksList.innerHTML = "";
    todoList.forEach((elem) => rendersItems(elem));
  } else if (activeFilter === "pending") {
    activeFilter = "pending";
    tasksList.innerHTML = "";
    const pendingTasks = todoList.filter((newTodo) => !newTodo.checked);
    pendingTasks.forEach((elem) => rendersItems(elem));
  } else if (activeFilter === "completed") {
    activeFilter = "completed";
    tasksList.innerHTML = "";
    const completedTasks = todoList.filter((newTodo) => newTodo.checked);
    completedTasks.forEach((elem) => rendersItems(elem));
  }
}
