/**
 * Collapsible
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.form.Rotator", /** @lends {app.Component.prototype} */({
    extend:"core.widget.Widget",
    /**
     * @constructor
     */
    widget:"Rotator",                
    startX:0,
    startY:0,
    
    //
    input:null,
    rotator:null,
    
    init: function (cfg) {
        
        this.apply(cfg);
        this._super();

        var me=this,
            rotate=me.rotate.bind(me);             
        this.domTarget=$(this.domTarget);
        this.domTarget.addClass('widget_rotator');
        

        //вращающийся указатеь
        
        this.domTarget.append("<div class='rotator'></div>");        
        me.rotator=this.domTarget.find('.rotator');                
        me.rotator.append('<div style="width:1px; height:10px; margin-left:10px;background-color:#EEE;"></div>');        
        

        //поле ввода
        this.domTarget.append('<input style="display:inline;width:40px;margin-left:5px;">');
        this.input=this.domTarget.find('input');                
        
        
        me.rotator.on('mousedown',function(e){
            me.startX=e.x;
            me.startY=e.y;
            
            //подпишемся на перемещаения мыши
            $( 'body' ).on('mousemove',rotate);
            
            // подпишемся на отпускание мыши, событие сработает только один раз
            // при отпускании отписываемся от слежением за movie
            $( 'body' ).one('mouseup',function(e){            
                $( 'body' ).off('mousemove',rotate);            
            })
        });
                
        //$.fn.data(this.domTarget,'widget',this);                      
        //console.log( 'original', $.fn.data(this.domTarget,'widget') ) ;
         
    },
    
    /**
     * Обработчик события перемещения
     */        
    rotate:function(e){       
        var deg=(e.x-this.startX)+(this.startY-e.y );
        this.set(deg);
    },
            
    set:function(deg){
        this.value=deg;
        $(this.domTarget).attr('value',deg);
        this.refreshData();
        
        $(this.domTarget).trigger('change',{
            srcElement: this.domTarget            
        })        
    },
            
    /*update:function(){
        alert("update");
    },*/
            
    refresh:function(){
        this.value=$(this.domTarget).val();                        
        this.refreshData();             
    },            
            
    refreshData:function(){        
        //Достаточно заметное замедление даёт поворот через анимацию
        
        this.rotator.animate({
            rotateZ: this.value+'deg'
        },0);
        
        //this.domTarget.find('.widget_rotator').css({'transform': 'rotateZ('+this.value+'deg);'} );
    }    
}));
