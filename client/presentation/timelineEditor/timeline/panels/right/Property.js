/**
 */
'use strict';

Define('app.timeline.panels.right.Property', {
    extend: "app.timeline.Component",


    init: function() {
        this._super();
        
        this.dom.root = this.dom.children = this.template.compile();
        
        this.render();

        // Активное/неактивное свойство
        this.model.on(app.events.property.CHANGE, 'disabled', function(event) {
            this.dom.root.classList[event.value ? 'add' : 'remove']('disabled');
        }.bind(this));
    },

        
    render: function() {
        var keyframeCollection = this.model.get('keyframeCollection');

        for(var i = 0, len = keyframeCollection.length - 1; i < len; i++) {            
            
            this.addChild(new app.timeline.panels.right.Transition({
                composition: this.composition,
                keyframeCollection:keyframeCollection,
                model: [
                    keyframeCollection.item(i),
                    keyframeCollection.item(i+1)
                ],
                parent: this
            }));
        }
    },


    /**
     * Добавляет переход в свойство
     * @param {Object} child
     */
    addChild: function(child) {
        this.dom.children.appendChild(child.dom.root);
        this.children.push(child);        
    },


    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.right.property,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});