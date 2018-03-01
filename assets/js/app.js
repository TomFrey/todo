"use strict";


var App = (function(Render, Store){

    /**** wird vor dem DOM ready ausgeführt ****/
    //gesamte ToDoListe aus dem Array (local storage) laden
    console.log('vor DOM ready');
    let todoListModel = Store.getAllTodos();


    /**** wird nach dem DOM ready ausgeführt ****/
    function init(){
        console.log('DOM is ready');

        //DOM mit den todos aus der todoliste aufbauen
        Render.allTodos(todoListModel);

        //Event Listener, wenn das Eingabefeld mit Enter verlassen wird,
        //dann ein neues todoItem der Liste hinzufügen
        let taskInputField = document.querySelector('#todo__input');
        taskInputField.addEventListener('keypress', (event) => {
            if(event.keyCode === 13 && taskInputField.value !== ''){  //auf enter Taste hören
                let newTodo = todoListModel.addTask(taskInputField.value);

                Render.addTodo(newTodo);    //Muss das todoItem übergeben, damit ich beim löschen weiss,
                                            //welches todoItem ich aus dem Modell löschen muss
                taskInputField.value = '';
                Store.saveAll(todoListModel);
            }
        });

        //Event Listener. Umgesetzt mit Event Delegation, der Listener sitzt auf der
        //Liste.
        let todolisteGUI = document.querySelector('#todo__list');
        todolisteGUI.addEventListener('click', function(event){

            //Wenn der Delete Button (x) gedrückt wurde,
            //das entsprechende todoItem aus der Liste löschen
            if(event.target && event.target.matches('.todo__button')){
                let todoItemFromGUI = event.target.parentNode.parentNode.parentNode.todo;

                //todoItem aus dem Model löschen
                todoListModel.tasks.forEach(function(task){
                    if(task.id === todoItemFromGUI.id){
                        todoListModel.removeTask(task.id-1);
                    }
                });

                Render.removeTodo(event);
                Store.saveAll(todoListModel);
            }

            //Wenn die Checkbox gedrückt wurde,
            //das entsprechende todoItem in der Liste checken, unchecken
            if(event.target && event.target.matches('.todo__checkbox')){
                let todoItemFromGUI = event.target.parentNode.parentNode.parentNode.todo;

                console.log('checkbox');

                //Model anpassen
                todoListModel.tasks.forEach(function(task){
                    if(task.id === todoItemFromGUI.id){
                        task.erledigt = task.erledigt ? false : true;
                    }
                });

                //Model speichern
                Store.saveAll(todoListModel);
            }

            //Wenn die Checkbox gedrückt wurde,
            //das entsprechende todoItem in der Liste checken, unchecken
            if(event.target && event.target.matches('.todo__label')){
                let todoItemFromGUI = event.target.parentNode.parentNode.parentNode.todo;

                console.log('text');
            }
        });

    }


    //public api
    return{
        init: init
    }

})(Render, Store);


//wenn der DOM vollständig geladen ist
ready(App.init());