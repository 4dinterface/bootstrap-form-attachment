
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
Define("app.widget.WidgetManager", /** @lends {app.Component.prototype} */({
    extend:"app.Component",
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
                $(this).hide();
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
    regWidget:function(name,component){
        this.widget[name]=component;
    }           
}));