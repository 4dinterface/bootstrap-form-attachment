Define('app.scene.Stage', {
	extend: createjs.Stage,

	// инициализация
	init  : function () {
		var me = this;

		$(function () {
			canvas = $("#canvas")[0];
			me.initialize(canvas);
		});
	},

	// отрисовывает сцену
	_makeTest: function () {
		var s = new createjs.Shape();
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
	}
});
