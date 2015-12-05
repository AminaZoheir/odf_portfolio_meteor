

if (Meteor.isClient) {

  // This code only runs on the client

  Template.body.helpers({

    tasks: [

      { text: "Project 1" },

      { text: "Project 2" },

      { text: "Project 3" }

    ]

  });

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
