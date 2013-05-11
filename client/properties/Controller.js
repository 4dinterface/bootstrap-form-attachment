Define("app.properties.Сontroller", {

    extend: "core.Controller",

    init: function (prop) {
        this._super();
        this.apply( prop );
        this.domTarget=this.domTarget=$('#property-panel');
        var me=this;

        this.domTarget.on('change',function(e){                        
            var el=$(e.srcElement);                
            
            //TODO сейчас применяется к первому shape а не к выбранном (собственно пока выбрать то нечего и нельзя)            
            me.model.get('shapeCollection').get(0).addKeyToProperty(
                el.attr('data-dsource'),
                me.movie.elapsedTime, 
                el.attr('value')*1
            );
                
            
            
            console.log(e);
            
        });

    }
});
