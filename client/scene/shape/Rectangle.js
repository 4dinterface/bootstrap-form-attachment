/* 
 * Квадрат
 */
Define('app.scene.shape.Rectangle', {
	extend: createjs.Shape,
        
	// инициализация
	init  : function (cnf){            
            this.initialize();
            
            var me = this;
            this.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, 40, 40);
            this.x = cnf.x;
            this.y = cnf.y;		
	}
});


