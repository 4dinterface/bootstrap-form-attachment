/**
 * Компонент отвечает за ресайз фигур в в stageEditor
 */
Define("app.presentation.stageEditor.behaviours.Resizer",{    
    extend: core.Behaviour,
    init: function(cnf){

        var me=this;
        this._super(cnf);        

        var stage=me.parent.stage;

        var targetX=0, targetY=0;
        
        //stage.addEventListener('mousedown',function(e){                       
        this.on('dragstart',function(e){            
            target=e.target;
            targetX=target.x;
            targetY=target.y;

            //Todo вероятно для выбора нужны более высокоуровневые методы в фасаде бизнес слоя
            target.timeline.set('selected',true);            
        })

        this.on('drag',function(e)  {                               
            target.x=targetX+e.width;
            target.y=targetY+e.height;            
            this.parent.stage.update();                         
        });

        
        //stage.addEventListener('click',function(e){
        me.on('dragstop',function(e){
            
            console.log('target',target);            
            this.parent.facade.addKeysToProperty({
                'x':targetX+e.width,
                'y':targetY+e.height
            },target.timeline);
            
            
            me.parent.useOneBehaviour('move');        
        });
    },

    listeners:{


    }   
});
