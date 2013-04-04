/* 
 * Html Element
 */
Define('app.scene.shape.HtmlElement', {
	extend: createjs.DOMElement,
        //extend:createjs.Container,
        
        width:170,
        height:170,
        
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
            //console.log('htmlEl',this.htmlElement.style);
            this.renderToCache();
	},  
                
                
        renderToCache:function(){ 
            this.htmlElement.style.height=this.height;
            this.htmlElement.style.width=this.width;
        }
});