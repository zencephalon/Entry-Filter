if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);
  Session.setDefault("current_idea", {parent_id: null});

  Template.idea.helpers({
    bolded_text: function() {
      text = this.text;
      // search_input = Session.get("search_input");
      // if (search_input) {
      //   text = text.replace(new RegExp('<b>', 'gi'), '');
      //   text = text.replace(new RegExp('</b>', 'gi'), '');
      //   text = text.replace(new RegExp(search_input, 'gi'), '<b>' + search_input + '</b>')
      // }
      return text;
    },

    // ideaNodeTextHtml: function() {

    // },
    splitted: function() {
      if (this.text !== undefined) {
        delims = ['--',':'];
        titleTxt = this.text.substr(0,80);
        for(i in delims) {
          titleTxt=titleTxt.substr(0,indexOf(delims[i]));
        }

        return {
                title: titleTxt,
                nontitle: this.text.substr(titleTxt.length)
              };
      }
    },

    title: function() {
      splitted = Template.idea.splitted();
      // console.log(splitted);
      if (splitted !== undefined) {
        return splitted[0];
      }
    }
    // title: function() {

    //   title=Template.idea.boldedText();


    //   splitted = Template.idea.splitted();
      // console.log(splitted);
    //   //if (splitted !== undefined) {
    //     return splitted[0].substr(80);
    //   //}
    // },
    // nontitle: function() {
    //   return this.splitted()[1];
    // }
  })

  Template.idea.events({
    'click a': function(event) {
      event.preventDefault();
      filter = Session.get("current_idea");
      filter = {};
      filter['parent_id'] = $(event.target).data("idea-id");
      Session.set("current_idea", filter);
    }
  })

  Template.idea_form.events({
    'submit': function(event) {
      event.preventDefault();
      $input = $('input[name=idea_text')

      Ideas.insert({text: $input.val(), parent_id: Session.get("current_idea")["parent_id"]});

      $input.val('');
    }
  })

  Template.idea_board.helpers({
    filtered_ideas: function() {
      query = Session.get("current_idea");
      if (Session.get("search_input")) {
        query.text = {"$regex": Session.get("search_input")}
      }
      // console.log('query',query);
      // console.log(Ideas.find(query, {"$sort": {"$natural": -1}}).fetch());
      return Ideas.find(query, {"$sort": {"$natural": -1}});
    },

    breadcrumb: function() {
      return Session.get("current_idea").parent_id;
      // breadcrumb=[]
      // breadcrumb.push(ideas.findOne())
      // while(parent!==null) {

      //   parent=findParent(parent_id).parent_id;
      // }
    }
  });

  Template.idea_board.events({
    'keyup': function () {
      // increment the counter when button is clicked
      Session.set("search_input", $('input[name=search]').val());
    }
  });
}