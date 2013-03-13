$( function () {    
        'use strict'	
	var 
            // создадим таймлайн
            timeline = new app.model.Timeline (),
            
            //контроллер таймлайна            
            stage=new app.scene.Stage(),
            
            //загрузчик данных, который загрузит данные на сцену, и в таймлайн
            reader=new app.proxy.Reader({
                stage:stage,
                timeline:timeline
            }),
                        
            // создадим ролик
            // ролику понадобится доступ к таймлайну,  посколько анимация происходит по ключам из таймлайна
            // а также ему понадобится доступ к сцене на которой он будет переставлять обьекты
            movie=new app.movie.Movie({
                timeLine:timeline,
                stage:stage
            }),
            
            // контролёр сцены
            sceneContr=new app.controller.Scene({
                stage:stage
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
            });

         //коанда на загрузку   
         //в данный момент load вызывается из конструктора reader, 
         //как события будут готовы, то нужно будет
         //reader.load(data);                    
});