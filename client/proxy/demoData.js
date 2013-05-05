data=[
    { 
        "target":{
            "xtype":"Rectangle"
        },
        
        "property":{
            "alpha":{
                "type":"float",
                "keyframes":{                
                    "1": {
                        "value":0,
                        "easing":"line"
                    },

                    "1000": {
                        "value":1,
                        "easing":"line"
                    },            

                    "2000": {
                        "value":1,
                        "easing":"line"
                    }
                }            
            },

            "x": {
                "type":"int",
                "keyframes":{                
                    "0": {
                        "value":0,
                        "easing":"line"
                    },
                    "1000": {
                        "value":400,
                        "easing":"line"
                    },            
                    "2000": {
                        "value":100,
                        "easing":"line"
                    }
                }
            },

            "y": {
                "type":"int",
                "keyframes":{                

                    "0": {
                        "value":20,                
                        "easing":"line"
                    },
                    "2000": {
                        "value":20,
                        "easing":"line"
                    },
                    "3000": {
                        "value":200,
                        "easing":"line"
                    },

                    "4000": {
                        "value":100,
                        "easing":"line"
                    }
                }
            },

            "width": {
                "type":"int",
                "keyframes":{                

                    "0": {
                        "value":50,
                        "easing":"line"
                    },
                    "4000": {
                        "value":50,
                        "easing":"line"
                    },
                    "5000": {
                        "value":200,
                        "easing":"line"
                    },

                    "6000": {
                        "value":100,
                        "easing":"line"
                    }
                }
            },

            "height": {            
                "type":"int",
                "keyframes":{                

                    "0": {
                        "value":50,
                        "easing":"line"
                    },

                    "6000": {
                        "value":50,
                        "easing":"line"
                    },
                    "7000": {
                        "value":150,
                        "easing":"line"
                    },

                    "8000": {
                        "value":100,
                        "easing":"line"
                    }
                }
            },

            "rotation": {
                "type":"int",
                "keyframes":{                

                    "8000": {
                        "value":0,
                        "easing":"line"
                    },

                    "9500": {
                        "value":720,
                        "easing":"line"
                    },
                    "11000": {
                        "value":0,
                        "easing":"line"
                    },

                    "23000":{
                        "value":0,
                        "easing":"line"
                    },

                    "25000":{
                        "value":720,
                        "easing":"line"
                    }
                }
            },

            "skewX": {            
                "type":"int",
                "keyframes":{                

                    "11000": {
                        "value":0,
                        "easing":"line"
                    },

                    "13000": {
                        "value":100,
                        "easing":"line"
                    },

                    "15000": {
                        "value":-100,
                        "easing":"line"
                    },

                    "17000": {
                        "value":0,
                        "easing":"line"
                    }                        
                }
            },

            "skewY": {            
                "type":"int",
                "keyframes":{                

                    "17000": {
                        "value":0,
                        "easing":"line"
                    },

                    "19000": {
                        "value":100,
                        "easing":"line"
                    },
                    "21000": {
                        "value":-100,
                        "easing":"line"
                    },

                    "23000": {
                        "value":0,
                        "easing":"line"
                    }                        
                }
            },

            "regX": {
                "type":"int",
                "keyframes":{                
                    "0": {
                        "value":50,
                        "easing":"line"                
                    },
                    "23000": {
                        "value":50,
                        "easing":"line"
                    },

                    "24000": {
                        "value":0,
                        "easing":"line"
                    },
                    "25000": {
                        "value":50,
                        "easing":"line"
                    }                     
                }
            },

            "regY": {            
               "type":"int",
               "keyframes":{                            
                    "0":{
                        "value":50,
                        "easing":"line"                
                    },

                    "23000": {
                        "value":50,
                        "easing":"line"
                    },

                    "24000": {
                        "value":0,
                        "easing":"line"
                    } ,

                    "25000": {
                        "value":50,
                        "easing":"line"
                    }         
                }
            },


            
            
        },


        
       "filters":[            
           
            {
                "xtype":"blur",        
                "num":0,
                "property":{
                    
                    "blurX":{
                        "type":"float",
                        "keyframes":{                            

                             "25000": {
                                 "value":0,
                                 "easing":"line"
                             },

                             "28000": {
                                 "value":100,
                                 "easing":"line"
                             },

                             "32000": {
                                 "value":0,
                                 "easing":"line"
                             }           
                        }                                            
                    }
                    //конец blur                    
                    
                    
                }
                
            }            
                        
        ]
        
        
    },

    
    /*{ 
        "target":{ "xtype":"Text" ,"text":"X"},    
        "y":{
            "type":"float",
            "keyframes":{   
                "0": { "value":0, "easing":"line" },           
                "2000": { "value":100, "easing":"line" }                           
            }
        }          
    } */ 
    
    
]
