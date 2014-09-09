var App = Em.Application.create({
	LOG_TRANSITIONS: true,
	ready: function() {
		alert("Welcome!");
	}
});

App.Router.map(function() {
	this.route("about");
});

App.IndexController = Em.Controller.extend({
	productsCount: 6,
	logo: "../img/logo2.png",
	time: function() {
		return (new Date()).toDateString();
	}.property()
});

