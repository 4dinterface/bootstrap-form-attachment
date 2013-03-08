//array collection пока ещё в работе

Define('app.ArrayCollection',{                    
    extend:app.Component,                                
        ToUint32:function(value) {
	    return value >>> 0;
	 },

	
	getMaxIndexProperty:function(object) {                        
            function ToUint32(value) {
                return value >>> 0;
            };
            
            var maxIndex = -1, isValidProperty,me=this;

            var MAX_SIGNED_INT_VALUE = Math.pow(2, 32) - 1,
	      hasOwnProperty = Object.prototype.hasOwnProperty;
            
	
            for (var prop in object) {
                
	      isValidProperty = (
	        String(ToUint32(prop)) === prop &&
	        ToUint32(prop) !== MAX_SIGNED_INT_VALUE &&
	        hasOwnProperty.call(object, prop));
	
	      if (isValidProperty && prop > maxIndex) {
	        maxIndex = prop;
	      }
	    }
            return maxIndex;
        },
            
	init:function (prop){                      
            this.initLength();
            this.initToString();
            var me=this
            var ret=Object.create(Array.prototype,{
                initLength: {
                  value: me.initLength
                },
                
                getMaxIndexProperty:{
                    value: me.getMaxIndexProperty
                },
                ToUint32: {
                    value :function (value){
                        return value >>> 0;
                    }
                }         
            });
            
            ret.initLength();
            //ret.y
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
        
        initToString:function(){
        /*    var me=this;
            Object.defineProperty(this, "toString", {
              get: function() {
                  //return Array.prototype.join;
                  alert("ghbdtn");
                  return Object.prototype.toString(me);
	      }              
            });        
            */
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