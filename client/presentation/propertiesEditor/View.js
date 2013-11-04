/**
 * Представление properties
 *
 * @returns {Object} Timeline объект представления таймлайна
 */

'use strict';

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
    bindMap:null,
    
    //experemental
    scope:null,//связываемся вот с этим обьектом

    /**
     * @constructor
     */
    init: function( cnf ) {
        var me=this;        
        this.domTarget=$('#property-panel')[0];        
        $(this.domTarget).addClass('scope');

        this.domTarget.scope={};
        
        this.apply( cnf );                                
        this._super();
        
        this.render(); //прорисуем view
    },
                
    
    //События
    listeners:{                        
         //на каждом кадре обновляем числа                    
        "stage onrender":function(){                                
            $(this.domTarget).trigger('updatedata',{});            
        },
                 
        
    },

            
     //Рисует VIEW
    render:function(e){
        var me=this,
            srcData=null,             
            
            //в качестве shape выерем первый элемент (TODO это временный вариант)
            shape=this.scope=this.target=this.stage.children[0],            
    
            prop=shape.properties;
    
        this.domTarget.scope=shape;
   
        //перебераем все группы в shape
        for(var i in prop){                
            srcData=typeof prop[i]=="string"?shape.libProperties[prop[i]]:prop[i];
            this.makeGroup(srcData, $('#property-panel') );
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
        
        if (item.sync==true) return "<fieldset widget='Fieldset' class='fieldset'> <legend>"+name+"</legend>"+fields+"</fieldset>" 
        else return "<fieldset class='fieldset'> <legend>"+name+"</legend>"+fields+"</fieldset>" 
    },

    // создадим свойства
    makeProperty:function(item){        
        var field="<div style='display:inline;'>";        
        //console.log('prop',item['label']);
        //if(item.label) field+="<div style='float:left; margin-left:10px;margin-right:5px;'>"+item.label+"</div>";
        //field+="<div class='romb_button'></div>";         
        switch(item.xtype){
            case "range" :                
                field+="<div widget='Range' max='1' data-dsource='"+item.target+"' value='0'/><br class='clear'>"
            break;

            case "color" :                    
                field+="<div widget='InputColor' style='width:15px;height:20px;background-color:#11F;float:left;'></div>";
            break;
            
            case "rotator" :                    
                field+="<div  widget='Rotator' data-dsource='"+item.target+"'> </div>";                
            break;

            default:
                field+="<div widget='NumberField' data-dsource='"+item.target+"' ></div> <span class='clear'></span>";
            break;                
        }                
        field+="</div> <div style='display:block;'></div>";
        return field;
    }                         
});

    
