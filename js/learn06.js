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
    this.route("onsale");
    //this way link-to "products.onsale";if is resource,link-to "onsale"
	});
	
});

App.IndexRoute = Em.Route.extend({
  model: function() {
    return this.store.findAll("product");
  }
});

App.IndexController = Em.ArrayController.extend({
  productsCount: Em.computed.alias('length'),
	logo: "../img/logo2.png",
	time: function() {
		return (new Date()).toDateString();
	}.property(),
  onSale: function() {
    return this.filter(function(product) {
      return product.get("isOnSale");
    }).slice(0,3);
  }.property("@each.isOnSale")
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

App.ProductsController = Em.ArrayController.extend({
  sortProperties: ["title"],
  sortAscending: false 
});

App.ProductsOnsaleRoute = Em.Route.extend({ //name
  model: function() {
    return this.modelFor("products").filterBy("isOnSale");
  }  //you can use modelBy;
});//use this way;it can get sll products from the parent route


App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.Product = DS.Model.extend({
  title: DS.attr('string'), 
  price: DS.attr('number'), 
  description: DS.attr('string'), 
  isOnSale: DS.attr('boolean'), 
  image: DS.attr('string'),
  reviews: DS.hasMany("review",{async: true})
});

App.Review = DS.Model.extend({
  text: DS.attr("string"),
  reviewedAt: DS.attr("date"),
  product: DS.belongsTo("product")
});

App.Product.FIXTURES = [ 
  { 
  	id: 1, 
  	title: "Flint", 
  	price: 99, 
  	description: "Flint is…",
  	isOnSale: true, 
  	image: "../img/product1.png",
    reviews: [100,101] 
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
    product: 1,
    text: "Started a fire in no time!"
  },
  {
    id: 101,
    product: 1,
    text: "Not the brightest flame, but warm!"
  }
];
