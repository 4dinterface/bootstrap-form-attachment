/**
 * Виджет, 
 * бля я хз что писать, 
 * должен быть базовый класс удобный для построения элементов управления :)
 * повсей видимости должен работать впаре с widget менеджером
 *  
 * @class
 * @name app.Component
 */
Define("core.widget.Widget", /** @lends {app.Component.prototype} */({
    extend:"core.Component",
    
    domTarget:"",
    widget:"",

    //препроцессор
    //в момент обьявления класса, зарегестрирует виджет в менеджере виджетов
    preprocessor:function(cls){
        if(this.widget!="") core.widget.widgetManager.registerWidget(this.widget,cls);
    },

    /**
     * @constructor
     */
    init: function () {	           
        this.view=this.domTarget.parents('.scope'); // TODO попробывать перенести в родительский класс
        
        this._super();     
               
        this.domTarget=$(this.domTarget);                
        // пометим виджет классом, чтобы отличать активированные виджеты от неактивированных
        $(this.domTarget).addClass('live_widget');
                     
        
        //если нет id то он будет сгенерирован автматически
        if ($(this.domTarget).attr("id")=="" ) $(this.domTarget).attr("id", core.utilites.genId() );
    },
            
   //TODO вероятно методнеиспользуется
    useEvent:function(){
        var me=this;
        this.apply();        
        for (event in this.domListeners) {
          var par=event.split(' ');          
          $(this.el).find( par[0]).on(par[1], this.domListeners[event].bind(me ) );
	};
                
        this._super();        
    },
            
    //обьявим метод ответственный за обновлеие виджета
    refresh:function(){},
    
    getScope:function(){
        return this.view[0].scope;        
    },
	
    //события
    listeners: null
}));
