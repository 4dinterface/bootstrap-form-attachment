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
            
            // ВРЕМЕННО ОТКЛЮЧИМ
            //this.facade.addKeyToProperty( el.attr('data-dsource'), e.data.value );
            console.log(el.attr('data-dsource'),e.data.value);            
        }
    }
});
