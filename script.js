const form =  document.querySelector('.todo-list');
const addMessege = document.querySelector('.messege');
const tasksList = document.querySelector('.tasks-list');
const filters = document.querySelectorAll('.filters span');
const clearChecked = document.querySelector('.tasks__clear');
const todoAll = document.querySelector('.todo__all');
const pending = document.querySelector('.pending');
const checkedAll = document.querySelector('.checked-all');
const body = document.querySelector('.body');
    
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
    showClearChecked()
    seveTodoList()
    showPending()  
    checkedAllTodo
    
};

const renderTask = (list) => {
        const renderItem = list.map((item) =>`
             <li id='${item.id}' class='task ${item.checked ? 'checkeds ' : ''}' data-action="li" >
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

const checkedAllTodo = () => {
    let checkedTodo = tasksList.getElementsByTagName('input')
    const parentNode = tasksList.getElementsByTagName('li')
    const taskName = tasksList.getElementsByTagName('p')
    completedTasks = todoList.filter(newTodo => newTodo.checked)
    for (let i=0; i<checkedTodo.length; i++) {
        if (completedTasks.length == checkedTodo.length){
            checkedTodo[i].checked = false;
            taskName[i].classList.remove('checked')
            parentNode[i].classList.remove('checkeds')
            const task = todoList.find((task) => {
                if(task.id == parentNode[i].id){
                    return true
                }
            })
            task.checked = !task.checked
            showPending()
            clearChecked.classList.remove('none')
            

        } else if (checkedTodo[i].checked == false){
            checkedTodo[i].checked = true;
            taskName[i].classList.add('checked')
            parentNode[i].classList.add('checkeds')
            const task = todoList.find((task) => {
                if(task.id == parentNode[i].id){
                    return true
                }
            })
            task.checked = !task.checked
            showPending()
            }
        }
        showClearChecked()
        seveTodoList()
}

const deleteTask = (e) => {
    if(e.target.dataset.action !== 'delete') return;
        const parentNode = e.target.closest('.task')
        const idTask = Number(parentNode.id)
        parentNode.remove()

        const index = todoList.findIndex((todo) => todo.id === idTask);
        const deleteId = todoList.splice(index, 1)   
        showClearChecked()
        seveTodoList()
        showPending()
};

const deleteChecked = (e) => {
    if(e.target.dataset.action !== 'deleteChecked') return;
    const parentNode = tasksList.querySelectorAll('.checkeds')
    const idTask = Number(parentNode.id)
    const index = todoList.findIndex((todo) => todo.id === idTask )
    
    for (let i=0; i < parentNode.length; i++) {
        parentNode[i].remove()
        const deleteId = todoList.splice(index[i], 1)
    }
     seveTodoList()
     showClearChecked()
}

const showPending = () => {
    const pendingTasks = todoList.filter(newTodo => !newTodo.checked)
    const renderPeding = `<p class="p-normal"> ${pendingTasks.length} items left</p>`
    pending.innerHTML = renderPeding
}

const showClearChecked = () =>{
    const completedTasks = todoList.filter(newTodo => newTodo.checked);
    if (completedTasks == 0) {
        clearChecked.classList.add('none')
    } else {
        clearChecked.classList.remove('none')
    }
}

const updateStatus = (selectedTask) => {
    let taskName = selectedTask.parentNode.lastElementChild;
    const parentNode = taskName.closest('.task')
    if(selectedTask.checked) {
        taskName.classList.add('checked')
        parentNode.classList.add('checkeds')
    }else{
        taskName.classList.remove('checked')
        parentNode.classList.remove('checkeds')
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
checkedAll.addEventListener('click', checkedAllTodo)
// body.addEventListener('click', addTask)/


const seveTodoList = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
if(localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    renderTask(todoList);
    showClearChecked()
    showPending()
}