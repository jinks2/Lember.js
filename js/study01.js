var App = Em.Application.create({
	LOG_TRANSITIONS: true
});

App.Person = Em.Object.extend({
	say: function(things) {
		var name = this.get("name");
		console.log(name + "says: " + things);
	}
});

App.Solider = App.Person.extend({
	say: function(things) {
		this._super(things + " ,sir!"); //invoke _super()
	}
});

var Jinks = App.Solider.create({
	name: "jinks Peng"
})

Jinks.say("Yes");

App.Animal = Em.Object.extend({
	init: function() {
		var name = this.get("name");
		console.log(name);
	}
});

var dog = App.Animal.create({
	name: "Bob",
	call: function() {
		var name = this.get("name");
		console.log(name);
	} 
});

dog.set("name","jack");

dog.call();


