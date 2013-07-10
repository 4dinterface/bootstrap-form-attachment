/**
 * Коллекция фигур
 * @class
 * @name app.model.ShapeCollection
 * @extends {app.Component}
 */
Define('core.data.ArrayCollection', /** @lends {app.model.ShapeCollection.prototype} */ {
    extend : core.Component,
    data:null,
    isCollection:true,

    /**
     * @constructor
     */
    init : function () {
        this.data=[];
        this._super();                   
    },  
                
    /**
     * @method set
     * @param {name} name
     * @param {value} value
     * @return null
     **/
    set : function (num, value) {                                
        this.data[i]=value;        
    },
            
    push : function (value) {                
        this.data.push(value);
        this.length=this.data.length;               
    },
       
    /**
     * @method get
     * @param {property} name
     * @param {value} value
     * @return null
     **/
    get : function (num) {            
        return this.data[num];        
    },  
    
    forEach:function(callback, context ) {
        this.data.forEach(callback, context );
    }
    
});

