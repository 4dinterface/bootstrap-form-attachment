/*
 * Коллекция блоков
 * 
 * Методы управления коллекцией
 * setBlock начинает формировать коллекцию с нуля, тоесть как только вызывается setBlock то коллекция сбрасывается 
 * и присваивается только переданный блок
 * 
 * add добавляет блок к колекции блоков, в отличии от setBlock она не затирает старые значения, 
 * а просто добавляет в массив data еще одно
 * 
 * 
 * Функции для работы с группой
 * 
 * offset(value) смещает все блоки в коллекции   на значение value
 * Очень важно обратить внимание на то именно смещает на value а неперемещает в value
 * так как каждый блок имеет разную позицию, то нельзя указать в какую позицию их установить 
 * так как расположения выделинных блоков относительно друг друга будет утеряно
 * 
 * fixPosition() вызывается тогда когда перемещение offset окончено, тоесть когда пользователь отпустил кнопку мыши
 * 
 * set(name,value) Устанавливает значение каждому ключу, каждого блока в коллекции
 */
Define('app.business.model.KeyframeBlockCollection', /** @lends {app.business.model.KeyframeCollection} */{    
    extend:'core.Component',                
    
    rightBorder:0,
    leftBorder:0,
    data:null,

    /**
     * @constructor
     * param prop
     */
    init:function (prop){                                
        this._super();                        
        this.data=[];
    },
    
    //применяет set к выборке
    set:function(name,value){
        this.data.forEach(function(item){
            console.log('item',item);
            item.set(name,value);
        })        
    },    
    
    //добавляет элемент к коллекции
    add:function(value){
        this.data.push(value);
    },
    
    //добавляет элемент к коллекции
    setBlock:function(value){                
        //уберем выделение предыдущих блоков 
        this.set('select',false);
        
        //новый блок
        this.data=[value];        //todo length будет выдавать ошибку если это не массиа
    },
    
    
    //offset
    offset:function(value){
        this.data.forEach(function(item,i){
            item.offset(value);
        })                        
    },
    
    // фиксирует позицию после перемещения
    // Если этого не сделать то повторное перемещение начнется со скачка 
    // так как результат перемещениея не учтен в time
    fixPosition: function(){
        this.data.forEach(function(item,i){
            item.fixPosition();
        })                        
    }
});