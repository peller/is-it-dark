const suncalc = require('suncalc'),
    http = require('http'),
    https = require('https');

exports.main = function (params) {
  const now = new Date(), nowISO = now.toISOString(),
    times = suncalc.getTimes(now, params.latitude, params.longitude),
    isDark = nowISO < times.sunrise || nowISO > times.sunset;

  if (isDark && params.url) {
      (params.url.match('^https:') ? https : http).get(params.url);
  }

  return {result: isDark};
};
