'use strict';

var Store = (function(){

    /**
     * Speichert das array mit allen todoItems im local store des Browsers
     *
     * @param todoListModel - array mit todoItems
     */
    function storeTodoList(todoListModel){
        let jsonList = JSON.stringify(todoListModel.tasks);
        localStorage.setItem('todoList', jsonList);
    }


    /**
     * Holt die gespeicherte TodoListe aus dem store des Browsers.
     * Wenn es noch nichts im Speicher gibt, wird eine leere Liste
     * zurück gegeben.
     *
     * @returns {TodoList|*}
     */
    function getTodoListFromStore(){
        let todosAsJson = localStorage.getItem('todoList');
        let todoListModel = new TodoList();

        //Daten sind schon vorhanden
        if(todosAsJson){
            let todosAsArrayOfObjects = JSON.parse(todosAsJson);

            todosAsArrayOfObjects.forEach(function(todo, index){
                todoListModel.addTask(todo._text);
                if(todo.erledigt){
                    todoListModel.checkTask(index);
                }
            });
            return todoListModel;

            //noch keine Daten vorhanden, leere Liste zurück geben
        } else {
            return todoListModel;
        }
    }


    //Public api
    return {
        saveAll: storeTodoList,
        getAllTodos: getTodoListFromStore
    };

})();







