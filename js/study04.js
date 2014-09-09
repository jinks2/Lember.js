var App = Em.Application.create({
	LOG_TRANSITIONS: true
});

App.wife = Em.Object.create({
	Income: 3200
});

App.husband = Em.Object.create({
	IncomeBinding: "App.wife.Income"
	//just the first time
});

console.log(App.husband.get("Income")); //3200
App.husband.set("Income",4000);
console.log(App.husband.get("Income")); //4000
console.log(App.wife.get("Income")); //3200



App.user = Em.Object.create({
	fullName: "Jinks pen"
});

App.userView = Em.View.create({
	userNameBinding: Em.Binding.oneWay("App.user.fullName")
})

console.log(App.user.get("fullName")); //Jinks Pen
console.log(App.userView.get("userName"));//Jinks Pen

App.user.set("fullName","Bob Zhao");
App.userView.set("userName","Jack Chen");

console.log(App.user.get("fullName")); //Bob Zhao
console.log(App.userView.get("userName")); //Jack Chen




