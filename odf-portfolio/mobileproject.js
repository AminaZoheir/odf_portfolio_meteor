if(Meteor.isClient){
	Template.projectPage.helpers({
	    isAlign: function(align){
	      return(this.desc.align == align);
	    }
	  });
	Template.mobileproject.events({
		'click .mobileProject': function(event, template){
	      if($('.toggle-desc > i').hasClass('fa-chevron-down')) {
	        $('.toggle-desc > i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
	        $('.mobile-proj-desc').slideDown('slow');
	      }else{
	        $('.toggle-desc > i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
	        $('.mobile-proj-desc').slideUp('slow');
	      }
	    }
	});
}