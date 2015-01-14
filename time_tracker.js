TimeTracker = {};

/**
 * Invalidate a computation at a specific date.
 * XXX Unit Test
 * @param date
 */
TimeTracker.changeAt = function (date) {
  var millisecondsFromNow = date.getTime() - (new Date()).getTime();
  TimeTracker.changeIn(millisecondsFromNow);
};

var FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;

/**
 * Invalidate a computation at a specific time.
 * NOTE: We ignore times > 48 hours from now because it is
 * unlikely the app will still be running for that long.
 * If we run into a long running application we can make this configurable.
 * XXX Unit Test
 * @param milliseconds The number of milliseconds before
 *                     triggering the dependency changed.
 */
TimeTracker.changeIn = function (milliseconds) {
  if (milliseconds < 0 || milliseconds > FORTY_EIGHT_HOURS) return;

  var dependency = new Tracker.Dependency();
  dependency.depend();

  var timeout = null;
  timeout = Meteor.setTimeout(function () {
    dependency.changed();
    timeout = null;
  }, milliseconds);

  // Clean up the timeout when there is no longer a dependency.
  Tracker.onInvalidate(function () {
    if (timeout && !dependency.hasDependents()) {
      Meteor.clearTimeout(timeout);
    }
  });
};
