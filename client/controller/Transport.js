Define("app.controller.Transport", {
    extend: app.Component,

    init: function (cfg) {
        var me = this;
        this.apply(cfg);
        this._super();                
    }
    
});
