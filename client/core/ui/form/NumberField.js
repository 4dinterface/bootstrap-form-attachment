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
    
    /**
     * @constructor
     */
    init: function (cfg) {        
        this.apply(cfg);                
        this.domTarget=$(this.domTarget);
        this._super();
    },
            
    /**
     * слушаем события
     */
    listeners:{
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
        
        $(this.domTarget).trigger('change',{
            srcElement: this.domTarget            
        })        
        
    },
    
    
    /**
     * сеттер для свойств виджета
     */
    set:function(name,val){
        switch (name){            
            case 'value':
                this.value=val;
                $(this.domTarget).val(val);        
            break;
            
            default:
                
            break;            
        }        
    },

    /**
     * метод считывает свойства виджетов с атрибутов
     */
    refresh:function(){
        this.value=$(this.domTarget).val();        
    }    
}));
