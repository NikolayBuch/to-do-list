const addMessege = document.querySelector('.messege');
const addButten = document.querySelector('.add-btn');
const todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMesseges();
}

addButten.addEventListener('click',function() {
    let newTodo = {
        todo: addMessege.value,
        checked: false,
        important: false

    };

    todoList.push(newTodo);
    displayMesseges();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMesseges() {
    let displayMesseges = ''
    todoList.forEach(function(item, i){
        displayMesseges += `
        <li>
        <input type='checkbox' id='item_${i}' class='custom-checkbox' ${item.checked ? 'checked' : ''}>
        <lable class='todo__messege' for='item_${i}'>${item.todo}</lable>
        <butten class='clouse-btn' id='item_${i}'><img src='./img/close.svg' alt='close'> </butten>
        </li>
        `;
        todo.innerHTML = displayMesseges;
        console.log(displayMesseges);
    })
};
const cloBut = document.querySelector('.clouse-btn');
cloBut.addEventListener('click', function(event){
        todoList.forEach (function(i){
            todoList.splice(i, 1);
            displayMesseges();
        localStorage.setItem('todo', JSON.stringify(todoList));
        })

});