/* 
 * Круг
 */
Define('app.scene.shape.Circle', {
	extend: createjs.Shape,
        width:100,
        height:100,
	// инициализация
	init  : function (cnf){            
            this.initialize();
            
            this.x = cnf.x;
            this.y = cnf.y;		
            this.renderToCache();
            
	},
        renderToCache:function(){                        
            var me=this;
            this.cache(0,0,this.width,this.height);
            this.graphics
               .beginRadialGradientFill(
                    ["rgba(255,255,255,1)", "rgba(0,0,0,1)" ],
                    [0,1 ],  50, 50, 1,  50,  50,  100
                  //rations  x0  y0  r0   x1  y1  r1  
                  //x0,y0 -Центр положение внутреннего круга, который определяет градиент.
                  //r0 - Радиус внутреннего круга, который определяет градиент
                  //x1,y1 Положение центра внешний круг, который определяет градиент
                  //r1 - Радиус внешнего круга, который определяет градиент.
                )
               .drawCircle(this.width/2, this.height/2, this.width/2);
            //console.log('gr',this.graphics);                        
            this.updateCache();
            this.graphics.clear();
        }
});





