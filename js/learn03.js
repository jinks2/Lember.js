var App = Em.Application.create({
	LOG_TRANSITIONS: true,
	ready: function() {
		console.log("application is ready");
	}
});

App.Router.map(function() {
	this.route("about");
	this.resource("products",function() {
		this.resource("product", {path: "/:product_id"});
	});//in this way,product must show in products's{{outlet}}
	
});

App.IndexController = Em.Controller.extend({
	productsCount: 6,
	logo: "../img/logo2.png",
	time: function() {
		return (new Date()).toDateString();
	}.property()
});

App.ProductsRoute = Em.Route.extend({
	model: function() {
		return this.store.findAll('product');
	}
});

App.ProductRoute = Em.Route.extend({
	model: function(params) {
		return this.store.find('product', params.product_id); 
	}
});//We can delete the ProductRoute and use the default!

/*
 *App.ApplicationAdapter = DS.RESTAdapter.extend();
 *To communicate with an HTTP server using JSON;
 */
App.ApplicationAdapter = DS.FixtureAdapter.extend();
 //To load records from memory;

App.Product = DS.Model.extend({
  title: DS.attr('string'),  //attr must registe in here
  price: DS.attr('number'), 
  description: DS.attr('string'), 
  isOnSale: DS.attr('boolean'), 
  image: DS.attr('string')
});

App.Product.FIXTURES = [ //Store
  { 
  	id: 1, //must add id
  	title: "Flint", 
  	price: 99, 
  	description: "Flint is…",
  	isOnSale: true, 
  	image: "../img/product1.png"
  }, 
  { 
  	id: 2,
  	title: "Kindling", 
  	price: 249, 
  	description: "Easily…",
  	isOnSale: false, 
  	image: "../img/product2.png"
  } 
]; 