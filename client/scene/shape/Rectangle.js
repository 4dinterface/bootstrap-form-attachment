/* 
 * Квадрат
 */
Define('app.scene.shape.Rectangle', {
	extend: createjs.Shape,
    
        //свойства влияющие на кэш
        width:100,
        height:40,
        blurX:0,

        //====================================================================//
        //                           Настройки SHAPE                          //
        //====================================================================//
        properties:{
            base:{
                name:"Позиция и размер",
                items:{
                    location:{
                        //name:"Базовые",
                        items:{
                            x:{type:"int",name:"x"},
                            y:{type:"int",name:"y"}                              
                        }
                    },

                    size:{
                        //name:"Базовые",
                        items:{
                            width:{type:"int",name:"width"},
                            height:{type:"int",name:"height"}                        
                        }
                    },                
                    
                    opacity:{
                        items:{
                            opacity:{type:"procent",name:"Opacity"}//TODO  от 0-1 подумать над именами                            
                        }
                    }                
                    
                }
            },  
            
            //Трансформации
            transform:{                
                name:"трансформации",
                items:{
                    origin:{                        
                        name:"origin",
                        items:{
                            x:{type:"int",name:"x"},
                            y:{type:"int",name:"y"}                                                
                        }
                    },

                    rotate:{
                        items:{
                            rotate:{type:"int",name:"rotate"}                           
                        }
                    },

                    skew:{
                        name:"Skew",
                        items:{
                            x:{type:"int",name:"x"},
                            y:{type:"int",name:"y"}                            
                        }
                    },                
                    scale:{
                        name:"Scale",
                        items:{
                            h:{type:"int",name:"h"},
                            w:{type:"int",name:"v"}                                                                    
                        }
                    }
                }
            },            
            //Трансформации
            stroke:{ name:"Линии" },
            fill:{ name:"заливка" }
        },
        //======================================================================//
        
        
	// инициализация
	init  : function (cnf){          
            //alert (createjs.BoxBlurFilter);
            
            this.initialize();
            
            var me = this;
            //this.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, me.width, me.height);
            this.x = cnf.x;
            this.y = cnf.y;	            
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
            
            //this.alpha=0.1;
            console.log('alpha=',this.alpha);
            
            if (this.blurX>0){
                var blurFilter = new createjs.BoxBlurFilter( this.blurX,  1, 1);
                this.filters = [blurFilter];                                              
                var bounds = blurFilter.getBounds();
            } 
            else bounds={x:0,y:0,width:0,height:0} ;
            
            console.log(this.blurX);
            
            // shadow сначало X, затем Y, затем Размытие
            this.shadow = new createjs.Shadow("#000000", 15, 15, 10);
            var me=this;
            //console.log(bounds);
            //this.cache(-this.blurX,0,this.width+this.blurX*2,this.height);
            this.cache( bounds.x, bounds.y, this.width+bounds.width,this.height+bounds.height);
            
            this.graphics
                    .beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130)
                    .setStrokeStyle(7)
                    .beginStroke("rgba(190,50,50,1)")                    
                    .drawRect(0, 0, me.width, me.height)
                    .endStroke();                      
            //console.log('gr',this.graphics);                        
            this.updateCache();
            this.graphics.clear();
        }
                
        // метод update неиспользуется системой
        //update:function(){}
        
});
