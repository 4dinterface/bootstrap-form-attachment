Define("app.presentation.properties.Сontroller", {
    
    extend: "core.Controller",

    init: function (prop) {        
        this.apply( prop );
        this.domTarget=this.domTarget=$('#property-panel');                
        this._super();
    },
            
    listeners:{
        "domTarget change":function(e){
            var el=$(e.srcElement);                
            
            //TODO сейчас применяется к первому shape а не к выбранном (собственно пока выбрать то нечего и нельзя)            
            
                
            this.facade.addKeyToProperty( el.attr('data-dsource'), el.attr('value')*1);
            //console.log(e);            
        }
    }
});
