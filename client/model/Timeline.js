// позже разместим код модели
// сейчас тут эксперементальные данные с которыми можно реботать
if (!app.model) app.model={};

app.model.Timeline=function(){
    return [
	{
            //демонстрационный первый обьект
            title:"shape 1",
	    target:{},
	    prop:{
                x:new app.Collection({
                    0:{
                        value:0,
                        easing:"none"					
                    },
                    3:{
                        value:100,
                        easing:"line"										
                    },				


                    6:{
                        value:100,
                        easing:"none"					
                    },
                    10:{
                        value:50,
                        easing:"line"										
                    }				
                }),

                y:new app.Collection({
                    3:{
                        value:0,
                        easing:"none"										
                    },				

                    8:{
                        value:150,
                        easing:"sin"					
                    }
                })
            }

        },
        
        //демонстрационный второй обьект
        {
            title:"shape 2",
            target:{},
            prop:{

                x:new app.Collection({
                    2:{
                        value:100,
                        easing:"none"					
                    },
                    3:{
                        value:0,
                        easing:"line"										
                    },				

                    6:{
                        value:20,
                        easing:"line"										
                    }		
                }),

                y:new app.Collection({
                    0:{
                        value:0,
                        easing:"none"										
                    },				


                    8:{
                        value:50,
                        easing:"sin"					
                    }

                })
            }

        }	    	    
    ]
};
