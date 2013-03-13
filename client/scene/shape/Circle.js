/* 
 * Круг
 */
Define('app.scene.shape.Circle', {
	extend: createjs.Shape,
        
	// инициализация
	init  : function (cnf){            
            this.initialize();
            
            var me = this;
            this.graphics
               .beginRadialGradientFill(
                    ["rgba(255,255,255,1)", "rgba(0,0,0,1)"],
                    [0, 1], 0, 0, 0, 0, 0, 60
                )
               .drawCircle(40, 40, 40);
       
            this.x = cnf.x;
            this.y = cnf.y;		
	}
});





