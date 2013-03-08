Define("app.controller.Scene", {
    extend: app.Component,
    init: function (prop) {
        this.super();
        this.apply(prop);
        alert("hello Hnoy");
    }
});