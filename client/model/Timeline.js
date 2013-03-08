// позже разместим код модели
// сейчас тут эксперементальные данные с которыми можно реботать
if (!app.model) app.model={};

// весь доступ организован в итерирующих методах - это позволит скрыть структуру данных от других объектов
// я меня в планах потом предложить модель таймлайна, основанную на графах - с оптимизацией скорости вставки и удаления ключевых кадров

/**
  * Пройдётся по всем объектам в таймлайне и вызовет callback , где первый аргумент - фигура, а второй - индекс фигуры (Array.forEach)
  * @param {Function} callback коллбек, принимающий первым аргументом фигуру
  */
//  iterateShapes( callback(Shape) );
/**
  * Пройдётся по свойствам для указанной фигуры и вызовет callback, передав свойство первым аргументом 
  * @param {Function} callback коллбек, принимающий первым аргументом имя свойства.
  */
// iterateProperties( callback(propertyName) );
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

app.model.Timeline=function(){
    return [
        new app.Model({
            //демонстрационный первый обьект
            title:"shape 1",
            target:{},
            prop:{
                x:new app.Collection({
                    0:app.Model({
                        value:0,
                        easing:"none"					
                    }),
                    
                    3:app.Model({
                        value:100,
                        easing:"line"										
                    }),				


                    6:app.Model({
                        value:100,
                        easing:"none"					
                    }),
                    
                    8:app.Model({
                        value:50,
                        easing:"line"										
                    })				
                }),

                y:new app.Collection({
                    3:app.Model({
                        value:0,
                        easing:"none"										
                    }),				

                    8:app.Model({
                        value:150,
                        easing:"sin"					
                    })
                    
                })
            }

        }),
        
        //демонстрационный второй обьект
        new app.Model({
            title:"shape 2",
            target:{},
            prop:{
                x:new app.Collection({
                    2:app.Model({
                        value:100,
                        easing:"none"					
                    }),
                    3:app.Model({
                        value:0,
                        easing:"line"										
                    }),				

                    6:app.Model({
                        value:20,
                        easing:"line"										
                    })		
                }),

                y:new app.Collection({
                    0:app.Model({
                        value:0,
                        easing:"none"										
                    }),				


                    8:app.Model({
                        value:50,
                        easing:"sin"					
                    })

                })
            }

        })
    ]
};
