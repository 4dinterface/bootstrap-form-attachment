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
                       
    p.needUpdate=true;    
    p.needDraw=true;
        
    
    p.width=100;
    p.height=40;
    p.blurX=0;
    p.borderSize=0;
    p.alpha=1;

    
    p.properties=[ ];
    
    
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
        //автоматичеки срабатывает
        if(this.needUpdate) {
            //отключим лишнее обновление drawкоторое срабаотае при вызове updateCache из renderCache
            this.needDraw=false;
            //обновим cache
            this.renderToCache();
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

/*
Define('app.presentation.stage.shape.Rectangle', {
	extend: "app.presentation.stage.shape.GeometricShape",
        needUpdate:false,
        needDraw:true,
        
        //массив компонентов shape
        components:null,
        
        // добавление компоненты
        addComponent:function(name){},
        // удаляет компонет ( вероятно по ID)
        removeComponent:function(id){},        
        
        //меняет порядок компонентов (ставит target после prev)
        moveComponent:function(target,prev){},    
    
        //свойства влияющие на кэш
        width:100,
        height:40,
        blurX:0,
        borderSize:0,
        alpha:1,

        //====================================================================//
        //                           Настройки SHAPE                          //
        //====================================================================//        
        properties:[                                
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
        ],
        //======================================================================//
                
	// инициализация
	init  : function (cnf){          
            this.filters=[];
            
            this.components=[
                new Shadow(this),
                new Blur(this)
            ];            
            //alert (createjs.BoxBlurFilter);
            this.initialize();
            
            
            var me = this;
            //this.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, me.width, me.height);
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
            //me.renderToCache();              
	},       
        
        //Вызывается из movie (от вызова из movie предпочтительно отказаться)
        renderToCache:function(){         
            if(!this.needUpdate) return;
                                   
            var bounds=this.filters[0].getBounds();
            this.cache( bounds.x, bounds.y, this.width+bounds.width,this.height+bounds.height);                        
            this.updateCache();
            
            this.needUpdate=false;
            //this.graphics.clear();
        },
        
        updateContext:function(){                       
            //автоматичеки срабатывает
            if(this.needUpdate) {
                //отключим лишнее обновление drawкоторое срабаотае при вызове updateCache из renderCache
                this.needDraw=false;
                //обновим cache
                this.renderToCache();
            }
            //console.log('zzz');
            
            //включим draw, который сработает когда updateContext завершится
            this.needDraw=true;     
            this._super();            
            //отключим повторное срабатывание draw            
        },
        
        /**
         * Перерисует контекст из кеша
         * Это произойдет только если needDraw==true. 
         * Это делается для борьбы с двойным срабатывание draw        
         */
        // draw:function(){
        //    if(this.needDraw) this._super();
        // }         
        // метод update неиспользуется системой
        //update:function(){}        
/*});*/
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
        this.blurFilter = new createjs.BoxBlurFilter( 1,  1, 1);
        target.filters.push(this.blurFilter);                                                               
        target.needUpdate=true;
        //this.bounds = this.blurFilter.getBounds();
    }        
    this.init();
}