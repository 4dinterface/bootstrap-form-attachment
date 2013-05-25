/**
 * Collapsible
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.form.InputColor", /** @lends {app.Component.prototype} */{
    extend:"core.widget.Widget",    
    widget:"InputColor",           
    
    dialog:null,
    
    tmpl:'<div class="inpcoldialog"><div class="picker" id="primary_block"  >'
            +'<div id="line">'
                +'<div id="arrows">'
                    +'<div class="left_arrow"></div>'
                    +'<div class="right_arrow"></div>'                    
                +'</div>'
                +'<canvas class="cLine" style="width:20px;height:180px;"></canvas>'
            +'</div>'
            +'<div id="block_picker">'
                +'<img src="https://lh3.googleusercontent.com/-8Dm4nhAOssQ/T_IqwyIFXmI/AAAAAAAAACA/4QKmS7s_otE/s256/bgGradient.png" class="bk_img"/>'
                +'<div class="circle" id="circle"></div>'
            +'</div>'
            +'<div id="out_color" class="out_color"></div>'
            +'</div></div>',

    /**
     * @constructor
     */
    init: function (cfg) {
        
        this.apply(cfg);        
        
        this.domTarget=$(this.domTarget);
        this.domTarget.append(this.tmpl);

        
        this.dialog=this.domTarget.find('.inpcoldialog');
        this.block_picker =this.domTarget.find('#block_picker');        
        this.line =this.domTarget.find('.cLine');        
        this.circle=this.domTarget.find('.circle');
            
        this._super();
    },

    //обработчики событий
    // вешаются по принципу "this.источник событие"
    // либо "cобытие" будет повешено прямо на this
    listeners:{
        "domTarget click":function(e){                        
            var me=this;            
            this.dialog.show();                        
            //this.create();
            this.gradient(this.line[0],50,180);
            //this.gradient2(this.canvasHsv[0],100,100)

            //спрячем диалог
            $( 'body' ).one('mousedown',function(e){
                //me.dialog.hide();
            });
        },

         //таскаем кружок по выбору цвета
        "block_picker mousedown":function(){
            var me=this;
            this.block_picker.on('mousemove',function(e){                                
                me.circle.css({
                    'left':e.x-$(this).offset().left+4,
                    'top':e.y-$(this).offset().top+4
                });
                
            });
            
            this.block_picker.one('mouseup',function(e){
                me.block_picker.off('mousemove');
            });
        }        
    },        


    /**
     *  canva- объект canvas
     *  h - высота шкалы
     *  w- ширина
     */                
    gradient: function(canva,w,h){
        var context, gradient, hue;                
             
        context = canva.getContext("2d");
        canva.width=20;
        canvas.height=180;
        
        gradient = context.createLinearGradient(w/2,h,w/2,0);                   
        hue = [[255,0,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255],[255,0,0]];
        //цвета на шкале hue в rgb
                   
        for (var i=0; i <= 6;i++){        
            color = 'rgb('+hue[i][0]+','+hue[i][1]+','+hue[i][2]+')';    
            gradient.addColorStop(i*1/6, color);    
        };                             
        context.fillStyle = gradient;         	 
        context.fillRect(0,0, w ,h);	     
    },  
            
    hsv_rgb: function (H,S,V){	 
        var f , p, q , t, lH;
   
	S /=100;
        V /=100;
     
        lH = Math.floor(H / 60);
      
	f = H/60 - lH;
        p = V * (1 - S); 
        q = V *(1 - S*f);
	t = V* (1 - (1-f)* S);
      
	switch (lH){
      
            case 0: R = V; G = t; B = p; break;
            case 1: R = q; G = V; B = p; break;
            case 2: R = p; G = V; B = t; break;
            case 3: R = p; G = q; B = V; break;
            case 4: R = t; G = p; B = V; break;
            case 5: R = V; G = p; B = q; break;
        }
     
        return [parseInt(R*255), parseInt(G*255), parseInt(B*255)];
    },               	                              
    
    /**
     * Обработчик события изменения
     */        
    onChange:function(e){       
        this.set('value',0);
        this.domTarget.trigger('change',{
            srcElement: this.domTarget            
        })        
    },

    /**
     * Устанавливает свойства виджетов
     */
    set:function(name,val){
        
    },
    
    /**
     * считывает значения из атрибутова
     */     
    refresh:function(){
        this.value=this.domTarget.val();                        
        this.refreshData();             
    },            
            
    refreshData:function(){}
        
});
