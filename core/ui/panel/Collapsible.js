/**
 * Collapsible
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.panel.Collapsible", /** @lends {app.Component.prototype} */({
    extend:"core.widget.Widget",
    /**
     * @constructor
     */
    widget:"Collapsible",            
    
    init: function (cfg) {
        this.apply(cfg);
        this._super();
        
        var me=this;
        
        if( $( this.domTarget ).find('h2').length==0 ) $( this.domTarget ).append('<h2 style="background-color:#ccc; padding-left:5px;height:20px;"><b>'+cfg.title+'</b></h2>');
        if( $( this.domTarget ).find('div').length==0 ) $( this.domTarget ).append('<div class="innerPanel"></div>');
        
        $( this.domTarget ).find('h2').click(function(){                                        
            $('div',me.domTarget).toggle();
        });
    },
    
    // Добавить
    add:function(el){
        $( this.domTarget ).find('.innerPanel').append(el.domTarget);
    }
            
}));


/*a=function(){};
a.prototype.x=10;

var b=function(){}
b.prototype=Object.create(a.prototype);
b.prototype.z=10;

console.log("aaa","x" in b.prototype);*/