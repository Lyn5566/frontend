;(function(){
    'use strict';

    let is = {

         numeric(value){
            return !isNaN(parseFloat(value));
        },
        min(value,minValue){
            if(!this.numeric(value))
                return false;

                return value>=minValue;
            
        },
        max(value,maxValue){
            if(!this.numeric(value))
            return false;

            return value<=maxValue;
        },
        between(value,min,max){
            return value>=min && value<=max;
        },
        positive(value){
            if(!this.numeric(value))
            return false;

            return value>0;
        },
        negative(value){
            if(!this.numeric(value))
            return false;

            return value<0;
        },

        
    };
    console.log(is.numeric(12));
    console.log(is.min(12,13));
    console.log(is.max(12,13));


})();