App = Ember.Application.create();
App.Router.map(function() {
  this.resource("list-num");
  this.resource("button");
});
App.ButtonRoute = Ember.Route.extend({
  model : function() {
  	return button;
  }
});

App.Controller = Ember.ObjectController.extend({// all controller;it is sharing.
  isVisible : true,
  actions : {
  	beVisible : function() {
  		this.set('isVisible',true);
  	},
  	unVisible : function() {
  		this.set("isVisible",false);
  	}
  }
});

var button = [{
  "name":"button1"
},{
  "name":"button2"
}]
