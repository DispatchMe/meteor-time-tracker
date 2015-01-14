Package.describe({
  summary: 'Time-based reactivity.'
});

Package.onUse(function (api) {
  api.use('tracker', 'web');

  api.addFiles('time_tracker.js', 'web');

  api.export('TimeTracker', 'web');
});
