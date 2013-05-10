Define("app.properties.Сontroller", {

    extend: "core.Controller",

    init: function (prop) {
        this._super();
        this.apply( prop );
        this.domTarget=this.domTarget=$('#property-panel');
        var me=this;

        this.domTarget.on('change',function(e){
            
            //TODO сейчас применяется к первому shape а не к выбранном (собственно пока выбрать то нечего и нельзя)
            
            me.model.get('shapeCollection').get(0).addKeyToProperty(
                $(e.srcElement).attr('data-dsource'),
                me.movie.elapsedTime, 
                $(e.srcElement).val()*1 
            );
                
        });

    }
});
