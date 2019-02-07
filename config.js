'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL ||
    "mongodb://my-new-user:mnu_pw-001@ds255794.mlab.com:55794/goals"

exports.TEST_DATABASE_URL || 
    "mongodb://localhost/goals-app;"

global.DATABASE_URL ||
    'mongodb://localhost/goals-app';

exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
