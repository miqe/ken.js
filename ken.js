/*        
*         Ken.js 
*         A lightweight gregorian to Ethiopian calendar converter and vice versa
*
*         ***********With Love from Miqe***********
*/
var ken = function(rawDate){
    //function to convert Ethipian calendar to Gregorian calendar
        var convertToGreg=function(date){
            var dd =date.parsed.getDate();
            var mm =date.parsed.getMonth()+1;
            var yy =date.parsed.getFullYear();

            //if month is 13 change it to 12 + day
            if(mm==13){
                mm=12;
                dd=30+dd;
            }
            //calculates leap year for greg calendar
        	var isLeapYear=function(year){
        		if((year%4==0 && year%100!=0)|| year%400==0){
        			return true
        		}
        		else
        			return false;
        	}	
        	//starts with sept(9th month) or meskerem in eth calendar
        	var gregDateDiff =   [10,10,9 ,9 ,8,7,9,8,8,7,7,6];
        	//
            var dayChangePoint = [21,22,22,23,24,22,23,23,24,24,25,26];
        	//check the year for leap year and then set values
            if(isLeapYear(yy)){
        		gregDateDiff =   [11,11,10,10,9,8,9,8,8,7,7,6];
        		dayChangePoint = [20,21,21,22,23,22,23,23,24,24,25,26];
        	}
            //Days in a month for greg calendar
            //Position of the Ethiopian month is based on Ethiopian calendar eg: sept(09)->Meskerem(01)
            var gregMonthDays =  [30,31,30,31,31,(isLeapYear(yy)?29:28),31,30,31,30,31,31];
            //This function calculates the date to be added
            var addDate = function(dd,diff,index){
            	if((dd+diff) < gregMonthDays[index]){
            		return dd+diff;
            	}else if((dd+diff) == gregMonthDays[index]){
        			return dd+diff;
            	}else{
            		return ((dd+diff)%gregMonthDays[index])
            	} 
            }
            //This function calculates the months to be added
            var addMonth = function(mm,diff){
            	if((mm + diff) <= 12)
            		return mm+diff;
            	else
            		return ((mm+diff)%12);
            }
            //default year diffrence to add. 
            var yearDiff= 7;
            //check for the month and day and if it is greater than the new year 
            //then the it will add 1 to year diffrence
            if(parseFloat(mm+""+dd)>=422){
            	yearDiff=yearDiff+1;
            }
            var dateDiff= 0;	
            var monthDiff= 8;
            var _dd=0,_mm=0,_yy=0;

            //this section checks for dates to get the turning point
            if(dd < dayChangePoint[mm-1]){
                dateDiff=gregDateDiff[mm-1];
            	_dd=addDate(dd,dateDiff,mm-1)
            }else if(dd == dayChangePoint[mm-1]){dateDiff=gregDateDiff[mm-1];
            	_dd=addDate(dd,dateDiff,mm-1)
            	monthDiff=monthDiff+1;
            }else{dateDiff=gregDateDiff[mm-1];
            	_dd=addDate(dd,dateDiff,mm-1)
            	monthDiff=monthDiff+1;
            }

         	_mm = addMonth(mm,monthDiff);	
        	_yy = yy+yearDiff;

           
            return {
                parsed:date.parsed,
                date:[_yy,_mm,_dd],
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
                    return this.date[0]+"-"+((this.date[1]/10)>1?this.date[1]:"0"+this.date[1])+"-"+((this.date[2]/10)>1?this.date[2]:"0"+this.date[2]);
                },
                getDateInstance:function(){
                    return new Date(this.date.toString())
                }
            };
        }
        //function to convert Gregorian calendar to Ethiopian calendar
        var convertToEt=function(date){
            var dd =date.parsed.getDate();
            var mm =date.parsed.getMonth()+1;
            var yy =date.parsed.getFullYear();

            //calculates leapyear for eth calendar
        	var isLeapYear=function(year){
        		year = year + 1;
        		if((year%4==0 && year%100!=0)|| year%400==0){
        			return true
        		}
        		else
        			return false;
        	}	
        	//starts with Jan(9th month) or Tahisas in eth calendar
        	// var gregDateDiff =   [10,10,9 ,9 ,8,7,9,8,8,7,7,6];
        	var ethDateDiff =    [21,22,21,22,22,23,23,24,25,20,21,21];	
            //The dates that Ethiopian calendar turn to 1 on gregorian calendar
        	var dayChangePoint = [10,9,10,9,9,8,8,7,11,11,10,10];
            //check the year for leap year and then set values
            if(isLeapYear(yy)){
        	    ethDateDiff =    [22,23,21,22,22,23,23,24,25,20,21,21];
        		dayChangePoint = [9,8,10,9,9,8,8,7,12,11,10,10];
        	}
            //Days in a month for ethiopian calendar
            //Hamle and Puagme are merged
            //Position of the Ethiopian month is based on gregorian calendar eg: Meskerem(01)->sept(09)
            var ethMonthDays =  [30,30,30,30,30,30,30,30,(isLeapYear(yy)?36:35),30,30,30];
            //This function calculates the date to be added
            var addDate = function(dd,diff,index){
            	if((dd+diff) < ethMonthDays[index]){
            		return dd+diff;
            	}else if((dd+diff) == ethMonthDays[index]){
        			return dd+diff;
            	}else{
            		return ((dd+diff)%ethMonthDays[index])
            	} 
            }
            //This function calculates the months to be added
            var addMonth = function(mm,diff){
            	if((mm + diff) <= 12)
            		return mm+diff;
            	else
            		return ((mm+diff)%12);
            }
            //default year diffrence to add. 
            var yearDiff= 8;
            //check for the month and day and if it is greater than the new year 
            //then the it will add 1 to year diffrence
            if(parseFloat(mm+""+dd)>=(isLeapYear(yy)?912:911)){
            	yearDiff=yearDiff-1;
            }

            var dateDiff= 0;	
            //default month difference when counted from the end
            var monthDiff= 3;
            var _dd=0,_mm=0,_yy=0;
            //this section checks for dates to get the turning point
            if(dd < dayChangePoint[mm-1]){
            	dateDiff=ethDateDiff[mm-1];
            	_dd=addDate(dd,dateDiff,mm-1)
            }else if(dd == dayChangePoint[mm-1]){
        		dateDiff=ethDateDiff[mm-1];
            	_dd=addDate(dd,dateDiff,mm-1)
            	monthDiff=monthDiff+1;
            }else{ 
            	dateDiff=ethDateDiff[mm-1];
            	_dd=addDate(dd,dateDiff,mm-1)
            	monthDiff=monthDiff+1;
            }
        	_mm = addMonth(mm,monthDiff);	 
        	_yy = yy-yearDiff;


            if(_mm==12 && _dd>30){
                _mm=13;
                _dd=_dd%30;
            }

            return {
                parsed:date.parsed,
                date:[_yy,_mm,_dd],
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
                    return this.date[0]+"-"+((this.date[1]/10)>1?this.date[1]:"0"+this.date[1])+"-"+((this.date[2]/10)>1?this.date[2]:"0"+this.date[2]);
                }
            };
        }
        function toEt(){
            return convertToEt(this);
        };

        function toGreg(){
            return convertToGreg(this);
        };


        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
        function IllegalArgumentException(eMessage) {
            this.name = "IllegalArgumentException";
            this.message = eMessage || 'Invalid date supplied';
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
                toEC:toEt
            }
        }

        
       //http://stackoverflow.com/a/10638617/2147627
       function parseFromString(date){
            var y = date.substr(0,4),
                m = date.substr(5,2) - 1,
                d = date.substr(8,2);

            if( (y && m && d) != null){
                return [y,m,d];
            }else{
                throw  new IllegalArgumentException();
            }            
       }


       function parseFromDate(date){
            var y = date.getFullYear(),
                m = date.getMonth()+1,
                d = date.getDate();
            if( (y && m && d) != null){
                return [y,m,d];
            }else{
                throw  new IllegalArgumentException();
            }
       }
       function parseFromKen(date){
           if(date.parsed){
                var y = date.parsed.getFullYear(),
                    m = date.parsed.getMonth(),
                    d = date.parsed.getDate();
                if( (y && m && d) != null){
                    return [y,m,d];
                }
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
        }
        throw  new IllegalArgumentException("invalid parameter");  
}

