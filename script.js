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
							  <p ondblclick="editTask(this)" id=${item.id} class='p-normal ${
    item.checked ? "checked " : ""
  }' >${item.text}</p>
						  </lable>
						  <button onclick="deleteTask(this)" class='clouse-btn' ><img src='./img/close.svg' alt='close'> </button>
					  </div>
				  </li>`;

  tasksList.insertAdjacentHTML("beforeend", render);
};

const editTask = (elem) => {
  const parentNode = elem.closest(".task");
  const idParentNode = Number(parentNode.id);
  const boxTask = elem.closest(".task__continer");
  const lableTask = elem.parentNode;
  const buttonTask = boxTask.lastElementChild;
  const task = todoList.findIndex((task) => task.id === idParentNode);
  const taskText = todoList.find((task) => task.id === idParentNode);
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
      const deleteId = todoList.splice(task, 1);
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
  const checkedTodo = tasksList.getElementsByTagName("input");
  const parentNode = tasksList.getElementsByTagName("li");
  const taskName = tasksList.getElementsByTagName("p");
  const completedTasks = todoList.filter((newTodo) => newTodo.checked);
  for (let i = 0; i < checkedTodo.length; i++) {
    if (completedTasks.length === checkedTodo.length) {
      checkedTodo[i].checked = false;
      taskName[i].classList.remove("checked");
      parentNode[i].classList.remove("checkeds");
      const task = todoList.find((task) => task.id == parentNode[i].id);
      task.checked = !task.checked;
      showPending();
      clearChecked.classList.remove("hide");
    } else if (checkedTodo[i].checked == false) {
      checkedTodo[i].checked = true;
      taskName[i].classList.add("checked");
      parentNode[i].classList.add("checkeds");
      const task = todoList.find((task) => task.id == parentNode[i].id);
      task.checked = !task.checked;
      showPending();
    }
  }
  showClearChecked();
  seveTodoList();
};

const deleteTask = (elem) => {
  const parentNode = elem.closest(".task");
  const idTask = Number(parentNode.id);
  parentNode.remove();
  const index = todoList.findIndex((todo) => todo.id === idTask);
  const deleteId = todoList.splice(index, 1);
  showClearChecked();
  seveTodoList();
  showPending();
};

const deleteChecked = () => {
  const completedTasks = todoList.filter((newTodo) => newTodo.checked);
  const taskChecked = tasksList.querySelectorAll(".checkeds");
  for (let i = 0; i < completedTasks.length; i++) {
    const index = todoList.findIndex(
      (todo) => todo.id === completedTasks[i].id
    );
    taskChecked[i].remove();
    todoList.splice(index, 1);
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

const updateStatus = (selectedTask) => {
  const taskName = selectedTask.parentNode.lastElementChild;
  const idTaskName = Number(taskName.id);
  const parentNode = taskName.closest(".task");
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    parentNode.classList.add("checkeds");
    parentNode.classList.remove("pending");
  } else {
    taskName.classList.remove("checked");
    parentNode.classList.remove("checkeds");
    parentNode.classList.add("pending");
  }
  const task = todoList.find((task) => task.id === idTaskName);
  task.checked = !task.checked;
  showClearChecked();
  seveTodoList();
  showPending();
};

renderFilterItems = (filter) => {
  const render = tasksList.querySelectorAll(".task");
  if (filter === "all") {
    activeFilter = "all";
    render.forEach((elem) => elem.classList.remove("hide"));
  } else if (filter === "completed") {
    activeFilter = "completed";
    render.forEach((elem) => {
      elem.classList.remove("hide");
      if (!elem.classList.contains("checkeds")) {
        elem.classList.add("hide");
      }
    });
  } else if (filter === "pending") {
    activeFilter = "pending";
    render.forEach((elem) => {
      elem.classList.remove("hide");
      if (!elem.classList.contains("pending")) {
        elem.classList.add("hide");
      }
    });
  }
};

const filterActive = (filter) => {
  const activeFilter = document.querySelector("button.active");
  activeFilter.classList.remove("active");
  renderFilterItems(filter);
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

const seveTodoList = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderFilterItems(activeFilter);
};
if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList.forEach((task) => rendersItems(task));
  showClearChecked();
  showPending();
  renderFilterItems(activeFilter);
}

if (localStorage.getItem("filter")) {
  activeFilter = localStorage.getItem("filter");
  document.querySelector(".active").classList.remove("active");
  document.getElementById(activeFilter).classList.add("active");
  const render = tasksList.querySelectorAll(".task");

  if (activeFilter === "all") {
    activeFilter = "all";
    render.forEach((elem) => elem.classList.remove("hide"));
  } else if (activeFilter === "pending") {
    activeFilter = "pending";
    render.forEach((elem) => {
      elem.classList.remove("hide");
      if (!elem.classList.contains("pending")) {
        elem.classList.add("hide");
      }
    });
  } else if (activeFilter === "completed") {
    activeFilter = "completed";
    render.forEach((elem) => {
      elem.classList.remove("hide");
      if (!elem.classList.contains("checkeds")) {
        elem.classList.add("hide");
      }
    });
  }
}
