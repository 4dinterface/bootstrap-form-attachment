Define("app.editor.Сontroller", {

    extend: core.Component,

    init: function (prop) {
        this._super();
        this.apply( prop );

        this.toolbar.on("toolbarchange", function (e) {
            var name = e.name;
            console.log(name);

        var selectorHTML = '<div class="editor-selector" style="width:200px; height:200px;">\
                                <div class="editor-selector-brick editor-selector-brick-left-top"></div>\
                                <div class="editor-selector-brick editor-selector-brick-top-center"></div>\
                                <div class="editor-selector-brick editor-selector-brick-right-top"></div>\
                                <div class="editor-selector-brick editor-selector-brick-right-center"></div>\
                                <div class="editor-selector-brick editor-selector-brick-right-bottom"></div>\
                                <div class="editor-selector-brick editor-selector-brick-bottom-center"></div>\
                                <div class="editor-selector-brick editor-selector-brick-left-bottom"></div>\
                                <div class="editor-selector-brick editor-selector-brick-left-center"></div>\
                            </div>';

            $('.tab-body-scene').prepend(selectorHTML);

        });
    }
});
