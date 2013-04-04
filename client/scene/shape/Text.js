/* 
 * Text
 */

Define('app.scene.shape.Text', {
	extend: createjs.Text,
        
        text:"текст Big big big text very very very",
        font:"35px Arial",
        color:"#F00",       
        
        width:200,
           
	// инициализация
	init  : function (cnf){            
            
            //this.initialize(text, font, color);
            //this.initialize("Hello Amix!", "35px Arial", "#F00");            
            this.initialize(this.text,this.font,this.color);
            //console.log("TEXT====",this);
            this.x = cnf.x;
            this.y = cnf.y;
            this.lineWidth=this.width;            
            //this.maxWidth=600;
            //TextAlign - :)
            
	},
                
        renderToCache:function(){   
            this.lineWidth=this.width;            
        }
                
        //renderToCache:function(){                        
            //var me=this;
            //this.cache(0,0,this.width,this.height);
            
            //this.updateCache();
            //this.graphics.clear();
        //}


});


