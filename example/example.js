if (Meteor.isClient) {
  Template.example.helpers({
    now: function () {
      TimeTracker.changeIn(1000);
      return moment().format('h:mm:ss a');
    }
  });
}
