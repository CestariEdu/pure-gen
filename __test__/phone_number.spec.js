var assert = require('assert');
var sinon = require('sinon');
var pure = require('../index');

describe("phone_number.js", function () {
    describe("phoneNumber()", function () {
        it("returns a random phoneNumber with a random format", function () {
            sinon.spy(pure.helpers, 'replaceSymbolWithNumber');
            var phone_number = pure.phone.phoneNumber();

            assert.ok(phone_number.match(/\d/));
            assert.ok(pure.helpers.replaceSymbolWithNumber.called);

            pure.helpers.replaceSymbolWithNumber.restore();
        });
    });

    describe("phoneNumberFormat()", function () {
        it("returns phone number with requested format (Array index)", function () {
            pure.locale = "en";
            for (var i = 0; i < 10; i++) {
              var phone_number = pure.phone.phoneNumberFormat(1);
              assert.ok(phone_number.match(/\(\d\d\d\) \d\d\d-\d\d\d\d/));
            }
        });

        it("returns phone number with proper format US (Array index)", function () {
            pure.locale = "en";
            for (var i = 0; i < 25; i++) {
              var phone_number = pure.phone.phoneNumberFormat(1);
              assert.ok(phone_number.match(/\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/));
            }
        });

        it("returns phone number with proper format CA (Array index)", function () {
            pure.locale = "en_CA";
            for (var i = 0; i < 25; i++) {
              var phone_number = pure.phone.phoneNumberFormat(1);
              assert.ok(phone_number.match(/\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/));
            }
        });

    });

});