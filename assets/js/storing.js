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
            //todo checked unchecked aus dem Speicher lesen, ev Model anpassen
            //noch testen
            if(todo.erledigt){
                todoListModel.checkTask(index);
            }
        });

        return todoListModel;
    } else {
        return todoListModel;
    }
}

