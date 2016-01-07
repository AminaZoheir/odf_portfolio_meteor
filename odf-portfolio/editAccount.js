if(Meteor.isClient){
  var tempAlert = function (msg,duration)
    {
     var el = document.createElement("div");
     el.className="alertmessage";
     el.innerHTML = msg;
     el.onclick = function() {
      el.parentNode.removeChild(el);
      el =null;
     };
     setTimeout(function(){
      if(el != null){
        el.parentNode.removeChild(el);
      }
     },duration);
     document.body.appendChild(el);
    }
  Template.editAccount.helpers({
    user: function(){
      console.log(Meteor.user.findOne());
      return Meteor.user.findOne();
    }
    
  });

  Template.editAccount.events({
    'submit .update-acc': function(event){
      event.preventDefault();
      // var email = event.target.registerEmail.value;
      var oldPassword = event.target.oldPassword.value;
      var newPassword = event.target.registerPassword.value;
      Accounts.changePassword(oldPassword, newPassword);
      window.scrollTo(0, 0);
      tempAlert("Account Updated Successfully",2000);
    }
  });
}