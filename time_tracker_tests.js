// Stub out setTimeout and clearTimeout
var timeouts = {},
  timeoutId = 0;

var runTimeouts = function () {
  _.each(timeouts, function (timeout, key) {
    delete timeouts[key];
    timeout();
  });
};

Meteor.clearTimeout = function (id) {
  delete timeouts[id];
};

Meteor.setTimeout = function (func) {
  timeouts[++timeoutId] = func;
  return timeoutId;
};

var testTimeTracker = function (test, dependOnTime) {
  var invalidations = 0;

  var existingTimeouts = Object.keys(timeouts).length;

  var handle = Tracker.autorun(function () {
    dependOnTime();
    invalidations++;
  });

  // Tracker should run once on startup
  test.equal(invalidations, 1);

  // After the timeout it should have run again
  runTimeouts();
  Tracker.flush();
  test.equal(invalidations, 2);

  // it should have registered another setTimeout
  test.equal(Object.keys(timeouts).length - existingTimeouts, 1);
  handle.stop();

  // the timeout should be cleared on invalidation
  test.equal(Object.keys(timeouts).length - existingTimeouts, 0);
};

Tinytest.add('time-tracker - changeIn', function (test) {
  testTimeTracker(test, function () {
    TimeTracker.changeIn(1000);
  });
});

Tinytest.add('time-tracker - changeAt', function (test) {
  testTimeTracker(test, function () {
    TimeTracker.changeAt(new Date());
  });
});
