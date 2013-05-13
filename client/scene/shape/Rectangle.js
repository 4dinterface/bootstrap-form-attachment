/* 
 * Квадрат
 */
Define('app.scene.shape.Rectangle', {
	extend: createjs.Shape,
    
        //свойства влияющие на кэш
        width:100,
        height:40,
        blurX:0,
        borderSize:0,

        //====================================================================//
        //                           Настройки SHAPE                          //
        //====================================================================//
        //
        //http://www.photoshop-plus.co.uk/content/tutorials/new_imac_mini_icon/04.gif
        properties:[                    
            {
                name:"Base",
                items:[
                    { type:"int",label:"name",target:"nameId"},//TODO  от 0-1 подумать над именами                            
                    { type:"procent",label:"alpha",xtype:"range",target:"alpha"}//TODO  от 0-1 подумать над именами                            
                ]
            },
            {
                name:"Position and size",
                items:[
                    [                     
                        {type:"int",label:"x",target:"x"},
                        {type:"int",label:"y",target:"y"}                                                   
                    ],

                    [
                        {type:"int",label:"W",target:"width"},
                        {type:"int",label:"H",target:"height"}                        
                    ]
                ]
            },  
            
            //Трансформации
            {                
                name:"Transform",
                items:[
                    {
                        name:"Skew",
                        items:[
                            {type:"int",label:"x",target:"skewX"},
                            {type:"int",label:"y",target:"skewY"}                            
                        ]
                    },  
                    
                    {
                        name:"Scale",
                        items:[
                            {type:"int",label:"W",target:"w"},                          
                            {type:"int",label:"H",target:"h"}                            
                        ]
                    },
                    
                    {                        
                        name:"origin",
                        items:[
                            {type:"int",label:"x",target:"regX"},
                            {type:"int",label:"y",target:"regY"}                                                
                        ]
                    },

                    {
                        name:"rotation",
                        items:[
                            {type:"int",label:"",target:"rotation",xtype:"rotator"}
                        ]
                    }                                        
                ]
            },            
            
            //Цвета
            {                
                name:"Color",
                items:[
                    {                        
                        name:"border",
                        items:[
                            {type:"color",label:"color",xtype:"color",target:"border-color"},
                            {type:"int",label:"bw",target:"borderSize"} 
                        ]
                    }                
                ]
            },
            
            
            {                
                name:"Shadow",
                items:[
                    {                        
                        name:"border",
                        items:[
                            {type:"color",label:"color",xtype:"color",target:"border-color"},
                            {type:"int",label:"bs",target:"border-size"}
                        ]
                    }                
                ]
            }
                                    
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
            //console.log('gr',this.graphics);                        
            
            this.updateCache();
            this.graphics.clear();
        }
                
        // метод update неиспользуется системой
        //update:function(){}        
});
