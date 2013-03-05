Define("app.view.Timeline", /** @lends {app.component} */{
    model:null,    
    init: function (prop) {		
        this.model=prop;
        
        this.super();
        
        //потом будет так
        //model.on('change',function(){
        //    this.render;            
        //});
        
        //здесь твой код
        this.render();
    },
    
    render:function(){
        
    }    
    
});