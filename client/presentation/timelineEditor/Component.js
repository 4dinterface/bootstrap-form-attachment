/**
 * Абстрактный компонент таймлана от которого
 * наследуются все компоненты таймлайна
  */
'use strict';


Define('app.timeline.Component', {


    extend: core.Controller,


    utilites: app.timeline.utilites,


    init: function(cfg) {
        this.apply(cfg);
        this.children = []; // детки-конфетки
        this.dom = {};
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