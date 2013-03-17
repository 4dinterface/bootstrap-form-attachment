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
		$(function () {

			function bordElemPosition (top, left) {
				$(".bordContainer").css({
					top : top,
					left: left
				});
			}

			// html поверх элемента
			$(document).on("mousedown", function (e) {
				if (e.target !== stage["canvas"]) {
					return;
				}
				// элементы контейнера
				var elem = $("<div />").addClass("bordContainer").css({
					width : '100px',
					height: "130px",
					top   : "40px",
					left  : "40px"
				}),
					bordLeftTop = $("<div />").addClass("bordLeftTop"),
					bordLeftCenter = $("<div />").addClass("bordLeftCenter"),
					bordLeftBottom = $("<div />").addClass("bordLeftBottom"),
					bordRightTop = $("<div />").addClass("bordRightTop"),
					bordRightCenter = $("<div />").addClass("bordRightCenter"),
					bordRightBottom = $("<div />").addClass("bordRightBottom"),
					bordTopCenter = $("<div />").addClass("bordTopCenter"),
					bordBottomCenter = $("<div />").addClass("bordBottomCenter");

				elem.append(bordLeftTop);
				elem.append(bordLeftCenter);
				elem.append(bordLeftBottom);
				elem.append(bordRightTop);
				elem.append(bordRightCenter);
				elem.append(bordRightBottom);
				elem.append(bordTopCenter);
				elem.append(bordBottomCenter);

				$("body").append(elem);
			});

			//  Drag-n-Drop
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
					bordElemPosition(o.y, o.x);
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