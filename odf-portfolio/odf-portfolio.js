Projects = new Mongo.Collection("projects");

if (Meteor.isClient) {

  // This code only runs on the client

  Template.body.helpers({

    projects: function(){
      return Projects.find({});
    }

  });

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
