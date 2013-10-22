/* 
 * Коллекция фильтров подключенных к Shape
 * 
 * ====================================================================== *
 * 
 *                         Composition
 *                              |
 *                      ShapeCollection
 *                              |
 *                            Shape
 *                         /         \
 *      PropertyCollection             (FilterCollection)
 *             |                             |
 *         Property                        Filter
 *             |                             |
 *     KeyframeCollection             PropertyCollection
 *             |                             |
 *          Keyframe                      Property
 *                                           |
 *                                     KeyframeCollection
 *                                           |
 *                                        Keyframe                        
 *                                                          
 * ====================================================================== *
 */

Define('app.business.model.FilterCollection', /** @lends {app.Model} */ {
    //можно унаследовать от 
    extend : core.data.ArrayCollection,    
    /***
     * Конструктор экземпляров
    * @constructor
    * @param {Object} prop объект с описанием экземпляра
    */
    init : function () {
        this._super();                    
    }
            
});
