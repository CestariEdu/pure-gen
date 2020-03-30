var Pure = require('../lib');
var pure = new Pure({ locale: 'nl', localeFallback: 'en' });
pure.locales['nl'] = require('../lib/locales/nl');
pure.locales['en'] = require('../lib/locales/en');
module['exports'] = pure;
