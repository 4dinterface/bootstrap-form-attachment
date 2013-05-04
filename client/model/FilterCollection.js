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

Define('app.model.PropertyCollection', /** @lends {app.Model} */ {
    extend : app.Model,    
    /***
     * Конструктор экземпляров
    * @constructor
    * @param {Object} prop объект с описанием экземпляра
    */
    init : function () {
        this._super();                    
    }
});