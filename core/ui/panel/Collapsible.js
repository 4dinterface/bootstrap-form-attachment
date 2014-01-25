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
    
    tmpl:'<div class="ui-property-block">'+
            '<div class="ui-property-block__header ui-grad-vert_light">'+
                '<i class="ui-minimize "></i>'+   
                '<div class="ui-property-block__header__title">'+
                    '213'+
                '</div>'+                                
            '</div>'+
            '<div class="innerPanel ui-element">'+'</div>'+
          '</div>',
    
    init: function (cfg) {
        this.apply(cfg);
        this._super();                
        
        var me=this;
        
        $( this.domTarget ).append(this.tmpl);        
                
        $( this.domTarget ).find('.ui-property-block__header').click(function(){                                        
            $('.innerPanel',me.domTarget).toggle();
        });
        
        $( this.domTarget ).find('.ui-property-block__header__title').html(cfg.title);
    },
    
    // Добавить
    add:function(el){
        $( this.domTarget ).find('.innerPanel').append(el.domTarget);
        this._super();
    }
            
}));


/*a=function(){};
a.prototype.x=10;

var b=function(){}
b.prototype=Object.create(a.prototype);
b.prototype.z=10;

console.log("aaa","x" in b.prototype);*/