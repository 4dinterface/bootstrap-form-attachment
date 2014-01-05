/**
 * Создает экземпляр Circle.
 *
 * @constructor
 * @this {Circle}
 * @param {number} r Радиус окружности.
 */
function Circle(r) {
    /** @private */ this.radius = r;
    /** @private */ this.circumference = 2 * Math.PI * r;
}
 
/**
 * Создает новый экземпляр Circle по диаметру.
 *
 * @param {number} d Диаметр окружности.
 * @return {Circle} Новый объект Circle.
 */
Circle.fromDiameter = function (d) {
    return new Circle(d / 2);
};
 
/**
 * Подсчитывает длину окружности
 *
 * @deprecated
 * @this {Circle}
 * @return {number} Длина окружности.
 */
Circle.prototype.calculateCircumference = function () {
    return 2 * Math.PI * this.radius;
};
 
/**
 * Возвращает длину окружности, вычисленную заранее.
 *
 * @this {Circle}
 * @return {number} Длина окружности.
 */
Circle.prototype.getCircumference = function () {
    return this.circumference;
};
 
/**
 * Строковое представление объекта Circle.
 * @override
 * @this {Circle}
 * @return {string} Информация об объекте Circle.
 */
Circle.prototype.toString = function () {
    return "A Circle object with radius of " + this.radius + ".";
};