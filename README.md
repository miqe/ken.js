
#  Ken.js (ቀን.ጄኤስ)
## A date converter which uses pattern based algorithm to convert ethiopian date to gregorian and vice versa
### Ethiopian Date converter
#### it works for both the browser and node.js


### Installation :
```sh
$ npm install ken.js --save
```
or
```sh
$ bower install ken.js --save
```

### usage:

##### To convert Gregorian Date to Ethiopian:
```
  // using date object
  var converter = new ken(new Date());
  
  // or using plain string
  var converter = new ken("2017-04-15");
   
  converter.toEC().toString(); //output: "2009-08-07"
```
##### To convert Ethiopian Date to Gregorian:
```
  
  var converter = new ken("2009-08-07");
  
   
  converter.toGC().toString(); //output: "2009-08-07"
  //to get a javascript date object
  converter.toGC().getDateInstance(); //output: converter.toGC().getDateInstance()
```

##### to convert to Ethiopian directly from date object:

```
//add toEC to Date object
Date.prototype.toEC=function(){
    return ken(this).toEC();
}

//then simply do
var today = new Date();
today.toEC().toString(); 
```

### Testing:
```sh
$ npm test  > test-result.log 2>&1
```
##### i.e because the test usecase uses iteration, please change the output of the test to a file.

