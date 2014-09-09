var App = Em.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
	this.resource("products");
}) 

App.IndexController = Em.Controller.extend({
	ifCheck: false,
	ifValue: "if-false",
	unlessCheck: false,
	unlessValue: "unless-false",
	eachValue: [{id:0},{id:1},{id:2}],
	name: "outName",
	person: [{name:"jinks"},{name:"pen"}],
	dog: {id:1,name:"haha",age:10},
	img: "../img/product1.png",
	newclass: "class"
});

App.ProductsRoute = Em.Route.extend({
	actions: {
		show: function() {
			this.controller.set("isShow",true);
		},
		hidden: function() {
			this.controller.set("isShow",false);
		}// if can not find action in controller,will find here
	}
});

App.ProductsController = Em.Controller.extend({
	isExpanded: false,
	actions: {
		expand: function() {
			this.set("isExpanded",true);
		},
		contract: function() {
			this.set("isExpanded",false);
		}
	},
	isShow: false
})

Em.LinkView.reopen({
	attributeBindings: ["addClass"]
});

Em.TextField.reopen({
	attributeBindings: ["newClass1","newClass2","newClass3"]
});

//
Em.View.reopen({
  init: function() {
    this._super(); //if in Ember.View and Ember.ArrayController,and recode init , must use this.
    var self = this;
    // bind attributes beginning with 'data-'
    Em.keys(this).forEach(function(key) {
      if (key.substr(0, 5) === 'data-') {
        self.get('attributeBindings').pushObject(key);
      }
    });
  }
});
