'use strict';   
/**
 * NumberField
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.form.NumberField", /** @lends {app.Component.prototype} */({
    extend:"core.widget.Widget",
    
    widget:"NumberField",                
    startX:0,
    startY:0,
    startValue:0,    
    
//    tmpl:"<input value='' type='text' class='ui-input' />",
    
    tmpl:'<div class="ui-lock__top">'+
            '<div class="ui-lock__title">W</div>'+
            '<div class="ui-pipe">'+
                '<div class="ui-pipe__shadow"></div>'+
                '<div class="ui-pipe__btn ui-pipe__btn_active"></div>'+
            '</div>'+
            '<div class="ui-range-btn-vertical ui-right">'+
                '<div class="ui-range-btn-vertical__indicator">'+
                    '<div class="ui-range-btn-vertical__indicator__dot"></div>'+
                '</div>'+
                '<div class="ui-range-btn-vertical__line"></div><div class="ui-range-btn-vertical__indicator__underdot"></div>'+
            '</div>'+
            '<div class="ui-unit ui-right">%</div>'+
            '<input type="text" class="ui-input ui-right" value="30">'+
        '</div>',
    
    /**
     * @constructor
     */
    init: function (cfg) {        
        this.apply(cfg);                        
        
        this.scope=cfg.scope|| this.getScope();                 
        this._super();
        
        //либо domtarget нам передали, либо создаем его сами
        //this.domTarget=this.domTarget||$('<div>');
        this.domTarget=this.domTarget||this.tmpl;                                                
        $(this.domTarget).addClass('ui-element');                
                
        //console.log('iiii ',cfg.label);
        
        this.domTarget.append(this.tmpl);                
        this.domTarget.find('.ui-lock__title').html(cfg.label);
        
        var me=this;        
    },
            
    /**
     * слушаем события
     */
    listeners:{
       
        "scope change":function(){
             this.set('value', this.getScope().get(this.bindPropName) );
        },
        
        "domTarget mousedown":function(e){
            var onChange=this.onChange.bind(this); 
            
            this.startX=e.x;
            this.startY=e.y;
            this.startValue=this.value*1;
            
            //подпишемся на перемещаения мыши
            $( 'body' ).on('mousemove',onChange);
            
            // подпишемся на отпускание мыши, событие сработает только один раз
            // при отпускании отписываемся от слежением за movie
            $( 'body' ).one('mouseup',function(e){            
                $( 'body' ).off('mousemove',onChange);            
            })        
            
            e.stopPropagation();
        }
    },
    
    /**
     * Обработчик события перемещения 
     * устанавливает новые значения в свойствах и генерирует событие
     */        
    onChange:function(e){       
        var val=this.startValue+(e.x-this.startX)+(this.startY-e.y );
        this.set('value',val);
        this.digest();                     
    },       

    /**
     * метод рендерит инфу
     */
    render:function(){          
        $(this.domTarget).find('input').val( this.value );        
    }    
}));
