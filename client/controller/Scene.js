Define("app.controller.Scene", {
    extend: app.Component,
	init: function (prop) {
		this.super();
		//вставляет свойста в обьект
		this.apply(prop);

		var stage = this.stage,
			o,
			offset = {};

		// Drag-n-Drop на канвас
		// Координаты чуть уходят влево (?????????????????)    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
		$(function () {
			$(document).on("mousedown", function (e) {
				if (e.target !== stage["canvas"]) {
					return;
				}
				var x = e.pageX - stage["canvas"].offsetLeft,
					y = e.pageY - stage["canvas"].offsetTop;
				o = stage.getObjectUnderPoint(x, y);
				if (o) {
					offset.x = o.x - x;
					offset.y = o.y - y;
				}
			});
			$(document).on("mousemove", function (e) {
				if (o) {
					var x = e.pageX - stage["canvas"].offsetLeft,
						y = e.pageY - stage["canvas"].offsetTop,
						s = stage.globalToLocal(x, y);
					o.x = s.x + offset.x;
					o.y = s.y + offset.y;
					stage.update();
				}
			});
			$(document).on("mouseup", function () {
				if (o) {
					offset = {};
					o = undefined;
				}
			});
		});
	}
});

