var App = Em.Application.create({
	LOG_TRANSITIONS: true,
	ready: function() {
		console.log("application is ready");
	}
});

App.Router.map(function() {
	this.route("about");
	this.resource("products", {path: "/times"});
	//"route" for adjective,verb,"resource" for num
	this.resource("product",{path:"/products/:title"});
	//siblings router will all in parent's {{outlet}}
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
		return App.PRODUCTS;
	}
});

App.PRODUCTS = [ 
  { 
  	title: "Flint", 
  	price: 99, 
  	description: "Flint is…",
  	isOnSale: true, 
  	image: "../img/product1.png"
  }, 
  { 
  	title: "Kindling", 
  	price: 249, 
  	description: "Easily…",
  	isOnSale: false, 
  	image: "../img/product2.png"
  } 
];

App.ProductRoute = Em.Route.extend({
	model: function(params) {
		console.log(params);
		return App.PRODUCTS.findBy("title",params.title);
		//if return App.PRODUCTS will wrong.it should return obeject,not array
	}
});

