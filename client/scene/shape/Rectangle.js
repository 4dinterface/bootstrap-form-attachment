/* 
 * Квадрат
 */
Define('app.scene.shape.Rectangle', {
	extend: createjs.Shape,
        
        width:40,
        height:40,
        
	// инициализация
	init  : function (cnf){            
            this.initialize();
            
            var me = this;
            this.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, me.width, me.height);
            this.x = cnf.x;
            this.y = cnf.y;	
            console.log('this',this.width);
	}
});


