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


    function getTodoListFromServer(callbackWhenModelIsReady){
        let todoListModel = new TodoList();
        let request = new XMLHttpRequest();

        request.open('GET', './api/daten.json');

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                console.log(request.responseText);

                let todosAsArrayOfObjects = JSON.parse(request.responseText);

                console.log('array ' + todosAsArrayOfObjects);

                todosAsArrayOfObjects.forEach(function(todo, index){
                    console.log('todo: '+ todo._text);
                    todoListModel.addTask(todo._text);
                    if(todo.erledigt){
                        todoListModel.checkTask(index);
                    }
                });

                callbackWhenModelIsReady();
            }
            //es konnten keine Daten vom Server geladen werden, leere Liste zurück geben
            else {
                console.log('Es konnten keine Daten vom Server geladen werden.');
            }
        };

        request.send();


        return todoListModel;
    }


    //mit promises
    function test (){
        //github.com/fetch      ein polyfill

        let req = fetch('./api/daten.json');

        req.then(function(){
            console.log('a');
        });

        req.then(function(){
            console.log('b');
        });

        req.then(function(){
            console.log('c');
        });

        req.catch(function(){

        });

        req.finally(function(){

        });


    }



    //Public api
    return {
        saveAll: storeTodoList,
        getAllTodos: getTodoListFromStore,
        getAllTodosFromServer: getTodoListFromServer
    };

})();







