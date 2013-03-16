//компонент в разработке
Define('app.model.KeyframeCollection',{    
                
        extend:app.ObjectCollection,
        
        
        //наследование
	init:function (prop){
            this.super();
        },
                        
	//setter
	set:function(name,val){
            this.super();

            //вызовем соответствующее событие
            this.fire("keyframecollectionchange", {
                key:name,
                value:val
            });
            
        }        
});