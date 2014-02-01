/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Define('player.com.Editor',{
    extend:"core.Component",
    init:function(){
        this.panel=core.widget.widgetManager.createWidget('Collapsible',{            
            scope:{},                        
            title:'name'
        })          
        
        this.domTarget=this.panel.domTarget;
        
    }
})

