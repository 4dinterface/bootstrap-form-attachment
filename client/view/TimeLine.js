Define("app.view.Timeline", /** @lends {app.component} */{
    extend:app.Component,
    model:null,    
    init: function (prop) {		
        //this.super();
        this.model=prop;
        
        
        
        //потом будет так
        //model.on('change',function(){
        //    this.render;            
        //});
        
        //здесь твой код
        this.render();
    },
    
    render:function(){
        console.log(this.model);
    }    
    
});