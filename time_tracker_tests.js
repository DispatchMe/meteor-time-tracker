Tinytest.addAsync('time-tracker - changeIn', function (test, complete) {

  var invalidations = 0;

  var handle = Tracker.autorun(function () {
    TimeTracker.changeIn(1000);
    invalidations++;
  });

  Kernel.timed(function() {
    test.equal(invalidations, 1);
  }, Kernel.now() + 1000);

  Kernel.timed(function() {
    test.equal(invalidations, 2);

    handle.stop();
    complete();
  }, Kernel.now() + 2000);

});

Tinytest.addAsync('time-tracker - changeAt', function (test, complete) {
  var invalidations = 0;

  var handle = Kernel.autorun(function () {
    TimeTracker.changeAt(new Date());
    invalidations++;
  });

  var firstFrame = 0;

  Kernel.run(function(timestamp, lasttime, frame) {
    firstFrame = frame;
    test.equal(invalidations, 1);
  });

  Kernel.timed(function(runAt, timestamp, lasttime, frame) {
    // console.log(frame - firstFrame + 1, invalidations);

    // There should be the same amount of invalidations as frames
    //test.equal(invalidations, frame - firstFrame + 1, 'Make sure your system is ready');
    test.isTrue(invalidations > 20, 'Make sure your system is ready');

    handle.stop();
    complete();
  }, Kernel.now() + 2000);
});
