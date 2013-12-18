window.core=window.core || {};

/**
 * @namespace core.utilites
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
