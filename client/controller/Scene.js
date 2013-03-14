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
				o = stage.getObjectUnderPoint(e.pageX, e.pageY);
				if (o) {
					offset.x = o.x - e.pageX;
					offset.y = o.y - e.pageY;
					console.log(e.pageX, e.pageY);
				}
			});
			$(document).on("mousemove", function (e) {
				if (o) {
					var s = stage.globalToLocal(e.pageX, e.pageY);
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

