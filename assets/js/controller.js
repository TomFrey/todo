"use strict";

//gesamte ToDoListe aus dem Array laden
//let todoListModel = new TodoList();
let todoListModel = getTodoListFromStore();





//wenn der DOM vollständig geladen ist
ready(() => {
    console.log('DOM is ready');

    //DOM mit den todos aus der todoliste aufbauen
    renderTodoListInitialy(todoListModel);

    //Event Listener, wenn das Eingabefeld mit Enter verlassen wird, dann ein neues todoItem der Liste hinzufügen
    let taskInputField = document.querySelector('#todo__input');
    taskInputField.addEventListener('keypress', (event) => {
        if(event.keyCode === 13 && taskInputField.value !== ''){  //auf enter Taste hören
            let newTodo = todoListModel.addTask(taskInputField.value);
            addTodoToGUI(taskInputField.value, newTodo);  //muss das todoItem übergeben, damit ich beim löschen weiss, welches todoItem ich aus dem Modell löschen muss
            taskInputField.value = '';
            storeTodoList(todoListModel);
        }
    });


    //Event Listener auf dem Delete Button (x) jedes Todos. Umgesetzt mit Event Delegation, der Listener sitzt auf der
    //Liste. Das entsprechende todoItem aus der Liste löschen
    let todolisteGUI = document.querySelector('#todo__list');
    todolisteGUI.addEventListener('click', function(event){

        if(event.target && event.target.matches('.todo__button')){

            console.log('delete', event.target.parentNode.parentNode.parentNode);
            console.dir(event.target.parentNode.parentNode.parentNode);

            //todoItem aus dem Model löschen
            todoListModel.tasks.forEach(function(task){
                if(task.id === event.target.getAttribute('todoid')){
                    todoListModel.removeTask(task.id-1);
                }
            });
            removeTodoFromGUI(event);

        }
    });

});

