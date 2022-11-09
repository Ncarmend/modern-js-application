const inputTsk = document.getElementById("new-task");
const buttonAdd = document.getElementById("bouton");
const doingTsk = document.getElementById("doingTsk");
const donaTsk = document.getElementById("doneTsk");

const difDay = () => {
    let dateI1 = document.getElementById("dateInput1").value;
    let dateI2 = document.getElementById("dateInput2").value;
    let date1 = new Date(dateI1);
    let date2 = new Date(dateI2);
    let time_difference = date2.getTime() - date1.getTime();
    let result = time_difference / (1000 * 60 * 60 * 24);
    return document.getElementById("result").innerHTML =
        " DEADLINE  " + result;
}
const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const insertDue = document.getElementById("result");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    insertDue.className = "resultats";

    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    label.appendChild(insertDue);
    return listItem;
}
const TaskManager = () => {
    const listItem = createNewTaskElement(inputTsk.value);
    if (listItem) {
        doingTsk.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        inputTsk.value = "";
    }
    else if (parentNode) {
        console.log("Edit Task...");
        const listItem = this.parentNode;
        const editInput = listItem.querySelector("input[type=text]")
        const label = listItem.querySelector("label");
        const containsClass = listItem.classList.contains("editMode");
        if (containsClass) {
            label.innerText = editInput.value;
        }
        else {
            editInput.value = label.innerText;
        }
        listItem.classList.toggle("editMode");
    }
    else {
        const listItem = this.parentNode;
        const ul = listItem.parentNode;
        ul.removeChild(listItem);
    }
}

const taskCompleted = function () {
    if (listItem) {
        const listItem = this.parentNode;
        donaTsk.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }
    else {
        const listItem = this.parentNode;
        doingTsk.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }
}

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}
ajaxRequest();

buttonAdd.addEventListener("click", TaskManager);
buttonAdd.addEventListener("click", ajaxRequest);

for (let i = 0; i < doingTsk.children.length; i++) {
    bindTaskEvents(doingTsk.children[i], taskCompleted);
}
for (let i = 0; i < donaTsk.children.length; i++) {
    bindTaskEvents(donaTsk.children[i], taskIncomplete);
}