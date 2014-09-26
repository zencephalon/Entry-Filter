if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.entry.helpers({
    bolded_text: function() {
      text = this.text;
      search_input = Session.get("search_input");
      if (search_input) {
        text = text.replace(new RegExp('<b>', 'gi'), '');
        text = text.replace(new RegExp('</b>', 'gi'), '');
        text = text.replace(new RegExp(search_input, 'gi'), '<b>' + search_input + '</b>')
      }
      return text;
    }
  })

  Template.entry_form.events({
    'submit': function(event) {
      event.preventDefault();
      $input = $('input[name=entry_text')
      Entries.insert({text: $input.val(),connections:[{_id:234234,relType:"child"}]});
      //Entries.insert({text: $input.val(),connections:[{_id:234234,relType:"child"}]});
      $input.val('');
    }
  })

  Template.entry_center.helpers({
    filtered_entries: function() {
      if (Session.get("search_input")) {
        return Entries.find({text: {"$regex": Session.get("search_input")}}, {"$sort": {"$natural": -1}});
      } else {
        return Entries.find({}, {"$sort": {"$natural": -1}});
      }
    }
  });

  Template.entry_center.events({
    'keyup': function () {
      // increment the counter when button is clicked
      Session.set("search_input", $('input[name=search]').val());
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
