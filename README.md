Time Tracker [![Build Status](https://travis-ci.org/DispatchMe/meteor-time-tracker.svg?branch=master)](https://travis-ci.org/DispatchMe/meteor-time-tracker)
=============

Invalidate a reactive function based on time.

##Usage

`meteor add dispatch:time-tracker`

```
// This will re-run every second.
Tracker.autorun(function () {
  TimeTracker.changeIn(1000);
});
```
or

```
// This will re-run at some date (once).
Tracker.autorun(function () {
  TimeTracker.changeAt(someDate);
});
```

Default reactive variable:
```
Tracker.autorun(function () {
  // This will point at the current day and will invalidate on
  // day shift - its not the same values as `Date.now()`
  // TimeTracker.today will only update once a day
  TimeTracker.today();
});  
```

Checkout the [example](https://github.com/DispatchMe/meteor-time-tracker/tree/master/example).
