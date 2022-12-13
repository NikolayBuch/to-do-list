const form =  document.querySelector('.todo-list');
const addMessege = document.querySelector('.messege');
const addButton = document.querySelector('.add-btn');
const tasksList = document.querySelector('.tasks-list');
const filters = document.querySelectorAll('.filters span');
const body = document.querySelector('.body');
const clearChecked = document.querySelector('.tasks__clear');
const todoAll = document.querySelector('.todo__all');
    
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
                         <input class='task__checked' data-action="done"  type='checkbox' id='${item.id}' ${item.checked ? 'checked' : ''}  ><p id=${item.id} class=${item.checked ? 'task__messeg task__messeg_checked' : 'task__messeg'}>${item.text}</p>
                     </lable>
                     <button data-action="delete" class='clouse-btn' id=''><img src='./img/close.svg' alt='close'> </button>
                 </div>
             </li>`)
         tasksList.innerHTML = renderItem.join('')
};

const counterTodo = () => {
    const valCounterTodo = todoList.length;
    console.loge(valCounterTodo)
}

const deleteTask = (e) => {
    if(e.target.dataset.action !== 'delete') return;
        const parentNode = e.target.closest('.task')
        const idTask = Number(parentNode.id)
        parentNode.remove()

        const index = todoList.findIndex((todo) => todo.id === idTask);
        const deleteId = todoList.splice(index, 1)   

        seveTodoList()
};

const doneTask = (e) => {

    if(e.target.dataset.action !== 'done') return;
        const parentNode = e.target.closest('.task');
        const idTask = Number(parentNode.id)

        const task = todoList.find((task) => {
            if (task.id == idTask){
                return true;
            }
        });
        task.checked = !task.checked;
        const taskTatle = parentNode.querySelector('.task__messeg').classList.toggle('task__messeg_checked');
        const showClearChecked = todoList.filter(newTodo => newTodo.checked);
        if (showClearChecked == 0) {
            clearChecked.classList.add('none')
        } else {
            clearChecked.classList.remove('none')
        }
        seveTodoList()
        
  
};

const renderFilterItems = (filter) => {
    switch (filter) {
        case 'all':
            activeFilter = 'all';
            renderTask(todoList);
            break;
        case 'completed':
            activeFilter = 'completed';
            const completedTasks = todoList.filter(newTodo => newTodo.checked);
            renderTask(completedTasks);
            break;
        case 'pending':
            activeFilter = 'pending';
            const pendingTasks = todoList.filter(newTodo => !newTodo.checked);
            renderTask(pendingTasks);
            break;
        default:
            renderTask(todoList);
    };
};

filters.forEach((filter) => filter.addEventListener('click', () => {
    document.querySelector("span.active").classList.remove("active");
    filter.classList.add("active");
    renderFilterItems(filter.id)
}
));

tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)
form.addEventListener('submit', addTask);
// body.addEventListener('click', addTask)

const seveTodoList = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
if(localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    renderTask(todoList);
}
