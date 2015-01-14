Time Tracker [![Build Status](https://travis-ci.org/DispatchMe/meteor-time-tracker.svg?branch=master)](https://travis-ci.org/DispatchMe/meteor-time-tracker)
=============

This allows you to easily invalidate the computation of a reactive function based on time.

##Usage
```
TimeTracker.changeIn(1000); // 1 second
```
or

```
TimeTracker.changeAt(someDate);
```

Checkout the [example](https://github.com/DispatchMe/meteor-time-tracker/tree/master/example).
