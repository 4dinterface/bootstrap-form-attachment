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
            var shape=this.model.get("shapeCollection").get(0).target.properties;
            for(var i in shape){                
                this.makeGroup(shape[i], $('#property-panel') );
            }            
        }.bind( this ) );
    },
            
    makeGroup:function(gr,panel){
        var cont="<div><div style='background-color:#ccc;'><b>  + "+gr.name+"</b></div></div>";
        var el=panel.append(cont);
        
        for (i in gr) if(i!=="name") {
             this.makeSubGroup(gr[i],el);
        }                        
    },
    makeSubGroup:function(item,panel){        
        var fields="";
        
        for(var i in item) if(i!=="name"){
            fields+=(item[i].name+": <input type='text' style='color:#773;font-size:11px;border:solid 0px;background-color:#d8d8d8;width:35px;' ><br/>");
        }        
        if(!item.name) item.name="";       
        var e="<fieldset style='border:1px solid #ccc; width:80px;display:inline;padding:2px;margin:2px;'> <legend>"+item.name+"</legend>"+fields+"</fieldset>"
        var el=panel.append(e);
    }
});
