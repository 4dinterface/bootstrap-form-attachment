/**
 * Представление properties
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

'use strict';

Define( "app.properties.View", /** @lends {app.component} */ {
    extend: core.View,
    
    //автоматически следим за созданием и удалением виджетов
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
        this.apply( cnf );
                
        var me=this;        
        this._super();
    },
    
    listeners:{
         //слушаем событие загрузки модели
        "model load":function(e){
            var me=this;
            //берём в качестве теста первый shape в коллекции
            this.target=this.model.get("shapeCollection").get(0).target;
            
            //получаем ссылку на shape
            var shape=this.target.properties;

            //перебераем все группы в shape
            for(var i in shape){                
                this.makeGroup(shape[i], $('#property-panel') );
            }            
                        
            this.createBindMap();                       
        },
                
         //на каждом кадре обновляем числа                    
        "movie onframe":function(){                                
            this.dataUpdate();     
        }        
    },

    // создадим группу
    makeGroup:function(gr,panel){
        //Создадим группу
        var cont="<div widget='Collapsible'>"
                 +"<h2 style='background-color:#ccc; padding-left:5px;height:20px;'><b>"+  gr.name + "</b></h2>"
                 +"<div style='padding-left:5px;'>";        
         
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
        var field="<div style='display:inline;'>";        
        
        if(item.name) field+="<div style='float:left; margin-left:10px;margin-right:5px;'>"+item.name+"</div>";
        //field+="<div class='romb_button'></div>";
        
        switch(item.xtype){
            case "range" :
                field+="<input widget='null' type='range' data-dsource='"+item.target+"' value='0' style='width:50%;'/>";
            break;

            case "color" :                    
                field+="<div widget='null' style='width:15px;height:20px;background-color:#11F;float:left;'></div>";
            break;
            
            case "rotator" :                    
                field+="<div  widget='Rotator' data-dsource='"+item.target+"'> </div> ";                
            break;

            default:
                field+="<input widget='NumberField' data-dsource='"+item.target+"' value='' type='text' class='widget_numberfield' />";
            break;                
        }                
        field+="</div> <div style='display:block;'></div>";
        return field;
    },
            
    /**
     * Строит карту по принципу имяСвойства:domElement
     * Задача быстро устанавливать значения элементам
     */
    createBindMap:function(){
        var me=this;
        this.bindMap={};
        
        $('[widget]',this.domTarget).each(function(){                            
            me.bindMap[ $(this).attr('data-dsource') ]=$(this);
        });
    },        


    /**
     * Обновляет элементы из карты новыми данными
     * Задача найти свойства
     */            
    dataUpdate:function(){
        var me=this,
           widget;
        for (i in this.bindMap) {
            this.bindMap[i].val( me.target[i] );                        
        }                
        me.refreshWidget();
    }
            
});

    