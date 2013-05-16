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
    input:null,
    rotator:null,
    
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
        

        //применим шаблон        
        this.domTarget.append(this.tmpl);
            
        this.rotator=this.domTarget.find('.rotator');                                
        this.input=this.domTarget.find('input');                        
        
        //$.fn.data(this.domTarget,'widget',this);                      
        //console.log( 'original', $.fn.data(this.domTarget,'widget') ) ;
         this._super();
    },

    //обработчики событий
    // вешаются по принципу "this.источник событие"
    // либо "cобытие" будет повешено прямо на this
    listeners:{
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
                
        "input change":function(){
            this.set( this.input.val() );
        }
    },        
    
    /**
     * Обработчик события перемещения
     */        
    onChange:function(e){       
        var deg=(e.x-this.startX)+(this.startY-e.y );
        this.set(deg);
    },
            
    set:function(deg){
        this.value=deg;
        this.domTarget.attr('value',deg);
        this.refreshView();
        
        this.domTarget.trigger('change',{
            srcElement: this.domTarget            
        })        
    },
            
    refresh:function(){
        this.value=this.domTarget.val();                        
        this.refreshView();             
    },            

    
    refreshView:function(){                
        this.input.val(this.value);
        
        //Достаточно заметное замедление даёт поворот через анимацию
        this.rotator.animate({
            rotateZ: this.value+'deg'
        },0);        
        //this.domTarget.find('.widget_rotator').css({'transform': 'rotateZ('+this.value+'deg);'} );
    }
        
});
