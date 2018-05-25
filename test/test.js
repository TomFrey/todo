var assert = require('chai').assert;
var expect = require('chai').expect;

var Task = require('../assets/js/meinTodo.js').Task;
var TodoList = require('../assets/js/meinTodo.js').TodoList;




describe('todo', function() {


    describe('TodoList', function(){

        it('Wir sollten der Liste einen Task hinzufügen können', function() {
           let liste = new TodoList();
           liste.addTask('hallo');
           expect(liste.tasks.length).equals(1);
        });

        it('Neue Tasks sollten die Position des letzten Task + 1 haben', function() {
            let liste = new TodoList();
            liste.addTask('hallo');
            liste.addTask('hallo1');

            expect(liste.tasks[0].position).equal(1);
            expect(liste.tasks[1].position).equal(2);

        });

        it('Ein Task soll gelöscht werden können', function() {
            let liste = new TodoList();
            let hallo = liste.addTask('hallo');
            let welt = liste.addTask('welt');

            expect(liste.tasks.length).equals(2);
            liste.removeTask(hallo);
            expect(liste.tasks.length).equals(1);
            expect(liste.tasks[0].text).equals('welt');
        });

        it('Ein Task sollte nach hinten verschoben werden können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe A');   //index 0
            liste.addTask('Neue Aufgabe B');   //index 1
            liste.addTask('Neue Aufgabe C');   //index 2
            liste.addTask('Neue Aufgabe D');
            liste.addTask('Neue Aufgabe E');
            liste.addTask('Neue Aufgabe F');

            liste.moveTo(1, 3); //Startposition, Zielposition, wir schieben 1 auf 3
            expect(liste.tasks[3].text).equal('Neue Aufgabe B');   //A,B,C,D,E,F, -> A,C,D,B,E,F
            expect(liste.tasks[3].position).equal(4.5);

            liste.moveTo(0, 3); //wir verschieben 0 nach 3
            expect(liste.tasks[3].text).equal('Neue Aufgabe A');   //A,C,D,B,E,F -> C,B,D,A,E,F
            expect(liste.tasks[3].position).equal(4.75);
        });


        it('Ein Task sollte nach vorne verschoben werden können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe A');   //index 0
            liste.addTask('Neue Aufgabe B');   //index 1
            liste.addTask('Neue Aufgabe C');   //index 2
            liste.addTask('Neue Aufgabe D');
            liste.addTask('Neue Aufgabe E');
            liste.addTask('Neue Aufgabe F');

            liste.moveTo(5, 1);
            expect(liste.tasks[1].text).equal('Neue Aufgabe F');   //A,B,C,D,E,F -> A,F,B,C,D,E
            expect(liste.tasks[1].position).equal(1.5);

            liste.moveTo(5, 0);
            expect(liste.tasks[0].text).equal('Neue Aufgabe E');   //A,F,B,C,D,E -> E,A,F,B,C,D
            expect(liste.tasks[0].position).equal(0.5);

            liste.moveTo(5, 0);
            expect(liste.tasks[0].text).equal('Neue Aufgabe D');   //E,A,F,B,C,D -> D,E,A,F,B,C
            expect(liste.tasks[0].position).equal(0.25);
        });







    });







    describe('task', function() {

        it('sollte 1+1 addieren können', function() {
           let a = 1;
           let b = 1;
           let c = a+b;
           expect(c).to.equal(2);
        });

        it('sollte ein todoList Objekt erzeugen können', function() {
           let t = new TodoList;
           assert.instanceOf(t, TodoList);
        });

        it('TodoList sollte ein Attribut tasks (array) mit Tasks haben', function() {
            let t = new TodoList;
            assert.typeOf(t.tasks, 'array');
        });



        it('Sollte einen ', function() {

        });






    });
});