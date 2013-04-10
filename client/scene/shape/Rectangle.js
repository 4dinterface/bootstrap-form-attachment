/* 
 * Квадрат
 */
Define('app.scene.shape.Rectangle', {
	extend: createjs.Shape,
    
        //свойства влияющие на кэш
        width:100,
        height:40,
        
        properties:{
            base:{
                name:"Позиция",
                location:{
                    //name:"Базовые",
                    x:{type:"int",name:"x"},
                    y:{type:"int",name:"y"}      
                },
                
                size:{
                    //name:"Базовые",
                    width:{type:"int",name:"width"},
                    height:{type:"int",name:"height"}
                },                
                opacity:{                    
                    opacity:{type:"procent",name:"Opacity"}//TODO  от 0-1 подумать над именами
                }
                
            },  
            
            //Трансформации
            transform:{                
                name:"трансформации",
                origin:{
                    name:"Базовые",
                    x:{type:"int",name:"x"},
                    y:{type:"int",name:"y"}                    
                },
                rotate:{type:"int",name:"rotate"},
                skew:{
                    name:"Базовые",
                    h:{type:"int",name:"h"},
                    w:{type:"int",name:"w"}                                        
                },                
                scale:{
                    name:"Базовые",
                    h:{type:"int",name:"h"},
                    w:{type:"int",name:"v"}                                        
                }                
            },            
            //Трансформации
            stroke:{ name:"Линии" },
            fill:{ name:"заливка" }
        },
        
	// инициализация
	init  : function (cnf){            
            this.initialize();
            
            var me = this;
            //this.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, me.width, me.height);
            this.x = cnf.x;
            this.y = cnf.y;	
            //var blurFilter = new createjs.BoxBlurFilter(2,  1, 2);
            //this.filters = [blurFilter];                                              
            me.renderToCache();                                     
            //console.log('this',this.width);
	},
        hihi:0,
        
        //эксперементальное решение
        //draw:function(ctx, ignoreCache) {  Ы                    
           //this.hihi+=.01;
           //if (this.hihi>1) return this._super(); 
           //this.renderToCash();
           //стандартная перерисовка
           //this._super();           
           //ручная           
           //console.log(ctx);
        //},
        
        renderToCache:function(){                        
            var me=this;
            this.cache(0,0,this.width,this.height);
            this.graphics
                    .beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130)
                    .drawRect(0, 0, me.width, me.height);            
            //console.log('gr',this.graphics);                        
            this.updateCache();
            this.graphics.clear();
        }
                
        // метод update неиспользуется системой
        //update:function(){}
        
});