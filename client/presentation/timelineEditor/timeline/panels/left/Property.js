/**
 */
'use strict';

Define('app.timeline.panels.left.Property', {
    extend: "app.timeline.Component",


    init: function() {
        this._super();

        this.dom.root = this.template.compile(this.model);
        this.dom.disabled = this.dom.root.querySelector('[disabled]');

        this.addListeners(this.dom, this.events);

        // Активное/неактивное свойство
        this.model.on('propertychange', 'disabled', function(event) {
            this.dom.root.classList[event.value ? 'add' : 'remove']('disabled');
        }.bind(this));
    },


    events: {
        disabled: {
            click: function() {
                this.model.set('disabled', !this.model.get('disabled'));
            }
        }
    },


    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.left.property,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});