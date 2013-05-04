//array collection пока ещё в работе

Define('app.ArrayCollection',{                    
    extend:app.Component,                                
    
        ToUint32:function(value) {
	    return value >>> 0;
	 },

	
	getMaxIndexProperty:function(object) {                        
    //        function ToUint32(value) {
      //          return value >>> 0;
        //    };
            var me=this;
            
            var maxIndex = -1, isValidProperty,me=this;

            var MAX_SIGNED_INT_VALUE = Math.pow(2, 32) - 1,
	      hasOwnProperty = Object.prototype.hasOwnProperty;
            
	
            for (var prop in object) {
                
	      isValidProperty = (
	        String(me.ToUint32(prop)) === prop &&
	        me.ToUint32(prop) !== MAX_SIGNED_INT_VALUE &&
	        hasOwnProperty.call(object, prop));
	
	      if (isValidProperty && prop > maxIndex) {
	        maxIndex = prop;
	      }
	    }
            return maxIndex;
        },
            
	init:function (prop){    

            this.event={};
        
            var prep={};
            for (i in this){
                prep[i]={ value:this[i] }
            }
            
            var ret=Object.create(Array.prototype,prep);            
            ret.initLength();
            
            return ret;                        
        },
        
        initLength:function(){
            Object.defineProperty(this, "length", {
              get: function() {
	        var maxIndexProperty = +this.getMaxIndexProperty(this);
	        return Math.max(length, maxIndexProperty + 1);
              },
              set: function(value) {
	        var constrainedValue = this.ToUint32(value);
	        if (constrainedValue !== +value) {
	          throw new RangeError();
	        }
	        for (var i = constrainedValue, len = this.length; i < len; i++) {
	          delete this[i];
	        }
	        length = constrainedValue;
	      }
            });        
        },
        
        
        
        toString:function(){
            var str="";
            
            for (i in this) if (i*1){
                t=typeof( this[i]  );
                
                if( t=="string")str+="'"+this[i]+"', ";                                
                else str+=this[i]+", ";
            }
            
            return "["+str+"]";            
        }
        
        
        //toString :function(){}//?
});