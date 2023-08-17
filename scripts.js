let toDoItems = JSON.parse(localStorage.getItem('tareas'))
  ?.map(todo => new ToDo(todo.description, todo.complete)) || []

function ToDo(description, complete=false) {
  this.description = description;
  this.complete = complete;
}

ToDo.prototype.completeToDo = function () {
  this.complete = !this.complete;
}

function buildToDo(todo, index) {
  let toDoShell = document.createElement('div');
  toDoShell.setAttribute('class', 'toDoShell');
  let toDoText = document.createElement('span');
  toDoText.innerHTML = todo.description;
  toDoShell.appendChild(toDoText);
  let input = document.createElement('input');
  input.type = 'checkbox';
  input.setAttribute('id', index);
  input.addEventListener('click', completeToDo);
  input.setAttribute('class', 'completeCheckbox');
  if (todo.complete) {
    toDoText.setAttribute('class', 'completeText');
    input.setAttribute('checked', 'true');
  }

  let label = document.createElement('label')
  label.setAttribute('class', 'container')

  let span = document.createElement('span')
  span.setAttribute('class', 'checkmark')
  
  label.appendChild(input)
  label.appendChild(span)

  let remove = document.createElement('i')
  remove.setAttribute('id', index)
  remove.setAttribute('class', 'removeToDo')
  remove.setAttribute('class', 'fa-solid fa-trash-can')
  // remove.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
  remove.addEventListener('click', removeToDo)

  toDoShell.appendChild(label);
  toDoShell.appendChild(remove)
  return toDoShell;
}

function buildToDos(toDos) {
  let array = toDos.map(buildToDo);
  return array;
}

function displayToDos() {
  let toDoContainer = document.getElementById('toDoContainer');
  toDoContainer.innerHTML = "";
  buildToDos(toDoItems).forEach(element => {
    toDoContainer.appendChild(element);
  });
}

function addToDo() {
  let input = document.getElementById('toDoInput');
  if (input.value !== "") {
    let nuevoToDo = new ToDo(input.value);
    toDoItems.push(nuevoToDo);
  }
  input.value = "";
  localStorage.setItem('tareas', JSON.stringify(toDoItems))
  displayToDos();
}

function removeToDo(e){
  let id = parseInt(e.target.id)
  toDoItems = toDoItems.filter((e, i) => i !== id)
  localStorage.setItem('tareas', JSON.stringify(toDoItems))
  displayToDos()
}

let agregar = document.getElementById('addButton');

agregar.addEventListener('click', function (evento) {
  evento.target = addToDo();
});

document.addEventListener('keydown', function (evento) {
  if (evento.code === 'Enter') {
    addToDo()
  }
}, false);

function completeToDo(event) {
  const index = event.target.id;
  toDoItems[index].completeToDo();
  localStorage.setItem('tareas', JSON.stringify(toDoItems))
  displayToDos()
}

function cleanToDo() {
  toDoItems = []
  localStorage.clear()
  displayToDos()
}

let clean = document.getElementById('cleanButton')
clean.addEventListener('click', function (evento) {
  evento.target = cleanToDo()
})

displayToDos();



