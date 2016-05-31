# ken.js ቀን.ጄስ
#A very lightweight gregorian to Ethiopian calendar converter and vice versa.

#Very easy to use
var ken = new Ken();

To change Gregorian date to Ethiopian date

ken.toEth(new Date());
//or
ken.toEth("01-12-2016");

It will add toEth method to javascript date object automatically hence, making it easier to use

var today = new Date();
today.toEth();

To change Ethiopian date to Gregorian date

ken.toGreg("11-09-2016");

