/**
 * Представление properties
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

'use strict';

Define( "app.properties.View", /** @lends {app.component} */{    
    extend: app.Component,
    
    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,


    init: function( prop ) {
        this._super();
        this.apply( prop );

        // Готовность модели.
        // Предполагается, что это события срабатывает после готовности документа
        var me=this;        
        this.model.on( 'load', function( e ) {                                  
            this.target=this.model.get("shapeCollection").get(0).target;
            var shape=this.target.properties;
            
            for(var i in shape){                
                this.makeGroup(shape[i], $('#property-panel') );
            }            
        }.bind( this ) );
    },
            
    makeGroup:function(gr,panel){
        var cont="<div><div style='background-color:#ccc;'><b>  + "+gr.name+"</b></div></div>";
        var el=panel.append(cont);
        
        for (var i in gr) if(i!=="name") {
             this.makeSubGroup(gr[i],el);
        }                        
    },
    makeSubGroup:function(item,panel){        
        var fields="";
        
        for(var i in item) if(i!=="name"){
            fields+="<div style='margin-left:7px;'>"+item[i].name+": <input value='"+this.target[i]+"' type='text' style='color:#000;font-size:12px;border:solid 0px;background-color:#d8d8d8;width:30px;' ></div>";
        }        
        if(!item.name) item.name="";       
        var e="<fieldset style='border:1px solid #ccc; width:81px;display:inline;padding:2px;margin:2px;'> <legend>"+item.name+"</legend>"+fields+"</fieldset>"
        var el=panel.append(e);
    }
    
});
