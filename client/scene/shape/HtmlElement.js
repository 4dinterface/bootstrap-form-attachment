/* 
 * Html Element
 */
Define('app.scene.shape.HtmlElement', {
	extend: createjs.DOMElement,
        //extend:createjs.Container,
        
	// инициализация
	init  : function (cnf){   
            //this.initialize();
            //var content = new createjs.DOMElement("htmlExperement");
            //content.regX = 0;
            //content.regY = 0;
            //this.x=300;    
            //this.y=100;                
            //this.addChild(content);

            this.initialize("htmlExperement");                        
            this.x = cnf.x+200;
            this.y = cnf.y;   
            this.rotation = 25
            
            this.regX = 0;
	    this.regY = 0;            
	},
                
        renderToCache:function(){   }
});