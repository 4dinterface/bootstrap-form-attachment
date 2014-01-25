/**
 * @file Константы с именами событий
 * @author ColCh <colouredchalkmelky@gmail.com>
 * Date: 25.01.14
 */
app.events = {

    composition: {
        /**
         * вызывается из метода set автоматически
         */
        CHANGE: 'compositionchange'
    },

    fetcher: {
        NO_SHAPE_RENDERED: 'noshaperendered'
    },

    keyframecollection: {
        /**
         * Событие изменения коллекции ключевых кадров
         * вызывается при :
         * -    перемещении ключей
         * -    групповом перемещении ключей
         * -    удалении ключей
         */
        CHANGE: "keyframecollectionchange"
    },

    model: {
    },

    movie: {
        FRAME: 'onframe',
        PAUSE: 'onpause',
        STOP: 'onstop',
        PLAY: 'onplay'
    },

    project: {
        /** Вызывается при изменении свойств через 'set'. Всплывает. */
        CHANGE: 'projectchange'
    },

    property: {
        /** Вызывается при изменении свойств через 'set'. Всплывает. */
        CHANGE: 'propertychange'
    },

    propertycollection: {
        /** Изменение состава свойств (стало видно новое свойств/или наоборот его убрали) */
        CHANGE: 'propertycollectionchange'
    },

    shape: {
        /** Изменение фигуры */
        CHANGE: 'shapechange'
    },

    shapecollection: {
        /** Вызывается при изменении свойств через 'set'. Всплывает. */
        CHANGE: 'shapecollectionchange'
    },

    toolbar: {
        /** @see {app.presentation.panels.Toolbar.init} */
        CHANGE: "toolbarchange"
    }

};