/**
 * NumberField
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.form.Fieldset", /** @lends {app.Component.prototype} */{
    extend:"core.widget.Widget",
    
    widget:"Fieldset",                    
    value:false,
    
    //думаю надо перестроить внутреннее содержимое filset таким образом чтобы контент был в отдельном div
     //tmpl:"<div class='fieldset_pole' style='top:0px;left:0px;width:8px;height:50px;' >"+
     //       "<div class='fieldset_metka' style='position:absolute;bottom:0px;left:0px;color:#333;font-size:12px;' ></div>"+
     //    "</div>"+
     //    "<div class='fildsetContent'>123</div>",
 
    tmpl:'<div class="ui-element">'+
                '<i class="ui-pic ui-pic-lock ui-pic-lock_active"></i>'+
                    '<div class="ui-lock fildsetContent">'+
                               
                    '</div>'+
            '</div>',
    /**
     * @constructor
     */    
    init: function (cfg) {        
        this.apply(cfg);                
        this.domTarget=$(this.domTarget);
        this.domTarget.append(this.tmpl);
        
        this.render();
        this._super();
    },
            
    /**
     * слушаем события
     */
    listeners:{
        
    },        
    
    //ADD
    add:function(el){
        $( this.domTarget ).find('.fildsetContent').append(el.domTarget);
    },
    
    //Render
    render:function(){
        
    }
});