/*        
*         Ken.js 
*         A Gregorian calendar to Ethiopic calendar converter and vice versa
*
*/
var ken = function(rawDate){
    //http://www.geez.org/Calendars/
    var getJDNFromEthiopic = function(date){
      var ethiopicOffset = 1723856;
      var year= date[0],month=date[1],day=date[2];
      var JDN = (ethiopicOffset + 365 ) + (365 * (year -1)) + (30 * month) + (day -31) + (Math.floor(year/4) );
      return JDN;
    };
    //http://www.geez.org/Calendars/
    var getEthiopicFromJDN = function(jdn){
      var ethiopicOffset = 1723856;
      var r = ((jdn - ethiopicOffset) % 1461);
      var n = ( r % 365 ) +  365 * Math.floor(r/1460) ;
      var year = ( 4 * Math.floor((jdn - ethiopicOffset)/1461) ) + Math.floor(r/365) - Math.floor(r/1460);
      var month  =  Math.floor( n/ 30 ) + 1 ;
      var day  = ( n % 30 ) + 1 ;
      return [year,month,day];
    };
    //http://www.cs.utsa.edu/~cs1063/projects/Spring2011/Project1/jdn-explanation.html
    var getJDNFromGregorian =function(date){
      var year=date[0];
      var month=date[1];
      var day=date[2];
      var a = Math.floor((14-month)/12);
      var y = Math.floor(year+4800-a);
      var m = month+12*a-3;
      var JDN = day + Math.floor((153*m+2)/5)+(365*y)+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;
      return JDN;
    };
    //http://www.csgnetwork.com/juliangregcalconv.html
    var getGregorianFromJDN =function(jdn){
        var julDate = jdn ;
        var z = Math.floor(julDate);
        var f = julDate - z;
        if (z < 2299161) {
          var A = z;
        }
        else {
          var omega = Math.floor((z-1867216.25)/36524.25);
          var A = z + 1 + omega - Math.floor(omega/4);
        }
        var B = A + 1524;
        var C = Math.floor((B-122.1)/365.25);
        var D = Math.floor(365.25*C);
        var Epsilon = Math.floor((B-D)/30.6001);
        var dayGreg = B - D - Math.floor(30.6001*Epsilon) + f;
        if (Epsilon < 14) {
          monthGreg = Epsilon - 1;
        }
        else {
          monthGreg = Epsilon - 13;
        }
        if (monthGreg > 2) {
          yearGreg = C - 4716;
        }
        else {
          yearGreg = C - 4715;
        }
        
        return [yearGreg,monthGreg,dayGreg];
    };
    //function to convert Ethipian calendar to Gregorian calendar
    var convertToGreg=function(date){
            var jdn = getJDNFromEthiopic([
              date.parsed.getFullYear(),
              date.parsed.getMonth()+1,
              date.parsed.getDate()
            ]);
            var date = getGregorianFromJDN(jdn);
            var isLeapYear=function(year){
              if((year%4==0 && year%100!=0)|| year%400==0){
                return true
              }
              else
                return false;
            };        	
            return {
                parsed:date.parsed,
                date:date,
                isLeapYear:function(){
                    return isLeapYear(this.date[0]);
                },
                getDate:function(){
                    return parseInt(this.date[2]);
                },
                getMonth:function(){
                    return parseInt(this.date[1]);   
                },
                getFullYear:function(){
                    return parseInt(this.date[0]);   
                },
                toString:function(){
                    return this.date[0]+"-"+((this.date[1]/10)>=1?this.date[1]:"0"+this.date[1])+"-"+((this.date[2]/10)>=1?this.date[2]:"0"+this.date[2]);
                },
                getDateInstance:function(){
                    return new Date(this.date.toString())
                },
                getMonthDate:function(){
                    var tempInstance = this.getDateInstance();
                    tempInstance.setMonth(tempInstance.getMonth() +1);
                    tempInstance.setDate(0);
                    return tempInstance.getDate();
                }
            };
        };
        //function to convert Gregorian calendar to Ethiopian calendar
        var convertToEt=function(date){
            var jdn = getJDNFromGregorian([
              date.parsed.getFullYear(),
              date.parsed.getMonth()+1,
              date.parsed.getDate()
            ]);
            var date = getEthiopicFromJDN(jdn);
            //calculates leapyear for eth calendar
            var isLeapYear=function(year){
              year = year + 1;
              if((year%4==0 && year%100!=0)|| year%400==0){
                return true
              }
              else
                return false;
            };
        
            return {
                parsed:date.parsed,
                date:date,
                isLeapYear:function(){
                    return isLeapYear(this.date[0]);
                },
                getDate:function(){
                    return parseInt(this.date[2]);
                },
                getMonth:function(){
                    return parseInt(this.date[1]);   
                },
                getFullYear:function(){
                    return parseInt(this.date[0]);   
                },
                toString:function(){
                    return this.date[0]+"-"+((this.date[1]/10)>=1?this.date[1]:"0"+this.date[1])+"-"+((this.date[2]/10)>=1?this.date[2]:"0"+this.date[2]);
                },
                getMonthDate:function(){
                    if(this.date[1] == 13){
                        if(this.isLeapYear()){
                            return 6;
                        }else{
                            return 5;
                        }
                    }else{
                        return 30;
                    }
                }
            };
        };
        function toEt(){
            return convertToEt(this);
        };

        function toGreg(){
            return convertToGreg(this);
        };


        function getEt(){            
            return convertToEt(generateDateObjcet(parseFromString(convertToGreg(this).toString())));
        };

        function getGreg(){
            return convertToGreg(generateDateObjcet(parseFromString(convertToEt(this).toString())));
        };


        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
        function IllegalArgumentException(eMessage) {
            this.name = "IllegalArgumentException";
            this.message = eMessage || 'Invalid date supplied, try YYYY-MM-DD format';
            this.stack = (new Error()).stack;
        }
        IllegalArgumentException.prototype = Object.create(Error.prototype);
        IllegalArgumentException.prototype.constructor = IllegalArgumentException;

      
      function generateDateObjcet(date){
            return {
                parsed:{
                    date:date,
                    getDate:function(){
                        return parseInt(this.date[2]);
                    },
                    getMonth:function(){
                        return parseInt(this.date[1]);   
                    },
                    getFullYear:function(){
                        return parseInt(this.date[0]);   
                    }
                },
                toGC:toGreg,
                toEC:toEt,
                getGC:getGreg,
                getEC:getEt
            }
        }

        
       //http://stackoverflow.com/a/10638617/2147627
       function parseFromString(date){
            var y = date.substr(0,4),
                m = date.substr(5,2) - 1,
                d = date.substr(8,2);
            if( (!isNaN(y) && !isNaN(m) && !isNaN(d))){
                return [y,m,d];
            }else{
                throw  new IllegalArgumentException();
            }            
       }


       function parseFromDate(date){
            var y = date.getFullYear(),
                m = date.getMonth(),
                d = date.getDate();
            if( (y && m && d) != null){
                return [y,m,d];
            }else{
                throw  new IllegalArgumentException();
            }
       }
       function parseFromKen(kenDate){
           if(kenDate.date){
                return kenDate.date;
           }
            
            throw  new IllegalArgumentException();
       }

        if(typeof rawDate == "object"){
            if(rawDate instanceof Date)
                return generateDateObjcet(parseFromDate(rawDate));
            else 
                return generateDateObjcet(parseFromKen(rawDate));
        }else if(typeof rawDate == "string"){
            return generateDateObjcet(parseFromString(rawDate));
        }else if(typeof rawDate == "undefined"){
            return generateDateObjcet(parseFromDate(new Date()));
        }
        throw  new IllegalArgumentException("invalid parameter");  
}

//the if statment is to make it compatible with the browser and node.js environment. 
if (typeof exports !== 'undefined') {
   exports.ken = ken
}