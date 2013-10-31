/**
 * Контроллер таймлана
 *
 */
'use strict';

Define( 'app.presentation.timelineEditor.Component', {

    extend: core.Component,
    //view таймлайна
    
    view:null,
    controller:null,
    
    init:function(cnf){        
        //View редактора таймлайна
        this.view = new app.timeline.View({
            // доступ к модели таймлайна нам понадобится чтобы его отрисовывать
            model : cnf.composition,                
            // доступ к муви, в муви хранится позиция бегунка
            movie: cnf.movie                
        }),               

        //Контроллер редактора таймлайна            
        this.controller=new app.timeline.Controller({
            //viev - прямой доступ контролёра к view, пока под вопросом
            view:this.view,                
            //модель таймлайна, которую контролёр сможет изменять
            model:cnf.composition,
            //movie 
            movie:cnf.movie
        });
        
        cnf.composition.on('shapecollectionschange',function(){
            alert(1);            
        })
        
    }    
    //ниже должно идти 
});        