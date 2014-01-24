//Селектор	
//Внимание код на уровне эксперементов законченный вариант может выглядеть иначе

Define("app.presentation.stageEditor.behaviours.Selector",{    
    extend: core.Behaviour,
    init: function(cnf){
    	var me=this;
    	this._super(cnf);        

    	var stage=me.parent.stage;

//        console.log('>>>',this.parent.stage);

        var mx,my;
        var p=$('#canvas');        

        var el;
        var dragElement;



        //stage.addEventListener('mousedown',function(e){        	        	
        this.on('dragstart',function(e){			

            //проверим не перетаскивание ли это, и если да то передадим управление перетаскиванию
            var dragElement=stage.getObjectUnderPoint(e.x,e.y);            
            console.log(dragElement);

            if(dragElement){
                me.parent.useOneBehaviour('drager');
                e.target=dragElement;
                me.parent.fire('dragstart',e)
                return;
            }
            


	        el=$(me.parent.groupSelector);
    	    $('.tab-body-scene').prepend(el);

            mx=e.x;
            my=e.y;

            el.css({
                top:e.globalY,
                left:e.globalX,                 
            })

        })

        this.on('drag',function(e)	{	        		        	
        	if(e.width> 0) {
                el.width  ( e.width );
            } else {
                el.css({ left:e.globalX });
                el.width  ( e.width*-1 );
            }

            if(e.height> 0) {
                el.height ( e.height);
            } else {
                el.css({ top:e.globalY });
                el.height ( e.height*-1  );
            }
        });

        
        //stage.addEventListener('click',function(e){
        me.on('dragstop',function(e){
        	//if (mx==e.x && my==e.y ) {
        	//	var target=stage.getObjectsUnderPoint(e.x,e.y);
        	//}        	

        	//установим выбранный  элемент как 
        	//target[0].timeline.set('select','true');

        	//console.log(target[0].timeline);

        	if (el) el.remove();
        });
    },

    listeners:{


    }	
});