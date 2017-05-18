/**
 * @author  Mehari Geta <gmehari.edu@gmail.com> <m3hari> 
 * created on   ግንቦት 9 ፤ 2009 ዓ.ም , May 17 , 2017 
 * 
 * DISCLAIMER: Most of the test data for this package is directly adopted from 
 * similar purpose project  at 
 * [https://github.com/geezorg/geezorg.github.io/blob/master/Calendars/EthiopicCalendarTest.java] 
 
    * "The Amharic Letters of Emperor Theodore of Ethiopia to Queen Victoria and
    * Her Special Envoy", David Appleyard, Girma Selasse Asfaw, Oxford University Press, 
    * June 1 1979, ISBN: 0856726605, Longwood Pr Ltd
    *  
    * Ethiopic      Gregorian     JDN
    * 20/02/1855    29/10/1862    2401443
    * 29/10/1857    05/07/1865    2402423
    * 22/05/1858    29/01/1866    2402631
    * 10/08/1858    17/04/1866    2402709
    * 28/04/1859    05/01/1867    2402972
    * 05/05/1860    13/01/1868    2403345

     * Theses dates are taken from Calendrica applet:
	 *   http://emr.cs.iit.edu/home/reingold/calendar-book/Calendrica.html
	 * 
	 * Ethiopic      Gregorian       JDN
	 * 07/05/5492    01/01/0000    1721060
	 * 08/05/5493    01/01/0001    1721426
	 * 06/13/5499    27/08/0007    1723855
     * 
     * 06/13/0003    27/08/0011    1725316  first ethiopian leap year
     * 
**/

const Ken = require('../ken').ken;
const assert = require('chai').assert;
const expect = require('chai').expect;

let testData = [{
        et: "2009-09-08",
        gc: "2017-05-16"
    },
    {
        et: "2009-09-09",
        gc: "2017-05-17"
    },
    {
        et: "2009-09-10",
        gc: "2017-05-18"
    },
    {
        et: "1855-02-02",
        gc: "1862-10-29",
        jdn: 2401443
    },
    {
        et: "1857-10-29",
        gc: "1865-07-05",
        jdn: 2402423
    },
    {
        et: "1858-05-22",
        gc: "1866-01-29",
        jdn: 2402631
    },
    {
        et: "1858-08-10",
        gc: "1866-04-17",
        jdn: 2402709
    },
    {
        et: "1859-04-28",
        gc: "1867-01-05",
        jdn: 2402972
    },
    {
        et: "1860-05-05",
        gc: "1868-01-13",
        jdn: 2403345
    },
    {
        et: "5493-05-08",
        gc: "0001-01-01",
        jdn: 1721426
    },
    {
        et: "5499-13-06",
        gc: "0007-08-27",
        jdn: 1723855
    },
    {
        et: "0003-13-06",
        gc: "0011-08-27",
        jdn: 1725316
    },


];

function testToGC(testCase) {
    it(`should convert ${testCase.et} G.C to ${testCase.gc} E.C`, function () {
        let testEt = new Ken(testCase.et);
        let actual = testEt.toGC().toString();
        assert.equal(actual, testCase.gc);
    });
}

function testToEC(testCase) {
    it(`should convert ${testCase.gc} E.C to  ${testCase.et} G.C`, function () {
        let testGc = new Ken(testCase.gc);
        let actual = testGc.toEC().toString();
        assert.equal(actual, testCase.et);
    });
}

describe('Ken.js', function () {
    describe('converting to GC', function () {
        for (let i = 0; i < testData.length; i++) {
            testToGC(testData[i]);
        }
    });
    describe('converting to EC', function () {
        for (let i = 0; i < testData.length; i++) {
            testToEC(testData[i]);
        }
    });
});