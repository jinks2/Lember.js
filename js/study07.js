var App = Em.Application.create({
	LOG_TRANSITIONS: true
});

App.IndexRoute = Em.Route.extend({
	model: function() {
		return {title:"jinks"}
	},
	setupController: function(controller,model) {
		controller.set("model",model.title);
	}//contorller the return model
});

App.IndexController = Em.ObjectController.extend({});