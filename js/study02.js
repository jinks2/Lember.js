var App = Em.Application.create({
	LOG_TRANSITIONS: true
});

App.Person = Em.Object.extend({
	firstName: null,
	lastName: null,
	fullName: function() {
		var fullName = this.get("firstName") + " " + this.get("lastName");
		console.log(fullName);
	},
	fullname: function() {
		console.log(this.get("firstName")+" "+this.get("lastName"));
	}.property(),
	Fullname: function() {
		console.log(this.get("firstName")+" "+this.get("lastName"));
	}.property("lastName","firstName")

});

var Jinks = App.Person.create({
	firstName: "jinks",
	lastName: "peng"
});

Jinks.fullName();
Jinks.get("fullname");
Jinks.get("Fullname");


Jinks.set("lastName","jack");
Jinks.get("fullname"); //not listen any property,not work
Jinks.get("Fullname"); //work



App.TodosController = Em.Controller.extend({
	todos: [
		Em.Object.create({isDone: false})
	],
	remaining: function() {
		var todos = this.get("todos");
		console.log(todos.filterBy("isDone",false).get("length"));
	}.property("todos.@each.isDone")
});

App.todosController = App.TodosController.create();
//create an instance

App.todosController.get("remaining");


var todos = App.todosController.get("todos");
var todo = todos.objectAt(0); //get onject from array;
todo.set("isDone",true);
App.todosController.get("remaining");


todo = Em.Object.create({isDone:false});
todos.pushObject(todo);//push object into array;
App.todosController.get("remaining");


