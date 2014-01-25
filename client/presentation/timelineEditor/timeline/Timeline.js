/*

 Объектная структура таймлайна

 таймлайн: {
     panels: [
         {
             фигуры: [
                свойство: {},
                свойство: {},
             ]
         },
         {
             бегунок: {},
             линейка: {},
             фигуры: [
                 свойство: {
                    keys: []
                 },
                 свойство: {
                    keys: []
                 },
             ]
         }
     ]
 }


*/


'use strict';

Define('app.presentation.timelineEditor.Component', {
    extend: "app.timeline.Component",


    init: function() {
        this._super();

        this.dom.root = this.utilites.getById('timeline');

        // Левая панель
        this.children.push(new app.timeline.panels.Left({
            composition: this.composition,
            model: this.composition,
            movie: this.movie,
            parent: this
        }));

        // Правая панель
        this.children.push(new app.timeline.panels.Right({
            composition: this.composition,
            model: this.composition,
            movie: this.movie,
            parent: this
        }));
    }
});