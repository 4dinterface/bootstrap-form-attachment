Define("app.controller.Scene", {
    extend: app.Component,
	init: function (prop) {
		this.super();
		//вставляет свойста в обьект
		this.apply(prop);

		var stage = this.stage,
			o,
			offset = {},
			bord;

		// Drag-n-Drop на канвас
		$(function () {

			// меняет позицию рамки
			function bordPosition (top, left) {
				$(".bordContainer").css({
					top : top,
					left: left
				});
			}

			// создает рамку для фигуры на канвас
			function createBord (width, height, top, left) {
				if (bord) {
					deleteBord(bord);
				}
				var elem = $("<div />").addClass("bordContainer").css({
						width : width + "px",
						height: height + "px",
						top   : top + "px",
						left  : left + "px"
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

				bord = elem;
				console.log(bord[0]);
			}

			// удаляет рамку
			function deleteBord (elem) {
				$(elem).remove();
				bord = "";
			}

			//  Drag-n-Drop
			$(document).on("mousedown", function xxx (e) {
				if (e.target !== stage["canvas"]) {
					if (e.target === bord[0]) {
						deleteBord(bord);
					} else {
						return;
					}
				}

				var x = e.pageX - stage["canvas"].offsetLeft,
					y = e.pageY - stage["canvas"].offsetTop;
				o = stage.getObjectUnderPoint(x, y);
				if (o) {
					offset.x = o.x - x;
					offset.y = o.y - y;
					createBord(o.w, o.h, o.y + stage["canvas"].offsetTop - 2, o.x + stage["canvas"].offsetLeft - 2);
				}
			});
			$(document).on("mousemove", function (e) {
				if (o && bord) {
					var x = e.pageX - stage["canvas"].offsetLeft,
						y = e.pageY - stage["canvas"].offsetTop,
						s = stage.globalToLocal(x, y);

					o.x = s.x + offset.x;
					o.y = s.y + offset.y;
					stage.update();
					bordPosition(o.y + stage["canvas"].offsetTop - 2, o.x + stage["canvas"].offsetLeft - 2);
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
