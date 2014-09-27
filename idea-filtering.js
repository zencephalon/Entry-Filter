if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);
  Session.setDefault("current_filter", {parent_id: null});

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
    },

    // entryNodeTextHtml: function() {

    // },
    // splitted: function() {
    //   //if (this.text !== undefined) {
    //     delims=['--',':'];
    //     titleTxt=this.text.substr(0,80);
    //     for(i in delims) {
    //       titleTxt=titleTxt.substr(0,indexOf(delims[i]));
    //     }

    //     return {title:titleTxt,nontitle:this.text.substr(titleTxt.length)};
    //   //}
    // },
    // title: function() {
      
    //   title=Template.entry.boldedText();
      

    //   splitted = Template.entry.splitted();
    //   console.log(splitted);
    //   //if (splitted !== undefined) {
    //     return splitted[0].substr(80);
    //   //}
    // },
    // nontitle: function() {
    //   return this.splitted()[1];
    // }
  })

  Template.entry.events({
    'click a': function(event) {
      event.preventDefault();
      filter = Session.get("current_filter");
      filter = {};
      filter['parent_id'] = $(event.target).data("idea-id");
      Session.set("current_filter", filter);
    }
  })

  Template.entry_form.events({
    'submit': function(event) {
      event.preventDefault();
      $input = $('input[name=entry_text')

      Entries.insert({text: $input.val(), parent_id: Session.get("current_filter")["parent_id"]});

      $input.val('');
    }
  })

  Template.entry_center.helpers({
    filtered_entries: function() {
      query = Session.get("current_filter");
      if (Session.get("search_input")) {
        query[text] = {"$regex": Session.get("search_input")}
      }
      return Entries.find(query, {"$sort": {"$natural": -1}});
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
