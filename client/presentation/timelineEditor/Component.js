/**
 * Абстрактный компонент таймлана от которого
 * наследуются все компоненты таймлайна
  */
'use strict';


Define('app.timeline.Component', {

    extend: "core.Controller",
    
    //указываем что есть зависимость от обьекта app.timeline.utilites
    require:['app.timeline.utilites'],

    // Опасный код, если скрипты грузятся асинхронно то нет гарантии что app.timeline.utilites загрузится раньше
    //utilites: app.timeline.utilites,

    init: function(cfg) {
        //безопасный код
        this.utilites=app.timeline.utilites;
        
        this.apply(cfg);
        this.children = []; // детки-конфетки
        this.dom = {};
        this._listeners = {};
    },


    destroy: function() {
        if (this.children && this.children.length) {
            for(var key in Object.keys(this.children)) {
                this.children[key].destroy();
            }
        }
        this._super();
    }

});