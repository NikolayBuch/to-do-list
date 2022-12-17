const form =  document.querySelector('.todo-list');
const addMessege = document.querySelector('.messege');
const tasksList = document.querySelector('.tasks-list');
const filters = document.querySelectorAll('.filters span');
const clearChecked = document.querySelector('.tasks__clear');
const todoAll = document.querySelector('.todo__all');
const pending = document.querySelector('.pending')
    
let todoList = [];
let activeFilter = 'All'

const addTask = (e) => {
    e.preventDefault();
    if (addMessege.value == 0) return;
    let newTodo = {
        text: addMessege.value,
        checked: false,
        id: Date.now(),
    }
    todoList.push(newTodo);
    renderTask(todoList)
    addMessege.value = '';
    addMessege.focus();
    seveTodoList()    
};

const renderTask = (list) => {
        const renderItem = list.map((item) =>`
             <li id='${item.id}' class='task'data-action="li" >
                 <div class='task__continer'>
                     <lable class='custom-checkbox'  >
                         <input class='task__checked' onclick="updateStatus(this)" data-action="done"  type='checkbox' id='${item.id}' ${item.checked ? 'checked' : ''}  >
                         <p id=${item.id} class=${item.checked ? 'checked ' : ''}>${item.text}</p>
                     </lable>
                     <button data-action="delete" class='clouse-btn' id=''><img src='./img/close.svg' alt='close'> </button>
                 </div>
             </li>`)
         tasksList.innerHTML = renderItem.join('')
};

const deleteTask = (e) => {
    if(e.target.dataset.action !== 'delete') return;
        const parentNode = e.target.closest('.task')
        const idTask = Number(parentNode.id)
        parentNode.remove()

        const index = todoList.findIndex((todo) => todo.id === idTask);
        const deleteId = todoList.splice(index, 1)   
        seveTodoList()
};

const deleteChecked = (e) => {
    if(e.target.dataset.action !== 'deleteChecked') return;
    const checkedTask = todoList.filter(newTodo => newTodo.checked)
    for (checkedTask; checkedTask > 0; checkedTask.remove()){
        renderTask(checkedTask)
    }
    const deleteChecked = todoList.splice(checkedTask, 2)
}

const showPending = () => {
    const completedTasks = todoList.filter(newTodo => !newTodo.checked)
    const renderPeding = `<p class="p-normal"> ${completedTasks.length} items left</p>`
    pending.innerHTML = renderPeding
}

const showClearChecked = () =>{
    const checkedTask= todoList.filter(newTodo => newTodo.checked);
    if (checkedTask == 0) {
        clearChecked.classList.add('none')
    } else {
        clearChecked.classList.remove('none')
    }
}

const updateStatus = (selectedTask) => {
    let taskName = selectedTask.parentNode.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add('checked')
    }else{
        taskName.classList.remove('checked')
    }
    const task = todoList.find((task) => {
        if(task.id == taskName.id){
            return true
        }
    })
    task.checked = !task.checked
    showClearChecked()
    seveTodoList()
    showPending()
}

renderFilterItems = (filter) => {
    if (filter =='all') {
        activeFilter = 'all'
        renderTask(todoList)
    } else if (filter == 'completed') {
        activeFilter = 'completed'
        const completedTasks = todoList.filter(newTodo => {
        return newTodo.checked})
        renderTask(completedTasks)
    } else if(filter == 'pending') {
        activeFilter = 'pending'
        const pendingTasks = todoList.filter(newTodo => {
            return !newTodo.checked
        })
        renderTask(pendingTasks)
    }

}

filters.forEach((filter) => filter.addEventListener('click', () => {
    document.querySelector("span.active").classList.remove("active");
    filter.classList.add("active");
    renderFilterItems(filter.id)}
));

tasksList.addEventListener('click', deleteTask)
form.addEventListener('submit', addTask);
clearChecked.addEventListener("click", deleteChecked)

const seveTodoList = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
if(localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    renderTask(todoList);
    showClearChecked()
    showPending()
}