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
             "core/Component.js",
             "core/data/ObjectCollection.js",
             "core/data/ArrayCollection.js",
             "core/data/Model.js",
             "core/Controller.js",
             "core/View.js",

             "core/widget/widgetManager.js",
             "core/widget/Widget.js",
             "core/ui/panel/Collapsible.js",
             "core/ui/form/Rotator.js",
             "core/ui/form/NumberField.js",
             "core/ui/form/InputColor.js",
             "core/ui/form/Fieldset.js",

             
             // ---------- Model -------------
             "client/business/model/Keyframe.js",
             "client/business/model/KeyframeCollection.js",
             "client/business/model/Property.js",       
             "client/business/model/PropertyCollection.js",       
             "client/business/model/Filter.js",   
             "client/business/model/FilterCollection.js",             
             "client/business/model/Shape.js",   
             "client/business/model/ShapeCollection.js",
             "client/business/model/Composition.js",
             
             "client/proxy/demoData.js",
             "client/proxy/Reader.js",

             // ---------- Scene -------------    
             "client/presentation/scene/shape/GeometricShape.js",
             "client/presentation/scene/shape/HtmlElement.js",
             "client/presentation/scene/shape/Text.js",
             "client/presentation/scene/shape/Circle.js",
             "client/presentation/scene/shape/Rectangle.js",
             "client/presentation/scene/Stage.js",

             // ---------- Movie -------------                        
             'client/business/movie/Fetcher.js',
             'client/business/movie/Movie.js',
             'client/business/movie/StageBuilder.js',

             // ---------- Timeline -------------
             "client/presentation/timelineEditor/utilites.js",
             "client/presentation/timelineEditor/View.js",
             "client/presentation/timelineEditor/Controller.js",

             // ---------- Холст -------------
             "client/presentation/stageEditor/Controller.js",

            
            // ---------- Panels -------------                                     
             "client/presentation/panels/Menu.js",
             "client/presentation/panels/Toolbar.js",
             "client/presentation/panels/Transport.js",
             "client/presentation/properties/View.js",
             "client/presentation/properties/Controller.js"
             
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
                
                //панель управления воспроизведением
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
