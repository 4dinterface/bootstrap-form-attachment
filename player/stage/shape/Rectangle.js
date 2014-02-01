/* 
 * Квадрат
 */

(function() {        
    //наследование учитывает ECMA3
    var Rectangle = function(cnf) {this.init(cnf) },            
        f=function(){},
        _superClass=new player.stage.shape.GeometricShape()
        p=Rectangle.prototype=_superClass ;            
    
    //TODO изьавляемся от properties заменя их тегами
    p.properties=[                                
        {
            name:"Base",
            items:[
                { type:"int",label:"name",target:"nameId"},//TODO  от 0-1 подумать над именами                            
                { type:"procent",label:"alpha",xtype:"range",target:"alpha"}//TODO  от 0-1 подумать над именами                            
            ]
        },            
        //Позиция и размеры
        "positionAndResize",             
        //Трансформации
        "transform",            
        //силизация
        "stylize",            
        //corners - управление углами
        //shadow
        "shadow"                        
    ];
                       
    p.needUpdate=true;    
    p.needDraw=true;
            
    p.width=100;
    p.height=40;
    p.blurX=0;
    p.borderSize=0;
    p.alpha=1;   
    //p.properties=[ ];
    
    p.init=function(cnf){
        
        var me = this;
        
        this.filters=[];
        
        this.components=[
            new player.com.base.Component(this),
            new player.com.shadow.Component(this),
            new player.com.blur.Component(this)
        ];        
        
        this.initialize();                 
        
        this.x = cnf.x;
        this.y = cnf.y;	         
        this.width=cnf.width||this.width;
        this.height=cnf.height||this.height;
        
        //console.log('this',this.width);
        this.graphics
                .beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130)
                .setStrokeStyle(this["borderSize"])
                .beginStroke("rgba(190,50,50,1)")                    
                .drawRect(0, 0, me.width, me.height)
                .endStroke();
        
        this.renderToCache();
    }    
    
    //console.log(new Rectangle());
        
    //неймспейс presentation
    core.NS('app.presentation.stage.shape.Rectangle',Rectangle);                
})()    

