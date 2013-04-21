Define("app.controller.Menu", {
    extend: app.Component,
       
    init: function (prop) {
        var me=this;
        
        this._super();
        this.apply(prop);        
        
       
        $("#menu-item-FileOpen").on('mousedown',function(e){
            e.stopPropagation();
            $("#menu-item-FileOpen").find('input').click();                                                                        
        })
        
        // Обработаем выбор файла 
        // TODO -  для выбора файла есть смысл сделать отдельный компонент
        $("#menu-item-FileOpen").find('input').on('change', function(e){
            var files = e.target.files; 
             for (var i = 0, f; f = files[i]; i++) {
                //создадим FileReader
                var reader = new FileReader();

                //подпишемся на конец загрузки
                //замыкание на всякий пожарный
                reader.onload = (function(f) {
                    return function(evt){                        
                        console.log(evt.target.result);
                        me.reader.load(data);
                    }                    
                })(f);
                
                reader.readAsText(f);                
             }                
        });
        
    }
    
    
    
});
