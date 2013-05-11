/**
 * Collapsible
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.form.NumberField", /** @lends {app.Component.prototype} */({
    extend:"core.widget.Widget",
    /**
     * @constructor
     */
    widget:"NumberField",                
    startX:0,
    startY:0,
    startValue:0,
    
    //
    //input:null,
    
    init: function (cfg) {
        
        this.apply(cfg);
        this._super();

        var me=this,
            onChange=this.onChange.bind(me); 
        this.domTarget=$(this.domTarget);
        //this.domTarget.addClass('widget_rotator');                                                
        
        
        this.domTarget.on('mousedown',function(e){
            me.startX=e.x;
            me.startY=e.y;
            me.startValue=me.value*1;
            
            //подпишемся на перемещаения мыши
            $( 'body' ).on('mousemove',onChange);
            
            // подпишемся на отпускание мыши, событие сработает только один раз
            // при отпускании отписываемся от слежением за movie
            $( 'body' ).one('mouseup',function(e){            
                $( 'body' ).off('mousemove',onChange);            
            })
        });
                
        //$.fn.data(this.domTarget,'widget',this);                      
        //console.log( 'original', $.fn.data(this.domTarget,'widget') ) ;
         
    },
    
    /**
     * Обработчик события перемещения
     */        
    onChange:function(e){       
        var deg=this.startValue+(e.x-this.startX)+(this.startY-e.y );
        this.set(deg);
    },
            
    set:function(deg){
        this.value=deg;
        $(this.domTarget).val(deg);
        //this.refreshData();
        
        $(this.domTarget).trigger('change',{
            srcElement: this.domTarget            
        })        
    },
            
    /*update:function(){
        alert("update");
    },*/
            
    refresh:function(){
        this.value=$(this.domTarget).val();        
    }
            
        
}));
