/** 
 * неймспейс фреймворка
 **/
window.core=window.core || {};

/**
 * 
 * @type type
 */
window.core.utilites={
    //счётчик Id
    countId:0,
            
    /**
     * вовращает сгенерированный уникальный id
     * @returns {string}
     */
    genId:function(){
        this.countId++;
        return "id"+this.countId;        
    }               
}
