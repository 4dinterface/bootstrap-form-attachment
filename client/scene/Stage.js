Define('app.scene.Stage', {
	extend: createjs.Stage,

	// инициализация
	init  : function () {
		var me = this;

		$(function () {
			canvas = $("#canvas")[0];
			me.initialize(canvas);
		});
	}
});