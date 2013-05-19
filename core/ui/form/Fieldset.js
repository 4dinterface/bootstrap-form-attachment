/**
 * NumberField
 *   
 * @class
 * @name app.Component
 */
Define("core.ui.form.Fieldset", /** @lends {app.Component.prototype} */({
    extend:"core.widget.Widget",
    
    widget:"Fieldset",                    
    value:false,
    
    //думаю надо перестроить внутреннее содержимое filset таким образом чтобы контент был в отдельном div
    tmpl:"<div class='fieldset_pole' style='position:absolute;top:0px;left:0px;width:8px;height:50px;' >"+
            "<div class='fieldset_metka' style='position:absolute;bottom:0px;left:0px;color:#333;font-size:12px;' ></div>"+
         "</div>"+
         "<div class='fildsetContent'></div>",
    /**
     * @constructor
     */    
    init: function (cfg) {        
        this.apply(cfg);                
        this.domTarget=$(this.domTarget);                         

        this.domTarget.css({ position:"relative" });      
        
        var all=this.domTarget.find("*");
        this.domTarget.append(this.tmpl);
        this.domTarget.find('.fildsetContent').append(all);
        
        this.fieldset_metka=this.domTarget.find('.fieldset_metka');
        this.fieldset_pole=this.domTarget.find('.fieldset_pole');
        
        //this.domTarget.find('fildsetContent').append
        
        this.refresh();
        this._super();
    },
            
    /**
     * слушаем события
     */
    listeners:{
        "fieldset_pole click":function(e){                  
            this.set();            
        },
                
        "domTarget change":function(e){  
            //получим значение
            var val= $( e.target ).val();
            
            //переберём все виджеты
            this.domTarget.find('[widget]').each(function(item){
                //ХЗ чо делать дальше
            })
        }        
    },        
                
    set:function(){
        this.value= this.value==true? false : true;                                        
        this.domTarget.val(this.value);
        this.refreshView();
    },

    //refrash считывает данные с атрибутов и рендерит элемент
    refresh:function(){
        this.value=this.domTarget.val();                
        this.refreshView();
    },

    //обновляем вид виджета
    refreshView:function(){
        if(this.value) this.fieldset_metka.html('<B>{<br/>&<br/>{</B>');
        else this.fieldset_metka.html('|<br/>|<br/>|');              
    }
    
}));
