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
    max:100,//TODO PRIDIMAT KAK ISPOLZOVAT max
    //startY:0,            
    
    tmpl:'<div class="ui-element">'+
            '<i class="ui-pic ui-pic-alpha"></i>'+
            '<div class="ui-pipe">'+
                '<div class="ui-pipe__shadow"></div>'+
                '<div class="ui-pipe__btn ui-pipe__btn_active"></div>'+
            '</div>'+
            '<div class="ui-range-horizontal">'+
                '<div class="ui-range-horizontal__indicator">'+
                    '<div class="ui-range-horizontal__indicator__dot"></div>'+
                '</div>'+
                '<div class="ui-range-horizontal__line"></div>'+
            '</div>'+
            '<input type="text" class="ui-input" value="100"><div class="ui-unit">%</div>'+
          '</div>'+
          '<br class="clear">',
  
       //'<div class="ui-range-vertical">'+
       //    '<div class="ui-range-vertical__indicator">'+
       //         '<div class="ui-range-vertical__indicator__dot"></div>'+
       //     '</div>'+
       //     '<div class="ui-range-vertical__line"></div>'+
       // '</div>',

    /**
     * @constructor
     */
    init: function (cfg) {                                        
        this.apply(cfg);        
        
        this.domTarget=$(this.domTarget);
        this.domTarget.addClass('widget_range');                        
               
        //применим шаблон        
        this.domTarget.append(this.tmpl);            

        //получим ссылки на нужные dom из шаблона                    
        this.indicator=this.domTarget.find('.ui-range-horizontal__indicator');                                        
        this.input=this.domTarget.find('input');                                        
        this.uiRange=this.domTarget.find('.ui-range-horizontal');
        this.baseX=this.indicator.offset().left;
        
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
        "uiRange mousedown":function(e){                                                                 
            var onChange=this.onChange.bind(this);                         
            onChange(e);
                        
            //подпишемся на перемещаения мыши
            $( 'body' ).on('mousemove',onChange);
            
            // подпишемся на отпускание мыши, событие сработает только один раз
            // при отпускании отписываемся от слежением за movie
            $( 'body' ).one('mouseup',function(e){            
                $( 'body' ).off('mousemove',onChange);            
            })
        },
        
        //ручной ввод значения
        "input change":function(e){                        
            this.set( 'value',this.input.val()/100 );
            this.digest();
        }
    },        
    
    /**
     * Обработчик события mousemove     
     */        
    onChange:function(e){                         
        var val=(e.x-this.baseX)/100;        
        val=val>1?1:val;
        val=val<0?0:val;                
        this.set( 'value', val);                    
        
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
            left: this.value*100
        });                
        
        this.input.val(this.value*100);
    }        
});
