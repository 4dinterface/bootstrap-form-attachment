Define("app.panels.Toolbar", {

    extend: core.Component,

    init: function () {

        var me = this;
        this._super();

        $('.body-tools').on('click', function (e) {

            var target = e.target,
                $target = $(target),
                name,
                tool,
                parent;

            if ($target.hasClass('tool')) {
                parent = target;
                tool = target.firstChild;
            }
            else if ($target.hasClass('tool-item')) {
                parent = target.parentNode;
                tool = target;
            }
            else {
                return;
            }

            name = target.className.replace(/tool-item /, '');

            if (this.selected) {
                $(this.selected).removeClass('tool__selected');
            }

            this.selected = parent;

            $(this.selected).addClass('tool__selected');

            me.fire("toolbarchange", {
                name:name
            });

        });

    }
});
