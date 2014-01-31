/**
 * Класс сцены
 * Визуальное отображение фигур и их свойств
 * @class
 * @name app.scene.Stage
 * @extends {createjs.Stage}
 */
Define('player.stage.Stage', /** @lends {app.scene.Stage.prototype} */({

	extend: "createjs.Stage",
        mixins:[ "core.Component" ],
        
        //move
        //x:-90, //скролл по X
        //y:600, //скролл по Y        
        
        //zoom
        //scaleX:2, //масштабирование  по X
        //scaleY:2, //масштабирование  по Y
        
	// инициализация
	init  : function () { 
            console.log(this);
            
            var me = this;
            this.event={};

            //$(function () {
                canvas = $("#canvas")[0];
		me.initialize(canvas);
            //});
	},

                    
        /**
         * метод update        
         */
        update:function(){            
            this._super();
            //console.log(this);
            this.fire('onrender',{})
        },        

	// отрисовывает сцену
	_makeTest: function () {
/*		var s = new createjs.Shape();
		s.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, 40, 40);
		s.x = 12;
		s.y = 10;
		s.w = 40;
		s.h = 40;
//		s.mouseMoveOutside = true;
		this.addChild(s);

		var s1 = new createjs.Shape();
		s1.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 10).drawRect(0, 0, 100, 130);
		s1.x = 102;
		s1.y = 10;
		s1.w = 100;
		s1.h = 130;
//		s1.mouseMoveOutside = true;
		this.addChild(s1);

		this.update();
                */
	}
}));
