//Селектор	
//Внимание код на уровне эксперементов законченный вариант может выглядеть иначе
Define("app.presentation.stageEditor.behaviours.ShapeDrawer",{    
    extend: core.Behaviour,    
    init: function(cnf){
    	var me=this;
    	this._super(cnf);        

        var el;

        //stage.addEventListener('mousedown',function(e){        	        	
        this.on('dragstart',function(e){			
           
	        el=$(me.parent.groupSelector);
    	    $('.tab-body-scene').prepend(el);

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
            me.parent.facade.addShapeToComposition(me.parent.figure, e.startX,e.startY, e.width ,e.height );
        	el.remove();
        });
    },

    listeners:{

    }	
});