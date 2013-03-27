/* 
 * Квадрат
 */
Define('app.scene.shape.Rectangle', {
	extend: createjs.Shape,
        
        width:100,
        height:40,
        
	// инициализация
	init  : function (cnf){            
            this.initialize();
            
            var me = this;
            //this.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, me.width, me.height);
            this.x = cnf.x;
            this.y = cnf.y;	
            this.renderToCache();         
            //console.log('this',this.width);
	},
        hihi:0,
        
        //эксперементальное решение
        //draw:function(ctx, ignoreCache) {                      
           //this.hihi+=.01;
           //if (this.hihi>1) return this.super(); 
           //this.renderToCash();
           //стандартная перерисовка
           //this.super();           
           //ручная           
           //console.log(ctx);
        //},
        
        renderToCache:function(){                        
            var me=this;
            this.cache(0,0,this.width,this.height);
            this.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, me.width, me.height);            
            //console.log('gr',this.graphics);                        
            this.updateCache();
            this.graphics.clear();
        }
                
        // метод update неиспользуется системой
        //update:function(){}
        
});


