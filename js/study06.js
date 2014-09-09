var App = Em.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
	this.resource("products");
});

App.IndexRoute = Em.Route.extend({
	model: function() {
		return {post:{title:"jinks"}};
	}
})

App.IndexController = Em.ObjectController.extend({
	actions: {
		select: function(post) {
			alert(post.title);
		},
		close:function() {
			
		}
	}
});

App.ProductsRoute = Em.Route.extend({
	model: function() {
		return {title:"this is title",age:12};
	}
});

App.ProductsController = Em.ObjectController.extend({
name: "jinks"
});

App.MakeView = Em.View.extend({
	templateName: "make",
	title: "this is title of view"
});