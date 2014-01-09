// контроллер панели инструментов
// TODO, рассмотреть возможность реализации тулбара через виджет

/**
 * Контроллер таймлана
 *
 */
'use strict';

Define( 'app.presentation.stageEditor.Component', {

    extend: core.Component,
    //view таймлайна
    
    //view:null,
    controller:null,
    toolbar:null,
    
    init:function(cnf){        
        //тулбары
        this.toolbar = new app.presentation.panels.Toolbar();
        
        // контролёр сцены
        this.controller = new app.business.stageEditor.Сontroller({
            stage:cnf.stage,     
            toolbar: this.toolbar,
            facade:cnf.facade
        });                                                                                                                        
    }        
});        