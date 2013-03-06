( function () {    
        'use strict'	
	var 
            // создадим таймлайн
            timeline = new app.model.Timeline (),

            // создадим ролик
            // ролику понадобится доступ к таймлайну,  посколько анимация происходит по ключам из таймлайна
            // а также ему понадобится доступ к сцене на которой он будет переставлять обьекты
            movie=new app.movie.Movie({
                timeLine:timeline
                //stage:stage
            }),
            
            //view таймлайна
            tlView = new app.view.Timeline({
                // доступ к модели таймлайна нам понадобится чтобы его отрисовывать
                model : timeline,                
                // доступ к муви, в муви хранится позиция бегунка
                movie: movie                
            }),               
            
            //контроллер таймлайна            
            tlController=new app.controller.TimeLine({
                //viev - прямой доступ контролёра к view, пока под вопросом
                view:tlView,                
                //модель таймлайна, которую контролёр сможет изменять
                model:timeline,                                
                //movie 
                movie:movie
            })            
 
        //console.log(timeline);        
        //контроллер 
        //tlController=new TimeLineController(timeline);
}) ();