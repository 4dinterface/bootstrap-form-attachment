/**
 * APP 
 *      
 *     
 *     (Stage) -- (sceneController)
*/
$( function () {    
        'use strict'	
         var a=new app.ClassLoader();                
         a.require([                                               
             "client/core/Component.js",
             "client/core/ObjectCollection.js",
             "client/core/ArrayCollection.js",
             "client/core/Model.js",

             "client/proxy/demoData.js",
             "client/proxy/Reader.js",
            
             "client/model/Keyframe.js",
             "client/model/KeyframeCollection.js",
             "client/model/Property.js",       
             "client/model/PropertyCollection.js",       
             "client/model/Shape.js",   
             "client/model/ShapeCollection.js",                
             "client/model/Timeline.js",
            
             "client/view/Timeline.js",
             "client/controller/Timeline.js",            
             "client/controller/Toolbar.js",
             "client/controller/Scene.js",

            "client/properties/View.js",
                        
             "client/scene/shape/HtmlElement.js",
             "client/scene/shape/Text.js",
             "client/scene/shape/Circle.js",
             "client/scene/shape/Rectangle.js",
             "client/scene/Stage.js",
            
             'client/movie/Fetcher.js',
             'client/movie/Movie.js',
             
             "client/controller/Menu.js"
             ], function(){
                              
        $(function(){
            var 
                // создадим таймлайн
                timeline = new app.model.Timeline (),

                //сцена         
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
                    timeline:timeline,
                    stage:stage
                    //CHAOS:true
                }),

                // контроллер панели инструментов
                toolbar = new app.controller.Toolbar(),

                // контролёр сцены
                sceneController = new app.controller.Scene({
                    stage:stage,
                    toolbar: toolbar
                }),


                
                //view таймлайна
                tlView = new app.view.Timeline({
                    // доступ к модели таймлайна нам понадобится чтобы его отрисовывать
                    model : timeline,                
                    // доступ к муви, в муви хранится позиция бегунка
                    movie: movie                
                }),               

                //контроллер таймлайна            
                tlController=new app.controller.Timeline({
                    //viev - прямой доступ контролёра к view, пока под вопросом
                    view:tlView,                
                    //модель таймлайна, которую контролёр сможет изменять
                    model:timeline,
                    //movie 
                    movie:movie
                }),

                //панель свойств
                propertiesView=new app.properties.View({
                    model:timeline
                }),              
                
                //верхнее меню
                menu=new app.controller.Menu({
                    reader:reader
                });

             // СОЗДАТЬ ХАОС - демка для Movie
             /*timeline.on('load',function(){                
                
                var CHAOS = true;
                if (CHAOS) {
                    
                    
                }
             })*/
             
             $(".player-play").click(function(){                 
                 movie.play();                 
                 setTimeout(function () {
                        //movie.stop();
                        movie.gotoAndStop(1);
                 }, 60000);
             });
             
             $(".player-pause").click(function(){                 
                 movie.stop();                 
             });
             
             $(".player-back").click(function(){
                 movie.gotoAndStop(1);
             })
             
             
             //команда на загрузку                
             reader.load(data);
        })
    })          
});