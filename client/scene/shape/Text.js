/* 
 * Text
 */

Define('app.scene.shape.Text', {
	extend: createjs.Text,
        
	// инициализация
	init  : function (cnf){            
            //this.initialize(text, font, color);
            this.initialize("Hello Amix!", "35px Arial", "#F00");
                        
            this.x = cnf.x;
            this.y = cnf.y;		
	}
});


