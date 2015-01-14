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

var testInvalidations = function (){

};

Tinytest.add('time-tracker - changeIn', function (test) {
  var invalidations = 0;

  var handle = Tracker.autorun(function () {
    TimeTracker.changeIn(1000);
    invalidations++;
  });

  // Tracker should run once on startup
  test.equal(invalidations, 1);

  // After the timeout it should have run again
  runTimeouts();
  Tracker.flush();
  test.equal(invalidations, 2);

  // it should have registered another setTimeout
  test.equal(Object.keys(timeouts).length, 1);
  handle.stop();

  // the timeout should be cleared on invalidation
  test.equal(Object.keys(timeouts).length, 0);
});

Tinytest.add('time-tracker - changeAt', function (test) {
  var invalidations = 0;

  var handle = Tracker.autorun(function () {
    TimeTracker.changeAt(new Date());
    invalidations++;
  });

  // Tracker should run once on startup
  test.equal(invalidations, 1);

  // After the timeout it should have run again
  runTimeouts();
  Tracker.flush();
  test.equal(invalidations, 2);

  // it should have registered another setTimeout
  test.equal(Object.keys(timeouts).length, 1);
  handle.stop();

  // the timeout should be cleared on invalidation
  test.equal(Object.keys(timeouts).length, 0);
});
