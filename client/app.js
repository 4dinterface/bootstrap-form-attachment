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
             "core/Behaviour.js",
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
             "client/presentation/timelineEditor/timeline/Component.js",
             "client/presentation/timelineEditor/timeline/Controller.js",
             "client/presentation/timelineEditor/timeline/View.js",
             // --------------------------------
             "client/presentation/timelineEditor/timeline/panels/left/Component.js",
             "client/presentation/timelineEditor/timeline/panels/left/Controller.js",
             "client/presentation/timelineEditor/timeline/panels/left/View.js",
             // --------------------------------
             "client/presentation/timelineEditor/timeline/panels/left/shape/Component.js",
             "client/presentation/timelineEditor/timeline/panels/left/shape/Controller.js",
             "client/presentation/timelineEditor/timeline/panels/left/shape/View.js",
             // --------------------------------
             "client/presentation/timelineEditor/timeline/panels/right/Component.js",
             "client/presentation/timelineEditor/timeline/panels/right/Controller.js",
             "client/presentation/timelineEditor/timeline/panels/right/View.js",
             // --------------------------------
             "client/presentation/timelineEditor/Component.js",

             // ---------- Холст -------------
             "client/presentation/stageEditor/Controller.js",
             "client/presentation/stageEditor/Component.js",
             "client/presentation/stageEditor/Toolbar.js",

             "client/presentation/stageEditor/behaviours/Selector.js",
             "client/presentation/stageEditor/behaviours/ShapeDrawer.js",             
             "client/presentation/stageEditor/behaviours/Drager.js",             
             
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
                project = new app.business.model.Project(),
                //сцена         
                stage=new app.presentation.stage.Stage(),                                
                                                        
                //загрузчик данных, который загрузит данные на сцену, и в таймлайн
                reader=new app.proxy.Reader({
                    stage:stage,
                    project:project
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
                    // TODO - 
                    movie=new app.movie.Movie({
                        timeline:project.get('symbolCollection').get('root').get('compositionCollection').get('0'),
                        stage:stage                        
                    }),
                    
                    //создадим конструктор сцены
                    stageBuilder=new app.movie.StageBuilder({
                        composition:project.get('symbolCollection').get('root').get('compositionCollection').get('0'),
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
                        composition:project.get('symbolCollection').get('root').get('compositionCollection').get('0')
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
                    project.get('symbolCollection').get('root').get('compositionCollection').get('0').fire('load',{});                                        
                    //TODO еще один костыль

                    setTimeout(function(){
                        movie.gotoAndStop(1);
                    },1)
                    
                    
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
