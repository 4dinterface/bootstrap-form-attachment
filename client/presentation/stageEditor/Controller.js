Define("app.bussiness.stageEditor.Сontroller", {

    extend: core.Component,

    behaviours:{
        move:"app.presentation.stageEditor.behaviours.Selector",
        drager:"app.presentation.stageEditor.behaviours.Drager",
        shapeDrawer:"app.presentation.stageEditor.behaviours.ShapeDrawer"
    },

    selectorHTML:'<div class="editor-selector" style="width:200px; height:200px; pointer-events: none;">\
                                <div class="editor-selector-brick editor-selector-brick-left-top"></div>\
                                <div class="editor-selector-brick editor-selector-brick-top-center"></div>\
                                <div class="editor-selector-brick editor-selector-brick-right-top"></div>\
                                <div class="editor-selector-brick editor-selector-brick-right-center"></div>\
                                <div class="editor-selector-brick editor-selector-brick-right-bottom"></div>\
                                <div class="editor-selector-brick editor-selector-brick-bottom-center"></div>\
                                <div class="editor-selector-brick editor-selector-brick-left-bottom"></div>\
                                <div class="editor-selector-brick editor-selector-brick-left-center"></div>\
                    </div>',

    groupSelector:'<div class="editor-selector" style="width:0px; height:0px; pointer-events: none;"></div>',                    

    init: function (prop) {          

        var me=this;
        this.apply( prop );
        this._super();

        //console.log('212',this.behaviours);

        this.toolbar.on("toolbarchange", function (e) {
            var name = e.name;
            console.log(name);            
            switch(name){

                //указатель 
                case 'tool-pointer':
                    me.unUseBehavioursAll();
                    me.useBehaviour('move');
                break;

                //Нарисовать фигуру (квадрат)
                case 'tool-square':
                    me.figure="Rectangle"
                    me.unUseBehavioursAll();
                    me.useBehaviour('shapeDrawer');
                break;

                //Нарисовать фигуру (треугольник)
                case 'tool-circle':
                    me.figure="Circle"                    
                    me.unUseBehavioursAll();
                    me.useBehaviour('shapeDrawer');
                break;             

                //Нарисовать фигуру (треугольник)
                case 'tool-text':
                    me.figure="Text";
                    me.unUseBehavioursAll();
                    me.useBehaviour('shapeDrawer');   
                break;             

                

            }
            //$('.tab-body-scene').prepend(me.selectorHTML);
        });


        var canvas=$('#canvas');
        var pos=canvas.position();
        var startX, startY;

        
        function onMove (e){            
            console.log('move');
            me.fire('drag',{
                x:e.x-pos.left,
                y:e.y-pos.top,
                globalX:e.x,
                globalY:e.y,
                width:e.x-pos.left-startX,
                height:e.y-pos.top-startY
            })
        }        


        //this.stage.addEventListener('mousedown',function(e){

        //
        canvas.on('mousedown',function(e){
            var pos=canvas.position();

           // startX=e.stageX;
           // startY=e.stageY;

           startX=e.x-pos.left;
           startY=e.y-pos.top;

            me.fire('dragstart',{
                x:startX,
                y:startY,
                globalX:e.x,
                globalY:e.y
            }) 

            $('body').on('mousemove',onMove);
        })    

        //Отпустили мышь
        $('body').on('mouseup',function(e){
            
            $('body').off('mousemove');

            me.fire('dragstop',{
                x:e.x-pos.left,
                y:e.y-pos.top,
                width:e.x-pos.left-startX,
                height:e.y-pos.top-startY,
                startX:startX,
                startY:startY,
            });            
        });
        
        //this.stage.addEventListener('click',function(e){            


        this.useBehaviour('move');
    }

});
