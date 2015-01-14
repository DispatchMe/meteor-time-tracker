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

Checkout the [example](https://github.com/DispatchMe/meteor-time-tracker/tree/master/example).
