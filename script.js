const form =  document.querySelector('.todo-list')
    addMessege = document.querySelector('.messege'),
    addButton = document.querySelector('.add-btn'),
    tasksList = document.querySelector('.tasks-list'),
    filters = document.querySelector('.filters span'),
    body = document.querySelector('.body');
    clearChecked = document.querySelector('.tasks__clear')
    

let todoList = [];

let activeFilter = 'All'

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)




function addTask(e){
    e.preventDefault();

    const taskText = addMessege.value;

    let newTodo = {
        text: taskText,
        checked: false,
        important: false,
        id: todoList.length + 1,
    }
    todoList.push(newTodo);

    const styleCss = newTodo.checked ? 'task__messege_checked' : 'task__messeg';

    const displayTask = `
             <li id='${newTodo.id}' class='task'>
                 <div class='task__continer'>
                     <lable class='custom-checkbox'  >
                         <input class='task__checked' data-action="done"  type='checkbox' id='${newTodo.id}' ${newTodo.checked &&'checked'} ><p id=${newTodo.id} class=${styleCss}>${newTodo.text}</p>
                     </lable>
                     <button data-action="delete" class='clouse-btn' id=''><img src='./img/close.svg' alt='close'> </button>
                 </div>
             </li>
             `;
    tasksList.insertAdjacentHTML('beforeend', displayTask);

    addMessege.value = '';
    addMessege.focus();

    
newTodo.checked
    ? clearChecked.classList.remove('none')
    : clearChecked.classList.add('none')

    if (newTodo.checked === true) {
        clearChecked.classList.remove('none')
    }
        
};

function deleteTask(e){
    if(e.target.dataset.action !== 'delete') return;
        const parentNode = e.target.closest('.task')
        const idTask = parentNode.id
        parentNode.remove()

        const index = todoList.findIndex((todo) => todo.id === idTask);
        todoList.splice(index, 1)

        // todoList = todoList.filter((todo) => todo.id !== idTask)    
};

function doneTask(e){

    if(e.target.dataset.action !== 'done') return;
        const parentNode = e.target.closest('.task');

        const taskChecked = parentNode.querySelector('.task__checked')
        const idTask = parentNode.id
        const idChek = taskChecked.id

        const task = todoList.find(function(task) {
            if (task.id == idTask){
                return true;
            }
        });
        task.checked = !task.checked;

        
        const taskTatle = parentNode.querySelector('.task__messeg');
        taskTatle.classList.toggle('task__messeg_checked');
        
  
};
const clearBtn = (todoList) =>{
    if (todoList.checked === true){
        clearChecked.classList.remove('none')
    };
}
console.log(clearChecked)

const renderFilterItems = (filter) => {
    switch (filters) {
        case 'all':
            activeFilter = 'all';
            render(todoList);
            break;
        case 'completed':
            activeFilter = 'completed';
            const completedTasks = todoList.filter(todoList => todoList.checked);
            render(completedTasks);
            break;
        case 'pending':
            activeFilter = 'pending';
            const pendingTasks = todoList.filter(todoList => !todoList.checked);
            render(pendingTasks);
            break;
        default:
            render(todoList);
    };
};

filters.forEach((filter) => filter.addEventListener('click', () => {
    document.querySelector("span.active").classList.remove("active");
    filter.classList.add("active");
    renderFilterItems(filter.id);
}
));

