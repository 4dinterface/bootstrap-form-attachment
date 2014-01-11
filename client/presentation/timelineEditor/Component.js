/**
 * Компонент таймлана
 *
 * Объектная структура таймлайна

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

 *
 */
'use strict';

Define('app.presentation.timelineEditor.Component', {

    extend: core.Component,

    init: function(cfg) {

        this.timeline = new app.timeline.Timeline({
            composition: cfg.composition,
            movie: cfg.movie
        });

    }
});        