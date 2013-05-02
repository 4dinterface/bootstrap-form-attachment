Define("app.editor.Сontroller", {

    extend: app.Component,

    init: function (prop) {
        this._super();
        this.apply( prop );

        this.toolbar.on("toolbarchange", function (e) {
            var name = e.name;
            console.log(name);
        });
        
    }
});
