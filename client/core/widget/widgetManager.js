
/**
 * @class
 * @name app.WidgetManager
 * 
 * Менеджер виджетов
 * сканирует область dom в поисках виджета и если видет невключённый виджет то активирует его
 * 
 * Из важных вопросов остаётся биндинг с моделью, требуется ли он. 
 * Вообще как работает виджет, как происходит обмен данными, вопрос остаётся открытым
 * 
 */
Define("core.widget.widgetManager", /** @lends {app.Component.prototype} */({
    extend:"core.Component",
    mode:"one",
    /**
     * @constructor
     */
    init: function () {	      
        this._super();
    },
            
    regWidget:{},        
            
    //Обновляет все виджеты на экране
    update:function(target){        
        var me=this;
        //если target непередали используем весь документ
        if(!target) target=$(document);

        //перебираем все виджеты в пределах target
        $('[widget]',target).not('.live_widget').each(function(num,el){            
            var widgetName= $(this).attr("widget");            
            
            new me.regWidget[widgetName]({ 
                domTarget:$(this) 
            });            
            
        })        
    },
    // концепция
    // найти виджеты
    // неактивные активировать
    // если дум удалили то удалить и виджет
            
    //зарегистрировать виджет в менеджере
    registerWidget:function(name,component){
        this.regWidget[name]=component;
    }           
}));