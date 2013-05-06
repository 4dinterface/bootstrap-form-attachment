/**
 * Представление properties
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

'use strict';

Define( "app.properties.View", /** @lends {app.component} */ {
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
            //берём в качестве теста первый shape в коллекции
            this.target=this.model.get("shapeCollection").get(0).target;
            //получаем ссылку на shape
            var shape=this.target.properties;

            //перебераем все группы в shape
            for(var i in shape){                
                this.makeGroup(shape[i], $('#property-panel') );
            }            
            
        }.bind( this ) );
    },

    // создадим группу
    makeGroup:function(gr,panel){
        //Создадим группу
        var cont="<div style='background-color:#ccc;' widget='slidePanel'> <b>" + gr.name + "</b></div>";
        var el=panel.append(cont);
        
        //Создадим вложенные подгруппы
        for (var i in gr.items) if(i!=="name") {
             this.makeSubGroup(gr.items[i],el);
        }        
    },

    // создадим подгруппу
    makeSubGroup:function(item,panel){
        var fields="";

        for(var i in item.items) if(i!=="name"){
            fields+="<div style='margin-left:7px;'>"+item.items[i].name+": <input value='"+this.target[i]+"' type='text' style='color:#000;font-size:12px;border:solid 0px;background-color:#d8d8d8;width:30px;' ></div>";
        }
        
        if(!item.name) item.name="";
        var e="<fieldset style='border:1px solid #ccc; width:81px;display:inline;padding:2px;margin:2px;'> <legend>"+item.name+"</legend>"+fields+"</fieldset>"
        var el=panel.append(e);
    }    
});

