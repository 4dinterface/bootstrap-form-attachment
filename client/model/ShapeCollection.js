// Верхний уровень, по сути коллекция shape, содержимое пока доступно как массив
/*if (!app.model) app.model={};

app.model.Timeline=function(){
    var data=[];
    return data;
};*/
/**
 * Коллекция фигур
 * @class
 * @name app.model.ShapeCollection
 * @extends {app.Component}
 */
Define('app.model.ShapeCollection', /** @lends {app.model.ShapeCollection.prototype} */ {
    extend : app.Component,
    data:null,

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
        this.fire("timelinechange", {
            name:name,
            value:value
        });
        
        if(value.on) value.on('bubble',function(e){
            me.fire(e.eventName,e);
        })

    },
            
    push : function (value) {        
        
        var me=this;
        this.data.push(value);
        this.length=this.data.length;       
        
        this.fire("timelinechange", {
            name:this.length,
            value:value
        });
        
        if(value.on) value.on('bubble',function(e){
            me.fire(e.eventName,e);
        })

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
    
    forEach:function(callback){
        this.data.forEach(callback)
    }
    
});

