if(Meteor.isClient){
  Template.adminAbout.helpers({
    company: function(){
      return Company.findOne({});
    }
  });

  Template.adminAbout.events({
    'click #add-button': function(){
      // var company = Company.findOne({});
      // var phones = Company.findOne({}).phones;
      // console.log(company);
      phones.push({type:'Phone', number:''});
      console.log(phones);
      // Company.update(_id,{
      //   $set: {phones: phones}
      // });
    }
  });
}
