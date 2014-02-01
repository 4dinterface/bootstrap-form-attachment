/* 
 * Базовый класс для примитивных фигур 
 */
this.player = this.player||{};

//Define('player.stage.shape.GeometricShape', {
(function() {        
    //наследование учитывает ECMA3
    var GeometricShape = function() {},
        f=function(){},
        _superClass=f.prototype=createjs.Shape.prototype,                
        p = GeometricShape.prototype= new f();
    
    //extend: "createjs.Shape",
    //init:function(){},
    
    p.renderToCache=function(){                                           
        var bounds=this.filters[0].getBounds();
        this.cache( bounds.x, bounds.y, this.width+bounds.width,this.height+bounds.height);                        
        this.updateCache();                   
    }
    
    p.updateContext=function(){                                       
        this.needDraw=true;
        
        //если были выжные изменения то нужно обновить кэш        
        if(this.needUpdate) {            
            //обновим cache
            this.renderToCache();                        
            this.needDraw=false;
        }                        
        
        _superClass.updateContext.apply(this,arguments);                    
        this.needUpdate=false;       
    },
        
   /**
    * Перерисует контекст из кеша
    * Это произойдет только если needDraw==true. 
    * Это делается для борьбы с двойным срабатывание draw        
    */
    p.draw=function(){
        if(this.needDraw) _superClass.draw.apply(this,arguments);
    }                
        
                
    //Библиотека заготовок
    p.libProperties={
        
        //Позиция и размеры
        "positionAndResize":{
            name:"Position and size",
            items:[
                [                     
                    {type:"int",label:"x",target:"x"},
                    {type:"int",label:"y",target:"y"}                                                   
                ],

                {
                    sync:true,
                    items:[
                        {type:"int",label:"W",target:"width"},
                        {type:"int",label:"H",target:"height"}                        
                    ]
                }
            ]
        },  
                
        //Блок трансформаций        
        transform:{                
            name:"Transform",
            items:[
                {
                    name:"Skew",
                    items:[
                        {type:"int",label:"x",target:"skewX"},
                        {type:"int",label:"y",target:"skewY"}                            
                    ]
                },  
                    
                {
                    name:"Scale",                    
                    sync:true,                
                    items:[
                        {type:"int",label:"W",target:"w"},                          
                        {type:"int",label:"H",target:"h"}                            
                    ]
                 },
                    
                 {                        
                    name:"origin",
                    items:[
                        {type:"int",label:"x",target:"regX"},
                        {type:"int",label:"y",target:"regY"}                                                
                     ]
                 },

                 {
                    name:"rotation",
                    items:[
                        {type:"int",label:"",target:"rotation",xtype:"rotator"}
                    ]
                 }                                        
            ]
        }, 
                
        //стилизация
        stylize:{                
            name:"Color",
            items:[
                {                        
                    name:"border",
                    items:[
                        {type:"color",label:"color",xtype:"color",target:"border-color"},
                        {type:"int",label:"bw",target:"borderSize"} 
                    ]
                }                
            ]
       },
               
       //Блок настройки тени
       shadow:{                
            name:"Shadow",
            items:[
                 {                        
                     name:"border",
                     items:[
                         {type:"color",label:"color",xtype:"color",target:"border-color"},
                         {type:"int",label:"bs",target:"border-size"}
                         ]
                     }                
            ]               
       }
       
    }
    core.NS('player.stage.shape.GeometricShape',GeometricShape);        
})();        