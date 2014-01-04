/**
 */
'use strict';


Define('app.timeline.panels.right.shape.Property.Controller', {

    extend: core.Controller,

    init: function(cfg) {
        this.apply(cfg);
        this.attach(this.dom.property, this.events.property);
        this.dom.document = document;


        this.owner.model.on('keyframechange', function(ev) {
            console.log('keyframechange',ev);
            // код указан примерно
            //примерно так, id дум элемента лучше назначить в view чтобы он был один с моделью
            //getElementById('el'+ev.id).style.left=ev.time;
        });
        
        //определяем блок
        var buffer = new app.business.model.KeyframeBlock({
            time:1000,
            model:this.owner.model
        });

        //вставляеи блок в колекцию  выбранных блоков, при этом коллекция обнуляция
        this.owner.parent.parent.parent.model.get('selectedBlock').setBlock(buffer);

        //смещает все ключи во всех блоках коллекции на 1000 миллисекунд вправо
        this.owner.parent.parent.parent.model.get('selectedBlock').offset(1000);
    },


    events: {
        property: {
            mousedown: function(event) {
                var propertyOffsetX = this.owner.view.getPropertyOffsetX();
                var editorOffsetX = this.owner.parent.parent.view.getEditorOffsetX();
                var offsetX = event.pageX - (propertyOffsetX - editorOffsetX);
                this.attach(this.dom.document, this.events.document, offsetX);
                event.stopPropagation();
                event.preventDefault();
            }
        },
        document: {
            mousemove: function(event, offsetX) {
                this.dom.property.style.left = event.pageX - offsetX + 'px';
            },
            mouseup: function() {
                this.detach(this.dom.document, this.events.document);
            }
        }
    },


    destroy: function() {
        //
    }


});
