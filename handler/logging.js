// Absolutely no idea how to import this thing global
const log = require('custom-logger').config({format: '[%timestamp%] [%event%]%message%'});

module.exports = log.new({
  info: { color: 'cyan', level: 0, event: 'INFO' },
  notice: { color: 'orange', level: 1, event: 'NOTICE' },
  warn: { color: 'yellow', level: 2, event: 'WARN' },
  error: { color: 'red', level: 3, event: 'ERROR' }
});
