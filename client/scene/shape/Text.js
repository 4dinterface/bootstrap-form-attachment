/* 
 * Text
 */

Define('app.scene.shape.Text', {
	extend: createjs.Text,
        
        text:"текст",
        font:"35px Arial",
        color:"#F00",
        //        
	// инициализация
	init  : function (cnf){            
            
            //this.initialize(text, font, color);
            //this.initialize("Hello Amix!", "35px Arial", "#F00");            
            this.initialize(this.text,this.font,this.color);
            //console.log("TEXT====",this);
            this.x = cnf.x;
            this.y = cnf.y;		            
	},
                
        renderToCache:function(){   }
                
        //renderToCache:function(){                        
            //var me=this;
            //this.cache(0,0,this.width,this.height);
            
            //this.updateCache();
            //this.graphics.clear();
        //}


});


