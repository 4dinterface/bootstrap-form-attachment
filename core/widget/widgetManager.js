
/**
 * @class
 * @name app.WidgetManager
 * 
 * Менеджер виджетов
 * сканирует область dom в поисках виджета и если видет невключённый виджет то активирует его
 * 
 * Из важных вопросов остаётся биндинг с моделью, требуется ли он. 
 * Вообще как работает виджет, как происходит обмен данными, вопрос остаётся открытым
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

    // зарегистрированные виджеты по алиасам
    regWidget:{},                    
            
    // живые виджеты   
    liveWidget:{},
            
    //Обновляет все виджеты на экране
    update:function(target){        
        
        var me=this,                
            id;
        
        //если target непередали используем весь документ
        //target=target || $(document);                     

        //меод возвращает ID, этот код неверный,так как в случае отсутствия id его нужно создать уникальным
        id= me.getTargetId(target);            

        //если для этого dom элемента виджеты нет ещё не одного виджета тогда создадим массив
        me.liveWidget[id]=me.liveWidget[id]||{};
        //me.liveWidget[id]=me.liveWidget[id]||[];
        


        //перебираем все виджеты в пределах target
        //TODO а надо ли исключать live_widget ?
         $('[widget]',target).not('.live_widget').each(function(num,el){            

                var widgetName= $(this).attr("widget");                    

                //если муляж виджета тогда пропускаем его
                if (widgetName=="null") return;                                                

                //создадим виджет                
                var widget=new me.regWidget[widgetName]({ 
                        domTarget:$(this) 
                    });
                                    
                me.liveWidget[id][ $(this).attr('id') ]=widget;                                                                    
        })        
        
        //вернём ссылка на обьект с виджетами
        return me.liveWidget[id];
    },
            
    //обновляет свойства        
    refresh:function(target){
        //console.log('widgets=',this.getTargetId(target));
        
        var id=this.getTargetId(target),
            widgets=this.liveWidget[id],
            item;
            
        //вызываем для каждого виджета свойство refresh
        for (item in widgets){
            widgets[item].refresh ();
        }        
    },            
            
            
    // концепция
    // найти виджеты
    // неактивные активировать
    // если дум удалили то удалить и виджет
            
    //зарегистрировать виджет в менеджере
    registerWidget:function(name,component){
        this.regWidget[name]=component;
    },

            
    //вспомогательный метод возвращающий ID         
    getTargetId:function(target){          
        return $(target).attr('id');
    }
}));
