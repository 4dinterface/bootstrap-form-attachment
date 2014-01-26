/**
 */
'use strict';

Define('app.timeline.panels.Right', {
    extend: "app.timeline.Component",


    init: function() {
        this._super();

        this.dom.root = this.utilites.getById('timeline-panel-right__editor');
        this.dom.editorHead = this.utilites.getById('timeline-panel-right__editor-head');
        this.dom.editorBody = this.utilites.getById('timeline-panel-right__editor-body');
        this.dom.children = this.utilites.getById('timeline-panel-right__editor-body__shapes');

        this.addListeners(this.dom, this.events);

        // ------------------------------

        // Бегунок
        this.runner = new app.timeline.panels.right.Runner({
            composition: this.composition,
            movie: this.movie,
            parent: this
        });

        // Линейка
        this.ruler = new app.timeline.panels.right.Ruler({
            composition: this.composition,
            parent: this
        });

        // ------------------------------

        // Авто-скролл при воспроизведении
        this.enableAutoScroll = false;

        this.movie.on('onplay', function() {
            this.enableAutoScroll = true;
        }.bind(this));

        this.movie.on('onpause', function() {
            this.enableAutoScroll = false;
        }.bind(this));

        this.movie.on('onstop', function() {
            this.enableAutoScroll = false;
        }.bind(this));

        this.movie.on(app.events.movie.FRAME, function(e) {
            var x = this.utilites.toPixels(this.model.pixelsPerSecond, e.elapsedTime);
            this.autoScroll(x);
        }.bind(this));

        // ------------------------------

        this.model.on('load', function() {
            this.render();
        }.bind(this));
    },


    render: function() {
        this.model.get('shapeCollection').forEach(function(item) {
            this.addChild(new app.timeline.panels.right.Shape({
                composition: this.composition,
                model: item,
                parent: this
            }));
        }, this);
    },


    /**
     * Обработчики DOM событий для элементов this.dom[key]
     * @this {child}
     */
    events: {
        editorHead: {
            click: function(event) {
                var shiftX = this.getEditorOffsetX() - this.getEditorScrollLeft();
                var x = event.pageX - shiftX;
                var ms = this.utilites.toMilliseconds(this.model.pixelsPerSecond, x);
                this.movie.gotoAndStop(ms);
            }
        }
    },


    autoScroll: function(x) {
        var scrollLeft = this.getEditorScrollLeft();
        var visibleWidth = this.getEditorVisibleWidth();
        var percent = (x - scrollLeft) / visibleWidth * 100;
        if (percent < 90) return;
        this.editorScrollTo(x);
//        this.editorScrollTo(x - elem.clientWidth * 0.1);
    },


    editorScrollTo: function(x) {
        this.dom.editorBody.scrollLeft = x;
//        this.movie.pause();  // debug only
    },

    /**
     * Добавляет фигуру на панель
     * @param {Object} child
     */
    addChild: function(child) {
        this.dom.children.appendChild(child.dom.root);
        this.children.push(child);
    },


    getEditorOffsetX: function() {
        var rect = this.dom.root.getBoundingClientRect();
        return rect.left;
    },


    getEditorScrollLeft: function() {
        return this.dom.editorBody.scrollLeft;
    },


    getEditorVisibleWidth: function() {
        return this.dom.editorBody.clientWidth;
    }
});
