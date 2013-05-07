
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
Define("app.widget.widgetManager", /** @lends {app.Component.prototype} */({
    extend:"app.Component",
    mode:"one",
    /**
     * @constructor
     */
    init: function () {	      
        this._super();
    },
            
    widget:{},        
            
    //Обновляет все виджеты на экране
    update:function(target){        
        if(!target) target=$("document");
        $('[widget]').each(function(num,el){            
            var widgetName= $(this).attr("widget");
            $(this).click(function(){
                $(this).remove();
            });
        })
        //переберём все виджеты на экране, исключим уже работающие виджеты
        /* $(target).find("[widget]").not('.activeWidget').each(function(el){   
            alert(1);
            new this.widget[name]({
                target:el
            });            
        }) */        
    },
            
    //зарегистрировать виджет в системе        
    registerWidget:function(name,component){
        this.widget[name]=component;
    }           
}));