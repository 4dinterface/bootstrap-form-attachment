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
            this.model.get('shapeCollection').get(0).addKeyToProperty(
                el.attr('data-dsource'),
                this.movie.elapsedTime, 
                el.attr('value')*1
            );                                        
            //console.log(e);            
        }
    }
});
