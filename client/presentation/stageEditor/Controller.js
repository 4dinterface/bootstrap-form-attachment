    Define("app.business.stageEditor.Сontroller", {

    extend: "core.Component",

    behaviours:{
        move:"app.presentation.stageEditor.behaviours.Selector",
        drager:"app.presentation.stageEditor.behaviours.Drager",
        shapeDrawer:"app.presentation.stageEditor.behaviours.ShapeDrawer"
    },

    selectorHTML:'<div class="editor-selector" style="width:200px; height:200px; ">\
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
        var canvas=$('#canvas');
        var pos=canvas.offset();
        var editPos=$('.tab-body-scene').offset();
        var startX, startY;        
        var me=this;

        //editPos.left=editPos.left-(pos.left - editPos.left);

        //alert(editPos.left)

        this.apply( prop );
        this._super();


        //============================ Отслеживаеи onRender =====================//
        var el=$(this.selectorHTML);        
        el.css({opacity:0});
        $('#canvas-editor').append(el);        
        this.stage.on('onrender',function(){
            var children=me.stage.children;

            for (var i=0;i<children.length;i++){
                if (children[i].timeline.get('selected')){                                        
                    el.css({
                        width:children[i].width,
                        height:children[i].height,
                        opacity:1
                    });
                    

                    el.offset({
                        left:children[i].x+pos.left-50 ,//TODO убрать костыль (50)
                        top:children[i].y+pos.top-51    //TODO убрать костыль (51)
                    })
                    
                }                
            }            
        })        


        //============================ Отслеживаеи тулбар====================//;

        this.toolbar.on(app.events.toolbar.CHANGE, function (e) {
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

        
        function onMove (e){                        
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
        
        $('.editor-selector,#canvas').on('mousedown',function(e){
            var pos=canvas.position();

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


        //можно отловить событие клика по краю
        $('.editor-selector-brick-right-center').on('mousedown',function(){
            //alert(1);
        })

        
        //this.stage.addEventListener('click',function(e){            


        this.useBehaviour('move');
    }

});
