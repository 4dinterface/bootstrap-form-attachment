/**
 * Rotator
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.form.Range", /** @lends {app.Component.prototype} */{
    extend:"core.widget.Widget",    
    widget:"Range",           
    
    startX:0,
    //startY:0,            
    
    tmpl:'<div class="ui-range-horizontal">'+
            '<div class="ui-range-horizontal__indicator">'+
                ' <div class="ui-range-horizontal__indicator__dot"></div>'+
            '</div> '+
            '<div class="ui-range-horizontal__line"></div>'+
        '</div>'+'',

       //'<div class="ui-range-vertical">'+
       //    '<div class="ui-range-vertical__indicator">'+
       //         '<div class="ui-range-vertical__indicator__dot"></div>'+
       //     '</div>'+
       //     '<div class="ui-range-vertical__line"></div>'+
       // '</div>',

    /**
     * @constructor
     */
    init: function (cfg) {                                        s
        this.apply(cfg);        
        
        this.domTarget=$(this.domTarget);
        this.domTarget.addClass('widget_range');                        
               
        //применим шаблон        
        this.domTarget.append(this.tmpl);            

        //получим ссылки на нужные dom из шаблона                    
        this.indicator=this.domTarget.find('.ui-range-horizontal__indicator');                                        
        this.baseX=this.domTarget.offset().left;
        
        //вызовем родительский конструктор
        this._super();                        
    },

    //обработчики событий
    // вешаются по принципу "this.источник событие"
    // либо "cобытие" будет повешено прямо на this
    listeners:{        
        // Событие генерруется если данные в scope изменятся
        // по этому событию мы узнаем что пора перерисоват компонент согласно новым данным
        "view updatedata":function(){
            this.set('value', this.getScope() [ this.bindPropName ] );              
        },
        
        //Событие клика нажатия кнопки мыши на виджете
        "domTarget mousedown":function(e){                                                                 
            var onChange=this.onChange.bind(this);                         
            onChange(e);
                        
            //подпишемся на перемещаения мыши
            $( 'body' ).on('mousemove',onChange);
            
            // подпишемся на отпускание мыши, событие сработает только один раз
            // при отпускании отписываемся от слежением за movie
            $( 'body' ).one('mouseup',function(e){            
                $( 'body' ).off('mousemove',onChange);            
            })
        }
    },        
    
    /**
     * Обработчик события mousemove     
     */        
    onChange:function(e){                                            
        this.set( 'value', e.x-this.baseX);    
        this.digest();
    },                    
                                 
    /**
     * Перерисовывает виджет согласно данным
     * автоматически вызывается при вызове метода SET
     */
    render:function(){                
        //this.input.val( Math.round( this.value ) );        
        //Достаточно заметное замедление даёт поворот через анимацию
        this.indicator.css({
            left: this.value
        });        
    }        
});
