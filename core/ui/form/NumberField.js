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
    
    tmpl:"<input value='' type='text' class='ui-input' />",
    
    /**
     * @constructor
     */
    init: function (cfg) {        
        this.apply(cfg);                        
        
        this.scope=cfg.scope|| this.getScope();                 
        this._super();
        
        //либо domtarget нам передали, либо создаем его сами
        this.domTarget=this.domTarget||$('<div>');
                                
        $(this.domTarget).addClass('ui-element');
        
        this.domTarget.append(this.tmpl);                
        
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
