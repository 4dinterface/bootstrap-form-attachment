Define("app.controller.Scene", {
    extend: app.Component,
    board:null,
    offset:{},
    
    //режим работы    
    //0 - неактивность
    //1 - выделение 
    //2 - перетаскивание
    mode:1,
        
    init: function (prop) {
        this._super();
        //вставляет свойста в обьект
        this.apply(prop);

        var stage = this.stage,
            o,
            me=this;
                
        this.offset = {};

        // Drag-n-Drop на канвас
        $(function () {
            
            //  Drag-n-Drop
            $(document).on("mousedown", function xxx (e) {

               // если кликнули не по канвасу
               if (e.target !== stage["canvas"]) {                    
                     
                    if (e.target === me.bord[0]) {
                        me.deleteBord(me.bord);
                    } else {
                        return;
                    }
               }

                //Найдём 
                var x = e.pageX - stage["canvas"].offsetLeft,
                    y = e.pageY - stage["canvas"].offsetTop;
                    
                o = stage.getObjectUnderPoint(x, y);

                //если o - 
                if (o) me.selectShape(o,x,y);
                
            });

            $(document).on("mousemove", function (e) {
                if (o && me.bord) {
                    var x = e.pageX - stage["canvas"].offsetLeft,
                        y = e.pageY - stage["canvas"].offsetTop,
                        s = stage.globalToLocal(x, y);

                    o.x = s.x + me.offset.x;
                    o.y = s.y + me.offset.y;
                    stage.update();
                    me.bordPosition(o.y + stage["canvas"].offsetTop - 2, o.x + stage["canvas"].offsetLeft - 2);
                }
            });
                
            $(document).on("mouseup", function () {
                if (o) {
                    this.offset = {};
                    o = undefined;
                }
            });
            
                
        });
            
    },

    //ввыбор shape
    selectShape:function(o,x,y){
        this.offset.x = o.x - x;
        this.offset.y = o.y - y;
        //this.createBord(o.width, o.height, o.y + this.stage["canvas"].offsetTop - 2, o.x + this.stage["canvas"].offsetLeft - 2);       
        this.createBord(o.width, o.height, o.y+this.stage["canvas"].offsetTop , o.x+this.stage["canvas"].offsetLeft);       
        //console.log()
    },
    
    // меняет позицию рамки
    bordPosition:function  (top, left) {
        $(".bordContainer").css({
            top : top,
            left: left
        });
    },

    // создает рамку для фигуры на канвас
    createBord:function (width, height, top, left) {
        var me=this;
        if (this.bord) {
            me.deleteBord(me.bord);
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

        $(".tab-body-scene").append(elem);
        this.bord = elem;
        //console.log(bord[0]);
    },

    // удаляет рамку
    deleteBord:function (elem) {
        $(elem).remove();
        this.bord = "";
    }
});
