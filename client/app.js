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
             "client/business/model/CompositionCollection.js",
             "client/business/model/Symbol.js",
             "client/business/model/SymbolCollection.js",
             "client/business/model/Project.js",
             
             "client/proxy/demoData.js",
             "client/proxy/Reader.js",

             // ---------- Stage -------------    
             "client/presentation/stage/shape/GeometricShape.js",
             "client/presentation/stage/shape/HtmlElement.js",
             "client/presentation/stage/shape/Text.js",
             "client/presentation/stage/shape/Circle.js",
             "client/presentation/stage/shape/Rectangle.js",
             "client/presentation/stage/Stage.js",

             // ---------- Movie -------------                        
             'client/business/movie/Fetcher.js',
             'client/business/movie/Movie.js',
             'client/business/movie/StageBuilder.js',
             
             // ---------- Facade -------------                        
             'client/business/Facade.js',
             
             // ---------- Timeline -------------
             "client/presentation/timelineEditor/utilites.js",
             "client/presentation/timelineEditor/View.js",
             "client/presentation/timelineEditor/Controller.js",
             "client/presentation/timelineEditor/Component.js",

             // ---------- Холст -------------
             "client/presentation/stageEditor/Controller.js",
             "client/presentation/stageEditor/Component.js",
             "client/presentation/stageEditor/Toolbar.js",  
             
             // ------- Редактор свойств ----------
             "client/presentation/propertiesEditor/View.js",
             "client/presentation/propertiesEditor/Controller.js",
             "client/presentation/propertiesEditor/Component.js",
             
            // ---------- Panels -------------                                     
             "client/presentation/panels/Menu.js",             
             "client/presentation/panels/Transport.js"
             
             
             ], function(){                 
                 
             // TODO нужна Реакция на загрузку проекта                                  
             // TODO нужна Реакция на новый проект             
        $(function(){                                      
            var                
                // создадим таймлайн
                project = new app.business.model.CompositionCollection(),
                //сцена         
                stage=new app.presentation.stage.Stage(),                                
                                                        
                //загрузчик данных, который загрузит данные на сцену, и в таймлайн
                reader=new app.proxy.Reader({
                    stage:stage,
                    timeline:project
                }),
                
                //верхнее меню
                menu=new app.presentation.panels.Menu({
                    reader:reader
                });

                //команда на загрузку                
                reader.load(data,function(){                                                            
                    
                    var 
                    // создадим ролик
                    // ролику понадобится доступ к таймлайну,  посколько анимация происходит по ключам из таймлайна
                    // а также ему понадобится доступ к сцене на которой он будет переставлять обьекты                    
                    movie=new app.movie.Movie({
                        timeline:project.get('root').get('compositionCollection').get('0'),
                        stage:stage                        
                    }),
                    
                    //создадим конструктор сцены
                    stageBuilder=new app.movie.StageBuilder({
                        composition:project.get('root').get('compositionCollection').get('0'),
                        stage:stage
                    }),
                    
                    //Фасад бизнес слоя
                    facade=new app.business.Facade({
                        movie:movie,
                        project:project,
                        stageBuilder:stageBuilder
                    }),                    
                                        
                    //Редактор таймлайна
                    timelineEditor=new app.presentation.timelineEditor.Component({
                        movie:movie,
                        //TODO композиция должна устанавливаться после инициализации
                        composition:project.get('root').get('compositionCollection').get('0')
                    }),
                    
                    //Редактор свойств
                    propertyEditor=new app.presentation.properties.Component({                                                
                        stage:stage,
                        facade:facade
                    }),                                                                                                              
                    
                    //Редактор холста
                    stageEditor=new app.presentation.stageEditor.Component({
                        stage:stage,
                        facade:facade
                    }),
                                    
                    //панель управления воспроизведением
                    transport=new app.presentation.panels.Transport({
                        movie:movie                    
                    })
                    
                    //TODO убрать КОСТЫЛЬ  !!!!!!                                               
                    project.get('root').get('compositionCollection').get('0').fire('load',{});                                        
                    
                    //=======================================================//
                    //======== эксперемент с переключением композиций =======//
                    //=======================================================//                    
                    $('.tab-head-title__timeline').on('click',function(){                        
                        setComposition( $(this).attr('target')  );
                    })
                    
                    function setComposition(compositionName){                                                            
                        facade.selectComposition( compositionName );
                    }
                    
                })                                
        })
    })          
});
