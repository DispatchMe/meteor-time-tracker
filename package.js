Package.describe({
  name: 'dispatch:time-tracker',
  summary: 'Time-based reactivity.',
  version: '1.0.0',
  git: 'https://github.com/DispatchMe/meteor-time-tracker.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');

  api.use('tracker', 'web');

  api.addFiles('time_tracker.js', 'web');

  api.export('TimeTracker', 'web');
});

Package.onTest(function (api) {
  api.use(['tinytest', 'tracker', 'dispatch:time-tracker'], 'web');

  api.addFiles('time_tracker_tests.js', 'web');
});
