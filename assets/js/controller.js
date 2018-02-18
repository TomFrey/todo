"use strict";

//gesamte ToDoListe aus dem Array laden
let todoListModel = new TodoList();


//wenn der DOM vollständig geladen ist
ready(() => {
    console.log('DOM is ready');

    //DOM mit den todos aus der todoliste aufbauen
    renderTodoListInitialy(todoListModel);

    let taskInputField = document.querySelector('#todo__input');

    taskInputField.addEventListener('keypress', (event) => {
        if(event.keyCode === 13 && taskInputField.value !== ''){  //auf enter Taste hören
            todoListModel.addTask(taskInputField.value);
            addTodoToGUI(taskInputField.value);
            taskInputField.value = '';
        }
    });

});

