Define("app.view.Timeline", /** @lends {app.component} */{
    extend:app.Component,
    model:null,    
    init: function (prop) {		
        this.super();
        this.apply(prop);
        //this.model=prop;
               
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
        
        //цикл по обьектам
        for (var i=0;i<m.length;i++){            
            document.write(m[i].get('title')+"<br>");   

            //цикл по свойствам
            for(var pi in m[i].get('prop')  ){
               document.write(pi+"<br>");                                  
            }            
            
        }	

    }    
    
});