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
                 +"<h2 style='background-color:#ccc;'> "+  gr.name + "</h2>"
                 +"<div>";        
         
        //Создадим вложенные подгруппы
        for (var i in gr.items) if(i!=="name") {
            cont=cont+this.makeSubGroup(gr.items[i]);
        }        

        cont=cont+"</div></div>";        
        
        panel.append(cont);
    },

    // создадим подгруппу
    makeSubGroup:function(item){
        var fields="";

        for(var i in item.items) if(i!=="name"){            
            fields+="<div style='margin-left:7px;'>"+item.items[i].name+": <input data-dsource='"+i+"' value='' type='text' style='color:#000;font-size:12px;border:solid 0px;background-color:#d8d8d8;width:30px;' ></div>";
        }
        
        if(!item.name) item.name="";
        return "<fieldset style='border:1px solid #ccc; width:81px;display:inline;padding:2px;margin:2px;'> <legend>"+item.name+"</legend>"+fields+"</fieldset>"         
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

