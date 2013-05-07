// компонент в разработке
Define("core.Deferred",{

    //массив кэлбеков
    callback:null,
       
    //счётчик зависимостей
    count:0,    
    
    //состояние дефферед обьекта
    status:0,

    //конструктор дефферед обьекта
    init: function (f) {	          
        //увеличим счётчик компонентов и используем его как уникальный идентификатор
        //componentCount++;
        //this.id=componentCount;
        
        this.callback=[f];        
    },

	
    //добавляет функцию в ожидающую готовности
    ready:function(fun){
        //если deffered Обьект уже готов то нет смысла дожидаться его готовности
        if( this.status==1) fun()
	//если deffered Обьект ещё неготов то подождём готовности
        else this.callback.push(fun);
    },


    startWait:function(count){
        this.count=count;
    },
	
	
    //ждать готовности другого деференд обьекта
    wait:function(def){
        //this.count++;
        var me=this;
        def.ready(function(){
            me.count--;
            if (me.count==0) me.ok()
        })
	
    },
	
    //вызывается при готовности
    // 
    ok:function(){	
        //установим флаг на значение готов
        this.status=1;
                
        //вызовем все кэлбеки
	var l=this.callback.length;	
        for (var i=0;i<l;i++)
            this.callback[i]();		
    }	
});