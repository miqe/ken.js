//because the test from  https://github.com/Miqe/ken.js/blob/master/test/ken.unit.js has no proofs of the pre-converted(test-case) dates are correct or not,
// i decided to create automated test which will start from some predefiend year and go trough predefined amount of year 


//concept taken from https://github.com/Zenysis/ethiopian-date/blob/master/test.js

//because the test result is too large to show it on command line change the output of the result to a file

const Ken = require('../ken').ken;
const assert = require('chai').assert;
const expect = require('chai').expect;

var year = 400;
var numDays = 365 * year +(year*3/4) ;
describe(`Test Gregorian to Ethiopian to Gregorain for ${year} years`, function () {    
    for (var i = 1; i < numDays; i++) {
      var date = new Date(1800, 0, i);
      var gregDate =date.toISOString().slice(0,10);
      var etDate = new Ken(gregDate).toEC().toString();
      var gcDate = new Ken(etDate).toGC().toString();
      it(`should convert ${gregDate} G.C to  E.C to ${etDate} and back to  ${gregDate}`, function () {
            assert.equal(gregDate, gcDate );
      });
    }
});