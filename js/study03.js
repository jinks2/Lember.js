var App = Em.Application.create({
	LOG_TRANSITIONS: true
});

App.Person = Em.Object.extend({
	firstName: null,
	lastName: null,
	initFun: function() {
		console.log("use on('init') to init this")
	}.on("init"),
	fullName: function() {
		var firstName = this.get("firstName");
		var lastName = this.get("lastName");
		console.log(firstName+" "+lastName);
	}.property("lastName","firstName"),
	fullNameChanged: function() {
		console.log("fullName changed");
	}.observes("fullName")  //set observes ,it will work once if fullName work and then fullName change;
});

var person = App.Person.create({
	firstName: "jinks",
	lastName: "peng"
});

person.set("lastName","Bob");                 //fullNameChanged not work
person.get("fullName");                      //fullNameChanged not work
person.set("lastName","Kate");              //fullNameChanged work
person.set("firstName","Chen");            //fullNameChanged not work

App.Person.reopen({
	partOfNameChanged: function() {
		console.log("partOfNameChanged work");
	}.observes("lastName","firstName"), //observers more property
});

person.set("lastName","Jinks"); // can't work,because person not partOfNameChanged

var newperson = App.Person.create({});

newperson.set("lastName","Jinks");      //partOfNameChanged work
newperson.set("lastName","Bob");       //partOfNameChanged work
newperson.set("firstName","Zhong");   //partOfNameChanged work


App.Person.reopen({
	partOfNameChanged: function() {
		Em.run.once(this,"processFullName");
	}.observes("firstName","lastName"),
	processFullName: function() {
		console.log("processFullName work");
	}
})

var person = App.Person.create({
	firstName: "jinks",
	lastName: "peng"
});

person.set("firstName","Liu"); //partOfNameChanged work
person.set("firstName","Zhao"); //partOfNameChanged not work
person.set("lastName","Jack"); //partOfNameChanged not work

