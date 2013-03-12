Define("app.controller.Scene", {
    extend: app.Component,
	init: function (prop) {
		this.super();
		//вставляет свойста в обьект
		this.apply(prop);

		var stage = this.stage;

		// Drag-n-Drop на канвас
		$(function () {
			stage.addEventListener("mousedown", function (e) {
                            //alert(1);
				var o = stage.getObjectUnderPoint(e.stageX, e.stageY);
				var offset = {
					x : o.x - e.stageX,
					y : o.y - e.stageY
				};
				e.addEventListener("mousemove", function (e) {
                                        console.log(e);
					o.x = e.stageX + offset.x;
					o.y = e.stageY + offset.y;
					stage.update();
				});
			});
		});
	}
});

