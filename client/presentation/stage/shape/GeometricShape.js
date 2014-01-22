/* 
 * Базовый класс для примитивных фигур 
 */


Define('app.presentation.stage.shape.GeometricShape', {
    extend: createjs.Shape,
    init:function(){
            
    },
                
    //Библиотека заготовок
    libProperties:{
        
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
        
});        