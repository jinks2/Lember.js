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

App.ProductController = Em.ObjectController.extend({ 
  review: function() {
    return this.store.createRecord("review", {
      product: this.get("model")
    })
  }.property("model"),
  actions: {
    createReview: function() {
      var controller = this;
      this.get("review").set("reviewedAt",new Date());
      this.get("review").save().then(function(review) {
        controller.get("model.reviews").addObject(review);
      })
    }
  },
  isNotReviewed: Em.computed.alias("review.isNew")
  //isNew is a Ember Data Model States.
});

App.ProductView = Em.View.extend({ 
  classNames: ["row"],
  classNameBindings: ["isOnSale"],
  isOnSale: Em.computed.alias("controller.isOnSale")
});

App.ReviewView = Em.View.extend({  //create this
  isExpanded: false,
  classNameBindings: ["isExpanded","readMore"],
  click: function() {
  this.toggleProperty("isExpanded");
 },
 readMore: function() {
  return this.get("length") > 140;
 }.property("length")
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
