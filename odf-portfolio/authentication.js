if (Meteor.isClient) {
    Template.register.events({
	    'submit form': function(event){
	        event.preventDefault();
	        var emailVar = event.target.registerEmail.value;
	        var passwordVar = event.target.registerPassword.value;
	        console.log("Form submitted.");
	        Accounts.createUser({
			    email: emailVar,
			    password: passwordVar
			});
	    }
	});
	Template.login.events({
	    'submit form': function(event) {
	        event.preventDefault();
	        var emailVar = event.target.loginEmail.value;
	        var passwordVar = event.target.loginPassword.value;
	        console.log("Form submitted.");
	        Meteor.loginWithPassword(emailVar, passwordVar);
	    }
	});
	Template.navBar.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
}