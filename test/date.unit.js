if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var pure = require('../index');
}

describe("date.js", function () {
    describe("past()", function () {
        it("returns a date N years into the past", function () {

            var date = pure.date.past(75);
            assert.ok(date < new Date());
        });

        it("returns a past date when N = 0", function () {

            var refDate = new Date();
            var date = pure.date.past(0, refDate.toJSON());

            assert.ok(date < refDate); // date should be before the date given
        });

        it("returns a date N years before the date given", function () {

            var refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            var date = pure.date.past(75, refDate.toJSON());

            assert.ok(date < refDate && date > new Date()); // date should be before date given but after the current time
        });

    });

    describe("future()", function () {
        it("returns a date N years into the future", function () {

            var date = pure.date.future(75);

            assert.ok(date > new Date());
        });

        it("returns a future date when N = 0", function () {

            var refDate = new Date();
            var date = pure.date.future(0, refDate.toJSON());

            assert.ok(date > refDate); // date should be after the date given
        });

        it("returns a date N years after the date given", function () {

            var refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            var date = pure.date.future(75, refDate.toJSON());

            assert.ok(date > refDate && date < new Date()); // date should be after the date given, but before the current time
        });
    });

    describe("recent()", function () {
        it("returns a date N days from the recent past", function () {

            var date = pure.date.recent(30);

            assert.ok(date <= new Date());
        });

        it("returns a date N days from the recent past, starting from refDate", function () {

            var days = 30;
            var refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            var date = pure.date.recent(days, refDate);

            var lowerBound = new Date(refDate.getTime() - (days * 24 * 60 * 60 * 1000));

            assert.ok(lowerBound <= date, "`recent()` date should not be further back than `n` days ago");
            assert.ok(date <= refDate, "`recent()` date should not be ahead of the starting date reference");
        });

    });

    describe("soon()", function () {
        it("returns a date N days into the future", function () {

            var date = pure.date.soon(30);

            assert.ok(date >= new Date());
        });

        it("returns a date N days from the recent future, starting from refDate", function () {

            var days = 30;
            var refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            var date = pure.date.soon(days, refDate);

            var upperBound = new Date(refDate.getTime() + (days * 24 * 60 * 60 * 1000));

            assert.ok(date <= upperBound, "`soon()` date should not be further ahead than `n` days ago");
            assert.ok(refDate <= date, "`soon()` date should not be behind the starting date reference");
        });

    });

    describe("between()", function () {
        it("returns a random date between the dates given", function () {

            var from = new Date(1990, 5, 7, 9, 11, 0, 0);
            var to = new Date(2000, 6, 8, 10, 12, 0, 0);

            var date = pure.date.between(from, to);

            assert.ok(date > from && date < to);
        });
    });

    describe("arrayBetween()", function () {
        it("returns an array of 3 dates ( by default ) of sorted randoms dates between the dates given", function () {

            var from = new Date(1990, 5, 7, 9, 11, 0, 0);
            var to = new Date(2000, 6, 8, 10, 12, 0, 0);

            var dates = pure.date.arrayBetween(from, to );

            assert.ok(dates[0] > from && dates[0] < to);
            assert.ok(dates[1] > dates[0] && dates[2] > dates[1]);
        });
    });

    describe("month()", function () {
        it("returns random value from date.month.wide array by default", function () {
            var month = pure.date.month();
            assert.ok(pure.definitions.date.month.wide.indexOf(month) !== -1);
        });

        it("returns random value from date.month.wide_context array for context option", function () {
            var month = pure.date.month({ context: true });
            assert.ok(pure.definitions.date.month.wide_context.indexOf(month) !== -1);
        });

        it("returns random value from date.month.abbr array for abbr option", function () {
            var month = pure.date.month({ abbr: true });
            assert.ok(pure.definitions.date.month.abbr.indexOf(month) !== -1);
        });

        it("returns random value from date.month.abbr_context array for abbr and context option", function () {
            var month = pure.date.month({ abbr: true, context: true });
            assert.ok(pure.definitions.date.month.abbr_context.indexOf(month) !== -1);
        });

        it("returns random value from date.month.wide array for context option when date.month.wide_context array is missing", function () {
            var backup_wide_context = pure.definitions.date.month.wide_context;
            pure.definitions.date.month.wide_context = undefined;

            var month = pure.date.month({ context: true });
            assert.ok(pure.definitions.date.month.wide.indexOf(month) !== -1);

            pure.definitions.date.month.wide_context = backup_wide_context;
        });

        it("returns random value from date.month.abbr array for abbr and context option when date.month.abbr_context array is missing", function () {
            var backup_abbr_context = pure.definitions.date.month.abbr_context;
            pure.definitions.date.month.abbr_context = undefined;

            var month = pure.date.month({ abbr: true, context: true });
            assert.ok(pure.definitions.date.month.abbr.indexOf(month) !== -1);

            pure.definitions.date.month.abbr_context = backup_abbr_context;
        });
    });

    describe("weekday()", function () {
        it("returns random value from date.weekday.wide array by default", function () {
            var weekday = pure.date.weekday();
            assert.ok(pure.definitions.date.weekday.wide.indexOf(weekday) !== -1);
        });

        it("returns random value from date.weekday.wide_context array for context option", function () {
            var weekday = pure.date.weekday({ context: true });
            assert.ok(pure.definitions.date.weekday.wide_context.indexOf(weekday) !== -1);
        });

        it("returns random value from date.weekday.abbr array for abbr option", function () {
            var weekday = pure.date.weekday({ abbr: true });
            assert.ok(pure.definitions.date.weekday.abbr.indexOf(weekday) !== -1);
        });

        it("returns random value from date.weekday.abbr_context array for abbr and context option", function () {
            var weekday = pure.date.weekday({ abbr: true, context: true });
            assert.ok(pure.definitions.date.weekday.abbr_context.indexOf(weekday) !== -1);
        });

        it("returns random value from date.weekday.wide array for context option when date.weekday.wide_context array is missing", function () {
            var backup_wide_context = pure.definitions.date.weekday.wide_context;
            pure.definitions.date.weekday.wide_context = undefined;

            var weekday = pure.date.weekday({ context: true });
            assert.ok(pure.definitions.date.weekday.wide.indexOf(weekday) !== -1);

            pure.definitions.date.weekday.wide_context = backup_wide_context;
        });

        it("returns random value from date.weekday.abbr array for abbr and context option when date.weekday.abbr_context array is missing", function () {
            var backup_abbr_context = pure.definitions.date.weekday.abbr_context;
            pure.definitions.date.weekday.abbr_context = undefined;

            var weekday = pure.date.weekday({ abbr: true, context: true });
            assert.ok(pure.definitions.date.weekday.abbr.indexOf(weekday) !== -1);

            pure.definitions.date.weekday.abbr_context = backup_abbr_context;
        });
    });

});
