/**
 */
'use strict';

Define('app.timeline.panels.right.Transition', {
    extend: 'app.timeline.Component',    
    block:null,
    
    init: function() {
        this._super();
        //this.collection=

        this.dom.document = document;
        this.dom.root = this.dom.children = this.template.compile({
            left: this.utilites.toPixels(this.composition.pixelsPerSecond, this.model[0].get('key')),
            width: this.utilites.toPixels(this.composition.pixelsPerSecond, this.model[1].get('key') - this.model[0].get('key'))
        });

        this.dragShiftX = 0; //
        this.addListeners(['root'], this.events);
        this.keyframeCollection.on('keyframechange',function(){
            this.refresh();
        }.bind(this));
    },


    /**
     * Обработчики DOM событий для элементов this.dom[key]
     * @this {child}
     */
    events: {
        //элемент transition
        root: {
            mousedown: function(event) {
                //alert(8);
                //var offsetX = event.pageX - this.getRootOffsetX();
                //this.dragShiftX = offsetX + this.parent.parent.parent.getEditorOffsetX();
                this.dragShiftX=event.pageX;      
                
                var block=new app.business.model.KeyframeBlock({
                    model:this.keyframeCollection,
                    time:this.model[0].get('key')
                });
                
                if (event.ctrlKey == true) this.composition.get('selectedBlock').add(block);
                else this.composition.get('selectedBlock').setBlock(block);
                                                    
                                
                this.addListeners(['document'], this.events);                
                this.model[0].on('keyframechange',this.refresh.bind(this));                
                
                event.stopPropagation();
                event.preventDefault();                
            }
        },
        document: {
            mousemove: function(event) {
                //console.log(event.pageX - this.dragShiftX);                
                var x = Math.max(event.pageX - this.dragShiftX, 0),
                    ms = this.utilites.toMilliseconds(this.composition.pixelsPerSecond, x);
            
                this.composition.get('selectedBlock').offset(ms);                               
                //this.dom.root.style.left = event.pageX - this.dragShiftX + 'px';
            },
            mouseup: function() {
                this.removeListeners(['document'], this.events);
                this.composition.get('selectedBlock').fixPosition();
            }
        }
    },

    
    getRootOffsetX: function() {
        var rect = this.dom.root.getBoundingClientRect();
        return rect.left;
    },
    
    refresh:function(){        
        var x1=this.utilites.toPixels(this.composition.pixelsPerSecond, this.model[0].get('key'));
        var x2=this.utilites.toPixels(this.composition.pixelsPerSecond, this.model[1].get('key'));

        this.dom.root.style.left=x1+ 'px';                
        
        //this.dom.root.style.left = event.pageX - this.dragShiftX + 'px';        
        if (this.model[0].get('select')){
            this.dom.root.classList.add('timeline__transition_select')    
        } else {
            this.dom.root.classList.remove('timeline__transition_select');            
        }                
    },


    /**
     * Шаблонизация
     */
    template: {
        // функция шаблонизации возвращающая html строку
        _fn: app.templates.timeline.panels.right.transition,
        compile: function(data) {
            return app.timeline.utilites.stringToDOM(this._fn(data));
        }
    }
});