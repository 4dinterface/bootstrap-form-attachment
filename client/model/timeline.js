// позже разместим код модели
// сейчас тут эксперементальные данные с которыми можно реботать
app.Timeline=function(){
    return [
	{
    	title:"shape 1",
		target:{},
		prop:{

			x:{
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

			},

			y:{

				3:{
					value:0,
					easing:"none"										
				},				


				8:{
					value:150,
					easing:"sin"					
				}

			}
		}

    },

    {
    	title:"shape 2",
		target:{},
		prop:{

			x:{
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
			},

			y:{

				0:{
					value:0,
					easing:"none"										
				},				


				8:{
					value:50,
					easing:"sin"					
				}

                        }
                    }

                }	    	    
        ]
};
