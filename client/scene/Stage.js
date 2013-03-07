
Define('app.scene.Stage',{
  extend:createjs.Stage,
  init:function(){
    var me=this;
    $(function(){
      canvas= $("#canvas")[0];
      me.initialize(canvas);
      me._makeTest();
    });
      
  },
  
  _makeTest:function(){
    var s = new createjs.Shape();
    s.graphics.beginLinearGradientFill(["#FFF","#000"],[0,1],0,0,0,130).drawRect(0,0,20,20);
    s.x = 12;
    s.y = 10;        			
    this.addChild(s);
    
    var s1 = new createjs.Shape();
    s.graphics.beginLinearGradientFill(["#FFF","#000"],[0,1],0,0,0,10).drawRect(150,100,20,20);
    s.x = 12;
    s.y = 10;        			
    this.addChild(s1);

    
    this.update();    
  }
  
})
