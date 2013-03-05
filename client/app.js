( function () {    
        'use strict'	
	var 
            // Экземпляр таймлайна
            timeline = new app.model.Timeline (),

            // ролик
            movie=new app.movie.Movie({
                timeLine:timeline
            }),
            
            //view таймлайна            
            tlView = new app.view.Timeline({
                model : timeline,
                movie: movie                
            }),               
            
            //контроллер
            tlController=new app.controller.TimeLine({
                view:tlView,
                model:timeline
            })            
            
        //console.log(timeline);        
        //контроллер 
        //tlController=new TimeLineController(timeline);
}) ();