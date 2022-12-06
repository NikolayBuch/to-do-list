const form =  document.querySelector('.todo-list');
const addMessege = document.querySelector('.messege');
const addButton = document.querySelector('.add-btn');
const tasksList = document.querySelector('.tasks-list');
const filters = document.querySelectorAll('.filters span');
const body = document.querySelector('.body');
const clearChecked = document.querySelector('.tasks__clear');
    

let todoList = [];

let activeFilter = 'All'


const addTask = (e) => {
    e.preventDefault();

    let newTodo = {
        text: addMessege.value,
        checked: false,
        important: false,
        id: todoList.length + 1,
    }
    todoList.push(newTodo);

    renderTask(todoList)

    addMessege.value = '';
    addMessege.focus();
};

const renderTask = (list) => {

    const renderItem = list.map((item) =>`
             <li id='${item.id}' class='task'>
                 <div class='task__continer'>
                     <lable class='custom-checkbox'  >
                         <input class='task__checked' data-action="done"  type='checkbox' id='${item.id}' ${item.checked &&'checked'} ><p id=${item.id} class='${item.checked ? 'task__messeg_checked' : 'task__messeg'}' >${item.text}</p>
                     </lable>
                     <button data-action="delete" class='clouse-btn' id=''><img src='./img/close.svg' alt='close'> </button>
                 </div>
             </li>`)
         tasksList.innerHTML = renderItem.join('')

         let checkTask = tasksList.querySelectorAll('.task__checked');
         if (checkTask.checked) {
            clearChecked.classList.remove('none')
         } else {
            clearChecked.classList.add('none')}

            console.log(checkTask)
}

const deleteTask = (e) => {
    if(e.target.dataset.action !== 'delete') return;
        const parentNode = e.target.closest('.task')
        const idTask = parentNode.id
        parentNode.remove()

        const index = todoList.findIndex((todo) => todo.id === idTask);
        todoList.splice(index, 1)   
};

const doneTask = (e) => {

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
    renderFilterItems()
}
));

// function filterClick(e){
//    if(e.target.dataset === 'completed'){
//     const completedTasks = todoList.filter(newTodo => newTodo.checked)
//     renderTask(completedTasks)
//    } else if (e.target.dataset === 'pending'){
//     const pendingTasks = todoList.filter(newTodo => !newTodo.checked)
//     renderTask (pendingTasks);
//    } else {
//     renderTask (todoList)
//    }
// }

const clearAllChecked = () => {
    todoList.forEach((item) => {
    if (item.checked = true) {
        clearChecked.remove("none")
    }
    })}

addButton.addEventListener('click', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)