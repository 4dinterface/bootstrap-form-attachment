/* 
 * Квадрат
 */
Define('app.presentation.stage.shape.Rectangle', {
	extend: app.presentation.stage.shape.GeometricShape,
    
        //свойства влияющие на кэш
        width:100,
        height:40,
        blurX:0,
        borderSize:0,

        //====================================================================//
        //                           Настройки SHAPE                          //
        //====================================================================//
        // важно если вместо {} указана текстовая строка значит свойства берётся из libProperties в родительском классе
        //http://www.photoshop-plus.co.uk/content/tutorials/new_imac_mini_icon/04.gif
        
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
            //alert (createjs.BoxBlurFilter);
            this.initialize();
            
            var me = this;
            //this.graphics.beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130).drawRect(0, 0, me.width, me.height);
            this.x = cnf.x;
            this.y = cnf.y;	         
            this.width=cnf.width||this.width;
            this.height=cnf.height||this.height;
                                                
            //console.log('this',this.width);
                        
            var blurFilter = new createjs.BoxBlurFilter( 0,  0, 0);
            this.filters = [blurFilter];                                              
                
            me.renderToCache();              
	},
        hihi:0,
        
        //эксперементальное решение
        //draw:function(ctx, ignoreCache) {  Ы                    
           //this.hihi+=.01;
           //if (this.hihi>1) return this._super(); 
           //this.renderToCash();
           //стандартная перерисовка
           //this._super();           
           //ручная           
           //console.log(ctx);
        //},
        
        renderToCache:function(){                        
            
            //this.alpha=0.1;
            //console.log('alpha=',this.alpha);
            
            /*if (this.blurX>0){
                var blurFilter = new createjs.BoxBlurFilter( this.blurX,  1, 1);
                this.filters = [blurFilter];                                              
                var bounds = blurFilter.getBounds();
            } 
            else bounds={x:0,y:0,width:0,height:0} ;*/
            
            bounds=this.filters[0].getBounds();
            
            //this.filters[0].blurY=this.x-50;
            //console.log('=====',this.filters);
            
            //console.log(this.blurX);
            
            // shadow сначало X, затем Y, затем Размытие
            this.shadow = new createjs.Shadow("#000000", this.shadowX, 15, 10);
            var me=this;
            //console.log(bounds);
            //this.cache(-this.blurX,0,this.width+this.blurX*2,this.height);
            this.cache( bounds.x, bounds.y, this.width+bounds.width,this.height+bounds.height);
            
            this.graphics
                    .beginLinearGradientFill(["#FFF", "#000"], [0, 1], 0, 0, 0, 130)
                    .setStrokeStyle(this["borderSize"])
                    .beginStroke("rgba(190,50,50,1)")                    
                    .drawRect(0, 0, me.width, me.height)
                    .endStroke();                      
            
            this.updateCache();
            this.graphics.clear();
        }
                
        // метод update неиспользуется системой
        //update:function(){}        
});
