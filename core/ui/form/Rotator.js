/**
 * Collapsible
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.form.Rotator", /** @lends {app.Component.prototype} */{
    extend:"core.widget.Widget",    
    widget:"Rotator",           
    
    startX:0,
    startY:0,        
    input:null,   //ссылка на html input
    rotator:null, //ссылка на html rotator
    
    tmpl:"<div class='rotator'>"+
            "<div style='width:1px; height:10px; margin-left:10px;background-color:#EEE;'></div>"+
        "</div>"+
        '<input style="display:inline;width:40px;margin-left:5px;">',

    /**
     * @constructor
     */
    init: function (cfg) {                                
        
        this.apply(cfg);        
        
        this.domTarget=$(this.domTarget);
        this.domTarget.addClass('widget_rotator');
        this.bindPropName= this.domTarget.attr('data-dsource');                
               
        //применим шаблон        
        this.domTarget.append(this.tmpl);        

        //получим ссылки на нужные dom из шаблона            
        this.rotator=this.domTarget.find('.rotator');                                
        this.input=this.domTarget.find('input');                        
                

        this._super();        
                
    },

    //обработчики событий
    // вешаются по принципу "this.источник событие"
    // либо "cобытие" будет повешено прямо на this
    listeners:{
        
        // Событие генеррует view, если данные в scope изменятся
        // по этому событию мы узнаем что пора перерисоват компонент согласно новым данным
        "view updatedata":function(){
            this.set('value', this.getScope() [ this.bindPropName ] );              
        },
        
        
        "domTarget mousedown":function(e){                                 
            var onChange=this.onChange.bind(this);            
            this.startX=e.x;
            this.startY=e.y;
            
            //подпишемся на перемещаения мыши
            $( 'body' ).on('mousemove',onChange);
            
            // подпишемся на отпускание мыши, событие сработает только один раз
            // при отпускании отписываемся от слежением за movie
            $( 'body' ).one('mouseup',function(e){            
                $( 'body' ).off('mousemove',onChange);            
            })
        },

        //ввод в поле input                
        "input change":function(){
            this.set( this.input.val() );
        }
    },        
    
    /**
     * Обработчик события перемещения
     */        
    onChange:function(e){       
        var deg=(e.x-this.startX)+(this.startY-e.y );
        this.set( 'value', deg );
        
        this.domTarget.trigger('change',{
            srcElement: this.domTarget            
        });        
    },
            
    /**
     * Устанавливает значеник
     */
    set:function(name,deg){
        switch(name){
            case 'value':
                this.value=deg;            
                this.render();               
            break;                        
        }        
    },
                    

    /**
     * Перерисовывает виджет согласно данным
     */
    render:function(){                
        this.input.val(this.value);
        
        //Достаточно заметное замедление даёт поворот через анимацию
        this.rotator.animate({
            rotateZ: this.value+'deg'
        },0);        
        //this.domTarget.find('.widget_rotator').css({'transform': 'rotateZ('+this.value+'deg);'} );
    }        
});
