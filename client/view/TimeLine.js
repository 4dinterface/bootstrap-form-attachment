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
        //Это только демонстрационный код, от которого можно отталкнуться
        
        var m=this.model;
        for (var i=0;i<m.length;i++){
            document.write(m[i].title+"<br>");   
            m[i].prop.each(function(ip){
               document.write(m[i][ip].length+"<br>");   
            });            
        }	

    }    
    
});