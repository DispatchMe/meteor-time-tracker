TimeTracker = {};

var _msFromNow = function(date) {
  return date.getTime() - (new Date()).getTime();
};

var _getTomorrow = function() {
  var t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1, 0, 0, 0);
};

// Reactive variable tracking the date of today
var _trackToday = new ReactiveVar(new Date());

/**
 * Provides a nice reactive function with the date of today
 * @return {Date}
 */
TimeTracker.today =function() {
  return _trackToday.get();
};

/**
 * Invalidate a computation at a specific date.
 * @param {Date} date
 */
TimeTracker.changeAt = function (date) {
  TimeTracker.changeIn(_msFromNow(date));
};

var FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;

/**
 * Invalidate a computation at a specific time.
 * NOTE: We ignore times > 48 hours from now because it is
 * unlikely the app will still be running for that long.
 * If we run into a long running application we can make this configurable.
 * @param {Number} milliseconds The number of milliseconds before
 * triggering that the dependency changed.
 */
TimeTracker.changeIn = function (milliseconds) {
  if (milliseconds < 0 || milliseconds > FORTY_EIGHT_HOURS) {
    return;
  }

  var dependency = new Tracker.Dependency();
  dependency.depend();

  function changeIn(runAt) {
    if (dependency) {

      // Invalidate dependency
      dependency.changed();

      // Run again
      Kernel.timed(changeIn, runAt + milliseconds);
    }
  }

  // Initial run x milliseconds from now
  Kernel.timed(changeIn, Kernel.now() + milliseconds);

  // Clean up the timeout when there is no longer a dependency.
  Tracker.onInvalidate(function () {
    if (!dependency.hasDependents()) {
      dependency = null;
    }
  });
};

/**
 * Invalidation rutine for the reactive "_trackToday"
 */
var _invalidateToday = function _invalidateToday() {
  // Update the reactive today
  _trackToday.set(new Date());

  // Run the timed function when we enter tomorrow
  Kernel.timed(_invalidateToday, Kernel.now() + _msFromNow(_getTomorrow()));
};

// Run the timed function when we enter tomorrow
Kernel.timed(_invalidateToday, Kernel.now() + _msFromNow(_getTomorrow()));
