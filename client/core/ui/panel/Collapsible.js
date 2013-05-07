/**
 * Виджет, 
 * бля я хз что писать, 
 * должен быть базовый класс удобный для построения элементов управления :)
 * повсей видимости должен работать впаре с widget менеджером
 *  
 * @class
 * @name app.Component
 */
Define("core.ui.panel.Collapsible", /** @lends {app.Component.prototype} */({
    extend:"core.Widget",
    /**
     * @constructor
     */
    targetDom:"",
    widget:"Collapsible",
            
    
    init: function () {	           
       $('[widget]').each(function(num,el){            
            $(this).click(function(){
                $(this).remove();
            });
        })
    
    }
            
}));
