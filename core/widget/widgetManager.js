'use strict';
/**
 * 
 * Менеджер виджетов
 * сканирует область dom в поисках виджета и если видет невключённый виджет то активирует его
 * 
 * Из важных вопросов остаётся биндинг с моделью, требуется ли он. 
 * Вообще как работает виджет, как происходит обмен данными, вопрос остаётся открытым
 * 
 * @class widgetManager
 */
Define("core.widget.widgetManager", /** @lends widgetManager.prototype */{
    extend:"core.Component",
    mode:"one",    
    /* 
     * @constructs 
     */
    init: function () {	      
        this._super();
    },

    // зарегистрированные виджеты по алиасам
    regWidget:{},                    
            
    // живые виджеты   
    liveWidget:{},
            
    /**
     * Обновляет все виджеты на экране
     */
    update:function(target){        
        
        var me=this,                
            id;       
        //если target непередали используем весь документ
        //target=target || $(document);                     

        //меод возвращает ID, этот код неверный,так как в случае отсутствия id его нужно создать уникальным
        id= me.getTargetId(target);            

        //если этого dom элемент несодержит виджеты тогда создадим обьект
        me.liveWidget[id]=me.liveWidget[id]||{};
        //me.liveWidget[id]=me.liveWidget[id]||[];
        
        //перебираем все виджеты в пределах target
        //TODO а надо ли исключать live_widget ?
         $('[widget]',target).not('.live_widget').each(function(num,el){            
                var properties={},
                    widgetName= $(this).attr("widget");                                                 
                    
                //если муляж виджета тогда пропускаем его
                if (widgetName=="null") return; 
                
                //подготовим параметры                
                $.each( this.attributes, function( index, attr ) {
                    properties[ attr.name ] = attr.value;
                }); 
                
                properties.domTarget = $(this);

                //создадим виджет                
                var widget=new me.regWidget[widgetName](properties);
                                    
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
    },
    
    /**
     * создает виджет с указанным именем и свойствами
     */
    createWidget: function(widgetName,prop){
        return new me.regWidget[widgetName](prop);
    }    
});
