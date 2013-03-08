/**
  * Пройдётся по всем объектам в таймлайне и вызовет callback , где первый аргумент - фигура, а второй - индекс фигуры (Array.forEach)
  * @param {Function} callback коллбек, принимающий первым аргументом фигуру
  */
//  iterateShapes( callback(Shape) );
/**
  * Пройдётся по свойствам для указанной фигуры и вызовет callback, передав свойство первым аргументом 
  * @param {Function} callback коллбек, принимающий первым аргументом имя свойства.
  */
// .( callback(propertyName) );
/**
  * Вернёт два ключевых кадра для указанного свойства и фигуры. 
  * Выборка ключевых кадров удволетворяет условию
  * firstKeyframe.timestamp <= timestamp < secondKeyframe.timestamp
  * 
  * timestamp = keyframe.time + animation_started_timestamp
  * 
  * @param {Shape} shape фигура
  * @param {string} свойство
  * @param {number} временная метка
  * @return {Array.<Keyframe>} ключевые кадры для времени
  */
// lookupKeyframes(  shape, propertyName, timestamp  ); // --> return [  firstKeyframe, secondKeyframe  ];

// интерфейс ключевого кадра. Хранит в себе время, к которому относится, и значение свойства
// имя свойства хранить в нём не нужно
//Keyframe = {
//    time: 50 // время, к котору относится. миллисекунды
//    value: 20.5 || [ 314,525, 453, 5 ] // значение - число в пикселях, либо массив, если свойство хитрее простого
//};

//TODO доделать интерфейс модели таймлайна
//TODO доделать класс ключевых кадров (лучше классом, для документации)

if (!app.model) app.model={};

app.model.Timeline=function(){
    return [

        // 1
        new app.Model({
            title: "shape 1",
            target: {},
            prop:
            {
                x: new app.Collection({
                    0: 0,
                    3: 0,
                    6: 0,
                    10:0
                }),
                y: new app.Collection({
                    3: 0,
                    8: 0
                })
            }
        }),

        // 2
        new app.Model({
            title: "shape 2",
            target: {},
            prop:
            {
                x: new app.Collection({
                    15: 0,
                    18: 0,
                    19: 0,
                    34: 0
                }),
                y: new app.Collection({
                    20: 0,
                    30: 0
                }),
                z: new app.Collection({
                    14: 0,
                    18: 0
                }),
                w: new app.Collection({
                    2: 0,
                    7: 0
                }),
                o: new app.Collection({
                    9: 0,
                    12: 0
                }),
                u: new app.Collection({
                    23: 0,
                    25: 0
                }),
                h: new app.Collection({
                    27: 0,
                    33: 0
                }),
                f: new app.Collection({
                    33: 0,
                    42: 0
                }),
                g: new app.Collection({
                    17: 0,
                    21: 0
                }),
                k: new app.Collection({
                    14: 0,
                    19: 0
                }),
                r: new app.Collection({
                    10: 0,
                    15: 0
                }),
                b: new app.Collection({
                    11: 0,
                    12: 0
                }),
                m: new app.Collection({
                    30: 0,
                    35: 0
                }),
                n: new app.Collection({
                    2: 0,
                    15: 0
                }),
                v: new app.Collection({
                    3: 0,
                    4: 0
                }),
                c: new app.Collection({
                    16: 0,
                    19: 0
                })
            }
        })

    ]
};