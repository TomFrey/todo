'use strict';

var Render = (function(){

    /**
     *  Erzeugt folgende Struktur:
     *
     *  <div class="todo__checkbox-wrapper">
     *     <input class="todo__checkbox" type="checkbox">
     *  </div>
     *
     * @param erledigt
     * @returns {HTMLDivElement}
     */
    function createCheckBox(erledigt){
        let newCheckBox = document.createElement('div');
        newCheckBox.classList.add('todo__checkbox-wrapper');

        let newInput = document.createElement('input');
        newInput.classList.add('todo__checkbox');
        newInput.setAttribute('type','checkbox');

        if(erledigt){
            newInput.checked = true;
        } else {
            newInput.checked = false;
        }

        newCheckBox.appendChild(newInput);
        return newCheckBox;
    }

    /**
     *   Erzeugt folgende Struktur:
     *
     *   <div class="todo__button-wrapper">
     *       <button class="todo__button"></button>
     *   </div>
     * @returns {HTMLDivElement}
     */
    function createCloseButton(){
        let newCloseButton = document.createElement('div');
        newCloseButton.classList.add('todo__button-wrapper');

        let newButton = document.createElement('button');
        newButton.classList.add('todo__button');

        newCloseButton.appendChild(newButton);
        return newCloseButton;
    }

    /**
     *   Erzeugt folgende Struktur:
     *
     *   <div class="todo__label">
     *      text
     *   </div>
     * @returns {HTMLDivElement}
     */
    function createTodoItemText(text){
        let newItemText = document.createElement('div');
        newItemText.classList.add('todo__label');
        newItemText.innerText = text;
        return newItemText;
    }

    /**
     * Erzeugt folgende Struktur:
     *
     *  <li class="todo__item-wrapper">
     *      <label class="todo__item">
     *          <div class="todo__checkbox-wrapper">
     *              <input class="todo__checkbox" type="checkbox">
     *          </div>
     *          <div class="todo__label">
     *              text
     *          </div>
     *          <div class="todo__button-wrapper">
     *              <button class="todo__button"></button>
     *          </div>
     *      </label>
     *  </li>
     *
     * @param todoItem
     * @returns {HTMLLIElement}
     */
    function createTodoItem(todoItem){
        let newLi = document.createElement('li');
        newLi.classList.add('todo__item-wrapper');
        //das ganze todoItem dem li anhängen, damit man weiss, von wo der Event kam
        newLi.todo = todoItem;

        let newLabel = document.createElement('label');
        newLabel.classList.add('todo__item');
        newLabel.appendChild(createCheckBox(todoItem.erledigt));
        newLabel.appendChild(createTodoItemText(todoItem.text));
        newLabel.appendChild(createCloseButton());

        newLi.appendChild(newLabel);
        return newLi;
    }


    /**
     * Löscht die gesamte todoListe und füllt alle todos aus
     * dem Array wieder in die todoListe
     *
     * @param todoListeModel
     */
    function renderTodoListInitialy(todoListeModel){

        let todolisteGUI = document.querySelector('.todo__list');
        //alles aus der todoListe (ul) löschen
        while (todolisteGUI.firstChild) {
            todolisteGUI.removeChild(todolisteGUI.firstChild);
        }

        //todos aus dem Model (array) ins GUI füllen
        todoListeModel.tasks.forEach((todo) => {
            todolisteGUI.appendChild(createTodoItem(todo));
        });
    }


    /**
     * Fügt der todoListe ein todoItem am Ende der Liste hinzu.
     *
     * @param todoItem
     * @returns {HTMLLIElement}
     */
    function addTodoToGUI(todoItem){
        let todolisteGUI = document.querySelector('.todo__list');
        let newTodo = createTodoItem(todoItem);
        todolisteGUI.appendChild(newTodo);
        return newTodo;
    }


    /**
     * Löscht ein todoItem aus der Liste
     *
     * @param event
     */
    function removeTodoFromGUI(event){
        event.target.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode);
    };


    //public api
    return{
        allTodos: renderTodoListInitialy,
        addTodo: addTodoToGUI,
        removeTodo: removeTodoFromGUI
    };

})();












