/**
 * APP 
 *  здесь создаются обьекты системы
 *  А также создаются связи между обьектами, 
 *  обьект сотрудничает с другими только через эти связи, 
 *  можно скзать что это рельсы по котрым ездят сообщения и вызовы операций
 *  
 *  Любопытная идея, 
 *  к примеру компоненты timelineView и timelineController можно сгруппировать в более крупные компонент timeline
 *  и работать с ними как с целым компонентом, в то время как внутри компонента таймлайн будет описана вся 
 *  внутрянняя организация  компонента таймлайн
*/

$( function () {    
        'use strict'	
        
         var a=new core.ClassLoader();                
         a.require([
             //классы ядра
             "client/core/Component.js",
             "client/core/data/ObjectCollection.js",
             "client/core/data/ArrayCollection.js",
             "client/core/data/Model.js",
             "client/core/Controller.js",
             "client/core/View.js",

             "client/core/widget/widgetManager.js",
             "client/core/widget/widget.js",
             "client/core/ui/panel/Collapsible.js",
             "client/core/ui/form/Rotator.js",
             "client/core/ui/form/NumberField.js",             

             
             // ---------- Model -------------
             "client/model/Keyframe.js",
             "client/model/KeyframeCollection.js",
             "client/model/Property.js",       
             "client/model/PropertyCollection.js",       
             "client/model/Filter.js",   
             "client/model/FilterCollection.js",             
             "client/model/Shape.js",   
             "client/model/ShapeCollection.js",
             "client/model/Composition.js",
             
             "client/proxy/demoData.js",
             "client/proxy/Reader.js",

             // ---------- Scene -------------                        
             "client/scene/shape/HtmlElement.js",
             "client/scene/shape/Text.js",
             "client/scene/shape/Circle.js",
             "client/scene/shape/Rectangle.js",
             "client/scene/Stage.js",

             // ---------- Movie -------------                        
             'client/movie/Fetcher.js',
             'client/movie/Movie.js',
             'client/movie/StageBuilder.js',

             // ---------- Timeline -------------
             "client/timeline/utilites.js",
             "client/timeline/View.js",
             "client/timeline/Controller.js",

             // ---------- Холст -------------
             "client/editor/Controller.js",

            
            // ---------- Panels -------------                                     
             "client/panels/Menu.js",
             "client/panels/Toolbar.js",
             "client/panels/Transport.js",
             "client/properties/View.js",
             "client/properties/Controller.js"
             
             ], function(){
                              
        $(function(){                                   
            var                
                // создадим таймлайн
                timeline = new app.model.Composition(),

                //сцена         
                stage=new app.scene.Stage(),
            
                //создадим конструктор сцены
                stageBuilder=new app.movie.StageBuilder({
                    composition:timeline,
                    stage:stage
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
                // TODO, рассмотреть возможность реализации тулбара через виджет
                toolbar = new app.panels.Toolbar(),

                // контролёр сцены
                sceneController = new app.editor.Сontroller({
                    stage:stage,     
                    toolbar: toolbar
                }),
                                
                                
                //view таймлайна
                tlView = new app.timeline.View({
                    // доступ к модели таймлайна нам понадобится чтобы его отрисовывать
                    model : timeline,                
                    // доступ к муви, в муви хранится позиция бегунка
                    movie: movie                
                }),               

                //контроллер таймлайна            
                tlController=new app.timeline.Controller({
                    //viev - прямой доступ контролёра к view, пока под вопросом
                    view:tlView,                
                    //модель таймлайна, которую контролёр сможет изменять
                    model:timeline,
                    //movie 
                    movie:movie
                }),
                
                
                //панель свойств
                propertiesView=new app.properties.View({
                    model:timeline,
                    movie:movie
                }),              
                
                propertiesController=new app.properties.Сontroller({
                    model:timeline,
                    view:propertiesView,
                    movie:movie
                }),              

            
                //верхнее меню
                menu=new app.panels.Menu({
                    reader:reader
                }),
                
                transport=new app.panels.Transport({
                    movie:movie                    
                }),

                //загрузчик данных, который загрузит данные на сцену, и в таймлайн
                reader=new app.proxy.Reader({
                    stage:stage,
                    timeline:timeline
                });

                //команда на загрузку                
                reader.load(data);                                 
        })
    })          
});
