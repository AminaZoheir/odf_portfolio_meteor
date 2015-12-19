if (Meteor.isClient) {

  Template.portfolio.helpers({
    projects: function(){
      if(Session.get("currCat")){
        if(Session.get("currSubCat"))
          return Projects.find({category:Session.get("currCat"), subcategory:Session.get("currSubCat")},{sort: {index: 1}});
        return Projects.find({category:Session.get("currCat")},{sort: {index: 1}});
      }
      return Projects.find({},{sort: {index: 1}});
    }
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
