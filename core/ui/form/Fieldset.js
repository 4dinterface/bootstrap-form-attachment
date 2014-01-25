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
            '<div class="ui-lock" style="width:90%;"></div>'+
          '</div>',
    /**
     * @constructor
     */    
    init: function (cfg) {        
        this.apply(cfg);   
        
        
        //this.domTarget=$(this.domTaret);
        //this.domTarget.append(this.tmpl);
         this.domTarget=$(this.tmpl);
         this.domTarget.before('<br class="clear">');
        
        this.render();
        this._super();
        
        if (!cfg.sync) this.domTarget.find(".ui-pic-lock").css({opacity:0});
        
        this.domTarget.find(".ui-pic-lock").click(function(){            
            $(this).toggleClass('ui-pic-lock_active');
        })
        
    },
            
    /**
     * слушаем события
     */
    listeners:{
        
    },        
    
    //ADD
    add:function(el){
        $( this.domTarget ).find('.ui-lock').append(el.domTarget);
    },
    
    //Render
    render:function(){
        
    }
});