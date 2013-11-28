'use strict';
/**
 * Представление properties
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

Define( "app.presentation.properties.View", /** @lends {app.component} */ {
    extend: core.View,
    
    //автоматически следим за созданием и удалением виджетов
    widgetObserver:true,    
    /**
     * Данные модели таймлайна
     * @type {app.model.Timeline}
     * @private
     */
    model: null,        
    
    //experemental
    scope:null,//связываемся вот с этим обьектом

    /**
     * @constructor
     */
    init: function( cnf ) {
        //console.log('cnf',cnf);
        var me=this;
        
        this.domTarget=$('#property-panel')[0];        
        $(this.domTarget).addClass('scope');

        this.domTarget.scope={};                                                        
        
        this.apply( cnf );                                
        this._super();
        
        this.render(); //прорисуем view
    },                
    
    //События
    listeners:{},
            
     //Рисует VIEW
    render:function(e){                
        var me=this,
           srcData=null,             
            
           //в качестве shape выерем первый элемент (TODO это временный вариант)
           shape=this.scope=this.target=this.stage.children[0],                
           //Список свойств которые будет отображать propertyEditor        
           prop=shape.properties;
    
        //Отпишемся от старого разработчика
       
        
        //создал shapeProxy
        this.shapeProxy=new core.data.Model(shape);//todo удалить shape
        this.shapeProxy.data=shape;                        
        
        this.domTarget.scope=this.shapeProxy;                                        
        
        //событие change при перерисове 
        shape.addEventListener('tick',onTick.bind(this));        
        function onTick(){
            this.shapeProxy.fire('change',{})
        }
        
        //перебераем все группы в shape
        for(var i in prop){                
            srcData=typeof prop[i]=="string"?shape.libProperties[prop[i]]:prop[i];
            //Создаем в группе
            this.makeGroup(srcData, $('#property-panel'),this.shapeProxy);
        }
        
    },        

    // создадим группу
    makeGroup:function(gr,panel,shape){
        
        //Создадим группы
        var sld=core.widget.widgetManager.createWidget('Collapsible',{            
            scope:shape,                        
            title:'hello'
        })          
                
        //Создадим вложенные подгруппы
        for (var i in gr.items) if(i!=="name") {
            if (gr.items[i].items || gr.items[i] instanceof Array ) {
                sld.add( this.makeSubGroup(gr.items[i], shape) );               
            } else {
                sld.add( this.makeProperty(gr.items[i], shape) );               
            }            
        }                        
        panel.append(sld.domTarget);                        
    },

    // создадим подгруппу
    makeSubGroup:function(item, shape){
        /*r*/       
        var r=core.widget.widgetManager.createWidget('Fieldset',{            
            scope:shape,            
            'data-dsource':'alpha'
        })                  

        var fields="",
            items=item.items||item,
            name= item.name||"";
    
        for(var i in items) if(i!=="name"){                        
            r.add(
                this.makeProperty( items[i], shape)
            );            
        }        
        return r;        
    },

    // создадим свойства
    makeProperty:function(item,shape){                
        
        switch(item.xtype){
            case "range" :                
                var r1=core.widget.widgetManager.createWidget('Range',{            
                     scope:shape,            
                    'data-dsource':item.target
                })          
            break;

//            case "color" :                    
//                field+="<div widget='InputColor' style='width:15px;height:20px;background-color:#11F;float:left;'></div>";
//            break;
            
            case "rotator" :                    
                var r1=core.widget.widgetManager.createWidget('Rotator',{            
                     scope:shape,            
                    'data-dsource':item.target
                })          

            break;

            default:
                var r1=core.widget.widgetManager.createWidget('NumberField',{            
                     scope:shape,            
                    'data-dsource':item.target
                })          
            break;                
        }
        return r1;        
    }          
    
});
