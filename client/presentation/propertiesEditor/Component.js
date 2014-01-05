//панель свойств
        
/**
 * Контроллер таймлана
 *
 */
'use strict';

Define( 'app.presentation.properties.Component', {

    extend: core.Component,
    //view таймлайна
    
    view:null,
    controller:null,
    
    init:function(cnf){        
        this.view=new app.presentation.properties.View({            
            stage:cnf.stage
        }),              
                    
        this.controller=new app.presentation.properties.Сontroller({            
            view:this.view,            
            stage:cnf.stage,
            facade:cnf.facade
        });        
    }    
    //ниже должны идти функции
    
});                