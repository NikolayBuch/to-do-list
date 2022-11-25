const form =  document.querySelector('.todo-list')
    addMessege = document.querySelector('.messege'),
    addButton = document.querySelector('.add-btn'),
    tasksList = document.querySelector('.tasks-list'),
    filters = document.querySelector('.filters span');
    

let todoList = [];


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

    const styleCss = newTodo.checked ? 'todo__messege_checked' : '';

    const displayTask = `
             <li id='${newTodo.id}' class='task'>
                 <div class='task__continer'>
                     <lable class='custom-checkbox'  >
                         <input data-action="done"  type='checkbox' id='${newTodo.id}' ${newTodo.checked && 'checked'} ><p class='task__messeg'>${newTodo.text}</p>
                     </lable>
                     <button data-action="delete" class='clouse-btn' id=''><img src='./img/close.svg' alt='close'> </button>
                 </div>
             </li>
             `;
    tasksList.insertAdjacentHTML('beforeend', displayTask);

    addMessege.value = '';
    addMessege.focus();
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

    if(e.target.dataset.action === 'done') return;
        const parentNode = e.target.closest('.task');
        const taskTatle = parentNode.querySelector('.task__messeg');
        taskTatle.classlist.toggle('task__messeg_checked');
        console.log(e.target)
        
    console.log(taskTatle)
  
}
