/**
 */
'use strict';

Define('app.timeline.Timeline', {
    extend: core.Component,

    utilites: app.timeline.utilites,


    init: function(cfg) {
        this.apply(cfg);
        this.children = []; // детки-конфетки

        this.dom = {};
        this.dom.root = this.utilites.getById('timeline');

        // Левая панель
        this.children.push(new app.timeline.panels.Left({
            model: this.model,
            movie: this.movie,
            parent: this
        }));

        // Правая панель
        this.children.push(new app.timeline.panels.Right({
            model: this.model,
            movie: this.movie,
            parent: this
        }));
    },


    destroy: function() {
        delete this.dom;
    }
});