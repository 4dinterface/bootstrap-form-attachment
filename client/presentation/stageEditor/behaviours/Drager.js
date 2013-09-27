//Селектор	
//Внимание код на уровне эксперементов законченный вариант может выглядеть иначе
//Селектор  
//Внимание код на уровне эксперементов законченный вариант может выглядеть иначе

Define("app.presentation.stageEditor.behaviours.Drager",{    
    extend: core.Behaviour,
    init: function(cnf){

        var me=this;
        this._super(cnf);        

        alert(this.classNS);

        var stage=me.parent.stage;

        var targetX=0, targetY=0;
        
        //stage.addEventListener('mousedown',function(e){                       
        this.on('dragstart',function(e){            
            target=e.target;
            targetX=target.x;
            targetY=target.y;

            this.parent.stage.update();            
        })

        this.on('drag',function(e)  {                               
            //target.x=targetX+e.width;
            //target.y=targetY+e.height;
            

            this.parent.facade.addKeyToProperty('x',targetX+e.width);
            this.parent.stage.update();
        });

        
        //stage.addEventListener('click',function(e){
        me.on('dragstop',function(e){
            //me.parent.facade.addShapeToComposition(me.parent.figure, e.startX,e.startY, e.width ,e.height );
            
            me.parent.useOneBehaviour('move');        
        });
    },

    listeners:{


    }   
});