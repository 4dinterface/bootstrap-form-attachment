/**
 * APP 
 *  здесь создаются обьекты системы
 *  А также создаются связи между обьектами, 
 *  обьект сотрудничает с другими только через эти связи, 
 *  можно скзать что это рельсы по котрым ездят сообщения и вызовы операций
*/

core.require([ "/core/package.json", "/client/package.json" ], function(){
    'use strict'        
                     
    // TODO нужна Реакция на загрузку проекта                                  
    // TODO нужна Реакция на новый проект                 
    var                
        // создадим проект
        project = new app.business.model.Project(),
                                                                                                      
        //загрузчик данных, который загрузит данные на сцену, и в таймлайн
        reader=new app.proxy.Reader({            
            project:project
        }),
                
        //верхнее меню
        menu=new app.presentation.panels.Menu({
            reader:reader
        });

        //команда на загрузку                
        reader.load(data,function(){                                                            
                    
            var 
                play=new player.Player({
                    timeline:project.get('symbolCollection').get('root').get('compositionCollection').get('0'),                    
                }),                                
                                                                                        
                //Фасад бизнес слоя
                facade=new app.business.Facade({
                    movie:play.rootMovie,
                    project:project,
                    stageBuilder:play.stageBuilder
                }),                    
                                        
                //Редактор таймлайна
                timelineEditor=new app.presentation.timelineEditor.Component({
                    movie:play.rootMovie,
                    //TODO композиция должна устанавливаться после инициализации
                    composition:project.get('symbolCollection').get('root').get('compositionCollection').get('0')
                 }),
                    
                                        
                 //Редактор свойств
                 propertyEditor=new app.presentation.properties.Component({                                                
                    stage:play.stage,
                    facade:facade
                 }),                                                                                                              
                    
                 //Редактор холста
                 stageEditor=new app.presentation.stageEditor.Component({
                    stage:play.stage,
                    facade:facade
                 }),
                                    
                 //панель управления воспроизведением
                 transport=new app.presentation.panels.Transport({
                    movie:play.rootMovie                    
                 });
                    
            //TODO убрать КОСТЫЛЬ  !!!!!!
            project.get('symbolCollection').get('root').get('compositionCollection').get('0').fire('load',{});

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
