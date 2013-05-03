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
             "client/core/Controller.js",

             "client/proxy/demoData.js",
             "client/proxy/Reader.js",
            
             "client/model/Keyframe.js",
             "client/model/KeyframeCollection.js",
             "client/model/Property.js",       
             "client/model/PropertyCollection.js",       
             "client/model/Shape.js",   
             "client/model/ShapeCollection.js",
             "client/model/Composition.js",

             // ---------- Timeline -------------
             "client/timeline/utilites.js",
             "client/timeline/view.js",
             "client/timeline/controller.js",

             "client/panels/Toolbar.js",
             "client/panels/Transport.js",
             "client/properties/View.js", 
             "client/editor/Controller.js",

            
                        
             "client/scene/shape/HtmlElement.js",
             "client/scene/shape/Text.js",
             "client/scene/shape/Circle.js",
             "client/scene/shape/Rectangle.js",
             "client/scene/Stage.js",
            
             'client/movie/Fetcher.js',
             'client/movie/Movie.js',
             
             "client/panels/Menu.js"
             ], function(){
                              
        $(function(){
            var 
                // создадим таймлайн
                timeline = new app.model.Composition(),

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
                toolbar = new app.panels.Toolbar(),

                // контролёр сцены
                sceneController = new app.editor.Сontroller({
                    stage:stage,
                    toolbar: toolbar
                }),


                
                //view таймлайна
                tlView = new app.timeline.view({
                    // доступ к модели таймлайна нам понадобится чтобы его отрисовывать
                    model : timeline,                
                    // доступ к муви, в муви хранится позиция бегунка
                    movie: movie                
                }),               

                //контроллер таймлайна            
                tlController=new app.timeline.controller({
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
                menu=new app.panels.Menu({
                    reader:reader
                }),
                
                transport=new app.panels.Transport({
                    movie:movie                    
                });

             // СОЗДАТЬ ХАОС - демка для Movie
             /*timeline.on('load',function(){                
                
                var CHAOS = true;
                if (CHAOS) {
                    
                    
                }
             })*/
             
            
             //команда на загрузку                
             reader.load(data);
        })
    })          
});
