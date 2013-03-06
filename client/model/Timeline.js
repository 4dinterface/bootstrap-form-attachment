// позже разместим код модели
// сейчас тут эксперементальные данные с которыми можно реботать
if (!app.model) app.model={};

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
                    
                    10:app.Model({
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
