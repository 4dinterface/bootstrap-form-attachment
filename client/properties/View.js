/**
 * Представление properties
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

'use strict';

Define( "app.properties.View", /** @lends {app.component} */ {
    extend: core.View,
    widgetObserver:true,
    
    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,
    bindMap:null,

    init: function( cnf ) {
        this.domTarget=$('#property-panel')[0];
        this._super();
        this.apply( cnf );
                
        // Готовность модели.
        // Предполагается, что это события срабатывает после готовности документа
        var me=this;        
        this.model.on( 'load', function( e ) {  
            //берём в качестве теста первый shape в коллекции
            me.target=this.model.get("shapeCollection").get(0).target;
            
            //получаем ссылку на shape
            var shape=this.target.properties;

            //перебераем все группы в shape
            for(var i in shape){                
                this.makeGroup(shape[i], $('#property-panel') );
            }            
            
            //
            this.createBindMap();
            
            //на каждом кадре обновляем числа
            this.movie.on('onframe',function(){                
                me.dataUpdate();     
            })
            
        }.bind( this ) );
    },

    // создадим группу
    makeGroup:function(gr,panel){
        //Создадим группу
        var cont="<div widget='Collapsible'>"
                 +"<h2 style='background-color:#ccc;'><b>"+  gr.name + "</b></h2>"
                 +"<div>";        
         
        //Создадим вложенные подгруппы
        for (var i in gr.items) if(i!=="name") {
            if (gr.items[i].items || gr.items[i] instanceof Array ) cont=cont+this.makeSubGroup(gr.items[i]);
            else cont=cont+this.makeProperty( gr.items[i] );
        }        

        cont=cont+"</div></div>";        
        
        panel.append(cont);
    },

    // создадим подгруппу
    makeSubGroup:function(item){
        var fields="",
            items=item.items||item,
            name= item.name||"";
    
        for(var i in items) if(i!=="name"){            
            fields+=this.makeProperty( items[i] )
        }
                
        return "<fieldset class='fieldset'> <legend>"+name+"</legend>"+fields+"</fieldset>"         
    },

            
    makeProperty:function(item){
        var field="";
        switch(item.xtype){
            case "range" :
                field="<div class='prop_field_cont'>"+item.name+": <input type='range' data-dsource='"+item.target+"' value='-' type='text'  ></div>";
            break;

            case "color" :                    
                field="<div class='prop_field_cont'><div style='float:left;'>"+item.name+":</div> <div style='width:15px;height:20px;background-color:#11F;float:left;'></div></div> ";
            break;

            default:
                field="<div class='prop_field_cont'>"+item.name+": <input data-dsource='"+item.target+"' value='' type='text' class='prop_field' ></div>";
            break;                
        }
        return field;
    },

            
    /**
     * Строит карту по принципу имяСвойства:domElement
     * Задача быстро устанавливать значения элементам
     */
    createBindMap:function(){
        var me=this;
        this.bindMap={};
        
        $('input',this.domTarget).each(function(){                 
            me.bindMap[ $(this).attr('data-dsource') ]=$(this);
        });
    },        


    /**
     * Обновляет элементы из карты новыми данными
     * Задача найти свойства
     */            
    dataUpdate:function(){
        var me=this;
        for (i in this.bindMap) {
            this.bindMap[i].val(me.target[i]);
        }
    }
    
    
    
});

