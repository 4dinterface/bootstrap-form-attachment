data=[
    {
        //обьект на сцене
        target:{
            xtype:"Rectangle"
        },

        // анимируемые свойства
        x: {
            0: {
                value:0,
                easing:"line"
            },
            600: {
                value:100,
                easing:"line"
            },
            1000:  {
                value:50,
                easing:"line"
            },
            2000: {
                value:200,
                easing:"line"
            }
        },

        y: {
            300: {
                value:50,
                easing:"line"
            },
            2000: {
                value:0,
                easing:"line"
            }
        },
        
        //Ширина
        width: {
            500: {
                value:100,
                easing:"line"
            },

            3000: {
                value:250,
                easing:"line"
            }
            
        },

        //Высота
        height: {
            1000: {
                value:100,
                easing:"line"
            },

            2000: {
                value:180,
                easing:"line"
            }
            
        }

    },

    // 2
    {
        //обьект на сцене
        target:{
            xtype:"Circle"
        },

        //анимируемые свойства
        x: {
            1500: {
                value:200,
                easing:"line"
            },
            1800: {
                value:300,
                easing:"line"
            },
            1900: {
                value:100,
                easing:"line"
            },
            3400: {
                value:300,
                easing:"line"
            }
        },

        y: {
            2000: {
                value:170,
                easing:"line"
            },
            4000: {
                value:10,
                easing:"line"
            }
        }        
    },
    {
        //обьект на сцене
        target:{
            xtype:"Text",
            text:"HTML example long text"
        },

        // анимируемые свойства
        x: {
            0: {
                value:0,
                easing:"line"
            },
            5000: {
                value:400,
                easing:"line"
            }
        },

        y: {
            300: {
                value:10,
                easing:"line"
            },
            
            2500: {
                value:100,
                easing:"line"
            },
            
            5000: {
                value:20,
                easing:"line"
            }
        }
    },
    {
        //обьект на сцене
        target:{
            xtype:"HtmlElement",
            html:"hello world"
        },                

        // анимируемые свойства
        x: {
            0: {
                value:0,
                easing:"line"
            },
            6000: {
                value:300,
                easing:"line"
            }
        },

        y: {
            300: {
                value:200,
                easing:"line"
            },
            6000: {
                value:0,
                easing:"line"
            }
        },
        
        rotate:{
            1000: {
                value:10,
                easing:"line"
            },
            6000: {
                value:180,
                easing:"line"
            }
        }
        
    }
]