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
	});
	
});

App.IndexRoute = Em.Route.extend({
  model: function() {
    return this.store.findAll("product");
  }
});

App.IndexController = Em.ArrayController.extend({
  productsCount: Em.computed.alias("length"),
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
		return this.store.findAll("product");
	}
});

App.ProductRoute = Em.Route.extend({
	model: function(params) {
		return this.store.find("product", params.product_id); 
	}
});

App.ProductsController = Em.ArrayController.extend({
  sortProperties: ["title"],
  sortAscending: false 
});

App.ProductsOnsaleRoute = Em.Route.extend({
  model: function() {
    return this.modelFor("products").filterBy("isOnSale");
  }
});

App.ProductController = Em.ObjectController.extend({ //use ObjectController
  text: "",
  actions: {
    createReview: function() {
      // Step 1: Build a new Review object
      var review = this.store.createRecord("review", { //you can touch the server here
        text: this.get("text"),
        product: this.get("model"),
        reviewedAt: new Date()
      });
      // Step 2: Save the Review
      var controller = this;//Need to be able to reference the controller in the save callback
      review.save()//Will add it to our local fixtures. Would do a POST to a server if using the REST adapter
      // Step 3: Clear out the text variable
      .then(function(review) {
        // Will be called when the save call finishes
        controller.set("text", ""); 
        controller.get("model.reviews").addObject(review);//Clear out reviewText and add the review to products.reviews
      })
    }
  } 
});

App.ProductView = Em.View.extend({ 
  classNames: ["row"],
  classNameBindings: ["isOnSale"],
  isOnSale: Em.computed.alias("controller.isOnSale")
});

App.ProductDetailsComponent = Em.Component.extend({
  reviewsCount: Em.computed.alias("product.reviews.length"),
  hasReviews: function() {
    return this.get("reviewsCount") > 0;
  }.property("reviewsCount"),
  tagName: "li",
  classNames: ["row"]
});

App.ReviewsController = Em.ArrayController.extend({ 
  sortProperties: ["reviewedAt"],
  sortAscending: false
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.Product = DS.Model.extend({
  title: DS.attr("string"), 
  price: DS.attr("number"), 
  description: DS.attr("string"), 
  isOnSale: DS.attr("boolean"), 
  image: DS.attr("string"),
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
    title : "Flint",
    price: 99,
    description: "Flint is a hard, sedimentary cryptocrystalline form of the mineral quartz, categorized as a variety of chert.",
    isOnSale: true,
    image: "../img/product1.png",
    reviews: [100,101], //product fixtures to reference your newly created review fixtures.accoding id
    crafter:200
  },
  {
    id: 2,
    title : "Kindling",
    price: 249,
    description: "Easily combustible small sticks or twigs used for starting a fire.",
    isOnSale: false,
    image: "../img/product2.png",
    crafter:201
  },
  {
    id: 3,
    title: "Matches",
    price: 499,
    description: "One end is coated with a material thacan be ignited by frictional heat generated bstriking the match against a suitable surface.",
    isOnSale: true,
    reviews: [100],
    image: "../img/product3.png",
    crafter: 201
  },
  {
    id: 4,
    title: "Bow Drill",
    price: 999,
    description: "The bow drill is an ancient tool. Whilit was usually used to make fire, it was also usefor primitive woodworking and dentistry.",
    isOnSale: false,
    reviews: [101],
    image: "../img/product4.png",
    crafter: 200
  },
  {
    id: 5,
    title: "Tinder",
    price: 499,
    description: "Tinder is easily combustible materiaused to ignite fires by rudimentary methods.",
    isOnSale: true,
    image: "../img/product5.png",
    crafter: 201
  },
  {
    id: 6,
    title: "Birch Bark Shaving",
    price: 999,
    description: "Fresh and easily combustable",
    isOnSale: true,
    image: "../img/product6.png",
    crafter: 200
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
