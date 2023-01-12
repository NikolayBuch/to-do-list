const form =  document.querySelector('.todo-list');
const addMessege = document.querySelector('.messege');
const tasksList = document.querySelector('.tasks-list');
const filters = document.querySelectorAll('.filters span');
const clearChecked = document.querySelector('.tasks__clear');
const pending = document.querySelector('.pending');
const checkedAll = document.querySelector('.checked-all');
const body = document.querySelector('.body');
    
let todoList = [];
let activeFilter = 'All'


const addTask = (e) => {
    if (addMessege.value.trim() === '') return;
    let newTodo = {
        text: addMessege.value.trim(),
        checked: false,
        id: Date.now(),
    }
    todoList.push(newTodo);
    renderTask(todoList)
    addMessege.value = '';
    showClearChecked();
    seveTodoList();
    showPending();
};

const renderTask = (list) => {
        const renderItem = list.map((item) => `
             <li id='${item.id}' class='task ${item.checked ? 'checkeds ' : ''}' >
                 <div class='task__continer' >
                     <lable class='custom-checkbox'  >
                         <input class='task__checked' onclick="updateStatus(this)" type='checkbox' id='${item.id}' ${item.checked ? 'checked' : ''}  >
                         <p ondblclick="edit(this)" id=${item.id} class='p-normal ${item.checked ? 'checked ' : ''}' >${item.text}</p>
                     </lable>
                     <button data-action="delete" class='clouse-btn' ><img src='./img/close.svg' alt='close'> </button>
                 </div>
             </li>`)
         tasksList.innerHTML = renderItem.join('')
};

const edit = (edit) => {
    const parentNode = edit.closest('.task');
    const boxTask = edit.closest('.task__continer');
    const lableTask = edit.parentNode;
    const buttonTask = boxTask.lastElementChild;
    const task = todoList.findIndex((task) => task.id == parentNode.id);
    const taskText = todoList.find((task) => task.id == parentNode.id );
    lableTask.classList.add('none');
    buttonTask.classList.add('none');
    const renderInput = `<input type="text" class="p-normal edit">`;
    boxTask.insertAdjacentHTML('beforeend', renderInput);
    let render = parentNode.querySelector('.edit');
    render.value = taskText.text;
    render.focus();
    render.onblur = () => {
        edit.innerHTML = render.value
        taskText.text = render.value
        if (render.value === ''){
            render.remove()
            parentNode.remove()
            const deleteId = todoList.splice(task, 1)  
        };
        lableTask.classList.remove('none');
        buttonTask.classList.remove('none');
        render.remove();
        showClearChecked();
        showPending();
        seveTodoList();
    };
    render.addEventListener('keyup', (e) =>{
        if (e.key == 'Enter') {
            render.blur()
    } else if (e.key === 'Escape') {
        render.value = taskText.text
        edit.innerHTML = taskText.text
        lableTask.classList.remove('none');
        buttonTask.classList.remove('none');
        render.blur();
        render.remove();
    }});
};
const checkedAllTodo = () => {
    let checkedTodo = tasksList.getElementsByTagName('input');
    const parentNode = tasksList.getElementsByTagName('li');
    const taskName = tasksList.getElementsByTagName('p');
    const completedTasks = todoList.filter(newTodo => newTodo.checked);
    for (let i=0; i<checkedTodo.length; i++) {
        if (completedTasks.length == checkedTodo.length){
            checkedTodo[i].checked = false;
            taskName[i].classList.remove('checked');
            parentNode[i].classList.remove('checkeds');
            const task = todoList.find((task) => task.id == parentNode[i].id);
            task.checked = !task.checked
            showPending();
            clearChecked.classList.remove('none');
        } else if (checkedTodo[i].checked == false){
            checkedTodo[i].checked = true;
            taskName[i].classList.add('checked');
            parentNode[i].classList.add('checkeds');
            const task = todoList.find((task) => task.id == parentNode[i].id);
            task.checked = !task.checked
            showPending();
            }
        };
        showClearChecked();
        seveTodoList();
};

const deleteTask = (e) => {
    if(e.target.dataset.action !== 'delete') return;
        const parentNode = e.target.closest('.task');
        const idTask = Number(parentNode.id);
        parentNode.remove();

        const index = todoList.findIndex((todo) => todo.id === idTask);
        const deleteId = todoList.splice(index, 1);
        showClearChecked();
        seveTodoList();
        showPending();
};

const deleteChecked = (e) => {
    if(e.target.dataset.action !== 'deleteChecked') return;
    const completedTasks = todoList.filter(newTodo => newTodo.checked);
    const taskChecked = tasksList.querySelectorAll('.checkeds');
    for (let i=0; i < completedTasks.length; i++) {
        const index = todoList.findIndex((todo) => todo.id == completedTasks[i].id);
        taskChecked[i].remove();
        todoList.splice(index, 1);
    };
     seveTodoList();
     showClearChecked();
};

const showPending = () => {
    const pendingTasks = todoList.filter(newTodo => !newTodo.checked);
    const renderPeding = `<p class="p-normal"> ${pendingTasks.length} items left</p>`;
    pending.innerHTML = renderPeding
};

const showClearChecked = () =>{
    const completedTasks = todoList.filter(newTodo => newTodo.checked);
    if (completedTasks == 0) {
        clearChecked.classList.add('none');
    } else {
        clearChecked.classList.remove('none');
    };
};

const updateStatus = (selectedTask) => {
    let taskName = selectedTask.parentNode.lastElementChild;
    const parentNode = taskName.closest('.task');
    if(selectedTask.checked) {
        taskName.classList.add('checked');
        parentNode.classList.add('checkeds');
    }else{
        taskName.classList.remove('checked');
        parentNode.classList.remove('checkeds');
    };
    const task = todoList.find((task) => task.id == taskName.id);
    task.checked = !task.checked
    showClearChecked();
    seveTodoList();
    showPending();
}

renderFilterItems = (filter) => {
    if (filter =='all') {
        activeFilter = 'all'
        renderTask(todoList);
    } else if (filter == 'completed') {
        activeFilter = 'completed'
        const completedTasks = todoList.filter(newTodo => newTodo.checked);
        renderTask(completedTasks);
    } else if(filter == 'pending') {
        activeFilter = 'pending'
        const pendingTasks = todoList.filter(newTodo => !newTodo.checked);
        renderTask(pendingTasks);
    }

}

filters.forEach((filter) => filter.addEventListener('click', () => {
    document.querySelector("span.active").classList.remove("active");
    filter.classList.add("active");
    renderFilterItems(filter.id)}
));

tasksList.addEventListener('click', deleteTask)
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    addTask();
    addMessege.focus();
});
clearChecked.addEventListener('click', deleteChecked);
checkedAll.addEventListener('click', checkedAllTodo);
body.addEventListener('click', (e) => {
    if(e.target === addMessege) return;
    addTask()
});


const seveTodoList = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
    renderFilterItems(activeFilter);
};
if(localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    renderTask(todoList);
    showPending();
    renderFilterItems(activeFilter)
    
};




