if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.entry_center.helpers({
    filtered_entries: function() {
      return Entries.find();
    }
  });

  Template.entry_center.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
