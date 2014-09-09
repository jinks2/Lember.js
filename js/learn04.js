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
	});
	
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
});
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Product = DS.Model.extend({
  title: DS.attr('string'), 
  price: DS.attr('number'), 
  description: DS.attr('string'), 
  isOnSale: DS.attr('boolean'), 
  image: DS.attr('string'),
  reviews: DS.hasMany("review",{async: true})//Allows reviews to be lazy loaded
});

App.Review = DS.Model.extend({//create a new model to represent a Review.
  text: DS.attr("string"),
  reviewedAt: DS.attr("date"),
  product: DS.belongsTo("product")//Allows reviews to be lazy loaded
});

App.Product.FIXTURES = [ 
  { 
  	id: 1, 
  	title: "Flint", 
  	price: 99, 
  	description: "Flint is…",
  	isOnSale: true, 
  	image: "../img/product1.png",
    reviews: [100,101] // Mapping Product to a Reviews,according to id
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

App.Review.FIXTURES = [
  { 
    id: 100,
    product: 1,// Mapping Reviews to a Product,according to id
    text: "Started a fire in no time!"
  },
  {
    id: 101,
    product: 1,
    text: "Not the brightest flame, but warm!"
  }
];

/*can use this way to add JSON
App.ApplicationAdapter = DS.RESTAdapter.extend();
{ "products": [ 
 { 
 "id": 1, 
 "title": "Flint", 
 "price": 99, 
 "description": "Flint is…", 
 "isOnSale": true, 
 "image": "/assets/products/flint.png", 
 "reviews": [100,101] 
 }, { … }
 ], 
 "reviews": [ 
 { "id": 100, "product": 1, "text": "Started a fire in no time!" }, …
 ] 
}
*/