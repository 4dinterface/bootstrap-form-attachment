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
        
        $( this.domTarget ).find('h2').click(function(){                                        
            $('div',me.domTarget).toggle();
        });
    }
            
}));


/*a=function(){};
a.prototype.x=10;

var b=function(){}
b.prototype=Object.create(a.prototype);
b.prototype.z=10;

console.log("aaa","x" in b.prototype);*/