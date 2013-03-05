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
        var m=this.model;
        for (var i=0;i<m.length;i++){
            document.write(m[i].title+"<br>");   
            for (ip in m[i] ){
               document.write(m[i][ip].length+"<br>");   
            }            
        }	

    }    
    
});