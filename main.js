const todoForm = document.getElementById("todo-form");
const addInput = document.getElementById("add-input");
const todoList = document.getElementById("todo-list");
const todoItems = document.querySelectorAll(".todo-item");

function createItem(title) {

    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const listItem = document.createElement("li");

    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    label.innerText = title;
    label.className = "title";

    editInput.type = "text";
    editInput.className = "field";
    editButton.innerText = "Change";
    editButton.className = "edit";

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.className = "todo-item";
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    bindEvents(listItem);

    return listItem;

}

function addItem(event) {

    event.preventDefault();

    if (addInput.value === "") {
        return alert("Please enter title!");
    }

    const todoItem = createItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = "";

}

function toggleItem() {

    const listItem = this.parentElement;
    listItem.classList.toggle("completed")
}

function editTodoItem() {

    const listItem = this.parentNode;
    const title = listItem.querySelector(".title");
    const editInput = listItem.querySelector(".field");
    const isEditing = listItem.classList.contains("editing");

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = "Change";

    } else {
        editInput.value = title.innerText;
        this.innerText = "Save";
    }

    listItem.classList.toggle("editing");
}

function deleteItem() {

    const listItem = this.parentNode;
    todoList.removeChild(listItem);
}

function bindEvents(todoItem) {

    const checkbox = todoItem.querySelector(".checkbox");
    const editButton = todoItem.querySelector("button.edit");
    const deleteButton = todoItem.querySelector("button.delete");

    checkbox.addEventListener("change", toggleItem);
    editButton.addEventListener("click", editTodoItem);
    deleteButton.addEventListener("click", deleteItem);
}

function init() {

    todoForm.addEventListener("submit", addItem);
    todoItems.forEach(item => bindEvents(item));
}

init();