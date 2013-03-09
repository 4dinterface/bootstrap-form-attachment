Define("app.controller.Scene", {
    extend: app.Component,
	init: function (prop) {
		this.super();
		//вставляет свойста в обьект
		this.apply(prop);

		// Drag-n-Drop на канвас
		$(function () {
			var elem = prop["stage"];

			elem.addEventListener("mousedown", function (e) {
				var o = elem.getObjectUnderPoint(e.stageX, e.stageY);
				var offset = {
					x : o.x - e.stageX,
					y : o.y - e.stageY
				};
				e.addEventListener("mousemove", function (e) {
					o.x = e.stageX + offset.x;
					o.y = e.stageY + offset.y;
					prop["stage"].update();
				});
			});
		});
	}
});

