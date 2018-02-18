"use strict";


class TodoList{
    constructor(){
        this.tasks = [];
    };

    /**
     * Füge einen neuen Task der Liste hinzu.
     * @param text Text des Tasks
     */
    addTask(text){
        let neuerTask = new Task(text);

        if(this.tasks.length > 0){
            let letztePosition = this.tasks[this.tasks.length-1].position;
            neuerTask.position = ++letztePosition;
        }
        this.tasks.push(neuerTask);
        return neuerTask;
    }


    /**
     * Lösche den übergebenen Task
     * @param taskToDelete
     */
    removeTask(taskToDelete){
        this.tasks.forEach(function(task, index, tasks){
            if(taskToDelete.position === task.position){
                tasks.splice(index, 1);
            }
        });
    }


    /**
     * Verschiebt den Task von quellIndex zum zielIndex
     * z.B. moveTo(0,3)   vorher: A,B,C,D,E,F  -> nachher: B,C,D,A,E,F
     * @param quellIndex
     * @param zielIndex
     */
    moveTo(quellIndex, zielIndex) { //1,3
        let p1 = 0, p2;

        if (quellIndex < zielIndex) {
            p1 = this.tasks[zielIndex].position;
            p2 = this.tasks[zielIndex+1].position;
        } else {
            if (zielIndex > 0){
                p1 = this.tasks[zielIndex-1].position;
            }
            p2 = this.tasks[zielIndex].position;
        }

        let neuePosition = (p1 + p2) / 2;
        this.tasks[quellIndex].position = neuePosition;

        this.tasks.sort(((a, b) => a.position - b.position));
    }


    /**
     * Einen Task aus der Liste als erledigt markieren
     * @param index
     */
    uncheckTask(index) {
        this.tasks[index].uncheck();
    }


    /**
     * Einen Task aus der Liste als erledigt markieren
     * @param index
     */
    checkTask(index) {
        this.tasks[index].check();
    }
}


class Task{
    constructor(text) {
        this.id = 1;
        this._text = text || '';
        this.erledigt = false;
        this._position = 1;
    }


    /**
     * getter funktion für position: kann man aufrufen mit "x.position"
     * @returns {number}
     */
    get position(){
       return this._position;
    };

    /**
     * setter Funktion für position:  kann man aufrufen mit "x.position = 7"
     * @param value {number}
     */
    set position(value){
        if (typeof value === 'number'){
            this._position = value;
            this.id = value;
        } else {
            console.warn('Es wurde ein nicht numerischer Typ der Position zugewiesen');
        }

    };


    /**
     * Text des Tasks
     * @returns {String}
     */
    get text() {
        return this._text;
    }

    /**
     * Aktualisere den Text
     * @param v {String}
     */
    set text(v) {
        this._text = v;
    }


    /**
     * Markiert einen Task als erledigt.
     */
    check(){
        this.erledigt = true;
    }


    /**
     * Markiert einen Task als nicht erledigt.
     */
    uncheck(){
        this.erledigt = false;
    }
}


//wird nur für die Test gebraucht, ist etwas von node.js
if (typeof module !== 'undefined' && module) {
    module.exports.Task = Task;
    module.exports.TodoList = TodoList;
}

