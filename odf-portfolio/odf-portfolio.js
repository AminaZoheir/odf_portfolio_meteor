Projects = new Mongo.Collection("projects");
// projects.

Router.route('/',{
  template: 'home'
});
Router.configure({
  layoutTemplate: 'main-layout'
});
Router.route('/portfolio/:_id', {
    template: 'projectPage',
    data: function(){
      var currProj = this.params._id;
      return Projects.findOne({_id: currProj});
    }
});
Router.route('/portfolio');

if (Meteor.isClient) {

  // This code only runs on the client

  Template.portfolio.helpers({
    projects: function(){
      if(Session.get("currCat")){
        if(Session.get("currSubCat"))
          return Projects.find({category:Session.get("currCat"), subcategory:Session.get("currSubCat")});
        return Projects.find({category:Session.get("currCat")});
      }
      return Projects.find({});
    }

  });

  Template.registerHelper('isCurrCat', function(category){
    return Session.get("currCat") == category;
  });

  Template.registerHelper('categories', function(){
    return  [
                {name:"Architecture",sub:["Complexes","Hotels","Residential Buildings","Residential Compounds","Admin","Retail"]},
                {name:"Urban",sub:[]},
                {name:"Interior", sub:["Residential Private"]}
              ];
  });

  Template.subCategory.rendered = function(){
    var instance = this;
    Meteor.defer(function() {
      $(instance.firstNode).addClass("animating"); //use "instance" instead of "this"
    });
  };

  Template.portfolio.events({
    "click .parentCat": function(event){
      Session.set("currCat",event.target.innerHTML);
      Session.set("currSubCat",null);
    },
    "click .childCat": function(event){
      Session.set("currSubCat",event.target.innerHTML);
    }
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
