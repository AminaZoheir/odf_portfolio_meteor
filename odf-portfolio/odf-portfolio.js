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
      console.log(currProj);
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
    },
    categories: [
                {name:"Architecture",sub:["Complexes","Hotels","Residential Buildings","Residential Compounds","Admin","Retail"]},
                {name:"Urban",sub:[]},
                {name:"Interior", sub:["Residential Private"]}
              ]

  });

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
