/* 
 * Квадрат
 */

// namespace:
this.createjs = this.createjs||{};

(function() {    
    
    //наследование учитывает ECMA3
    var Rectangle = function(cnf) {this.init(cnf) },            
        f=function(){},
        _superClass=f.prototype=app.presentation.stage.shape.GeometricShape.prototype,        
        p = Rectangle.prototype= new f();
        
    console.log('p=',Rectangle.prototype);
    
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
            new Shadow(this),
            new Blur(this)
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
    
    p.renderToCache=function(){                                           
        var bounds=this.filters[0].getBounds();
        this.cache( bounds.x, bounds.y, this.width+bounds.width,this.height+bounds.height);                        
        this.updateCache();                   
    }
    
    p.updateContext=function(){                       
        //были выжные изменения нужно обновить кэш        
        if(this.needUpdate) {
            //отключим лишнее обновление drawкоторое срабаотае при вызове updateCache из renderCache
            this.needDraw=false;
            //обновим cache
            this.renderToCache();
            
            //кэш обновили, флаг можно сбросить
            this.needUpdate=false;
        }
        //console.log('zzz');            
        
        //включим draw, который сработает когда updateContext завершится        
        this.needDraw=true;     
        _superClass.updateContext.apply(this,arguments);        
            
    }
        
   /**
    * Перерисует контекст из кеша
    * Это произойдет только если needDraw==true. 
    * Это делается для борьбы с двойным срабатывание draw        
    */
    p.draw=function(){
         if(this.needDraw) _superClass.draw.apply(this,arguments);
    }         
            
    //console.log(new Rectangle());
    
    //неймспейс presentation
    core.NS('app.presentation.stage.shape.Rectangle',Rectangle);                
})()    

//============================= ЭКСПЕРЕМЕНТЫ С КОМПОНЕНТАМИ =============================//
//
//ТЕНЬ (ЭКСПЕРЕМЕНТ)
function Shadow(target){        
    this.init=function(){
        target.shadow = new createjs.Shadow("#000000", target.shadowX, 15, 10);    
        target.needUpdate=true;
    }        
    //TODO при изменении shadowX нужно отразить изменения
    this.init();    
}

// BLUR (ЭКСПЕРЕМЕНТ)
// shadow сначало X, затем Y, затем Размытие
function Blur(target){
    var blurFilter=null;
    
    this.init=function(){
        //this.blurX>0||this.blurY>0 возможно невсегда нужно инициализировать
        this.blurFilter = new createjs.BoxBlurFilter( 0,  0, 0);
        target.filters.push(this.blurFilter);                                                               
        target.needUpdate=true;
        this.bounds = this.blurFilter.getBounds();
    }        
    this.init();
}