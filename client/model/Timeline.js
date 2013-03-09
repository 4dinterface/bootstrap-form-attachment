// позже разместим код модели
// сейчас тут эксперементальные данные с которыми можно реботать
if (!app.model) app.model={};

app.model.Timeline=function(){
    return [

        // 1
	    new app.Model({
            title: "shape 1",
            target: {},
            prop:
                {
                    x: new app.ObjectCollection({
                        0: 0,
                        3: 0,
                        6: 0,
                        10:0
                    }),
                    y: new app.ObjectCollection({
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
                x: new app.ObjectCollection({
                    15: 0,
                    18: 0,
                    19: 0,
                    34: 0
                }),
                y: new app.ObjectCollection({
                    20: 0,
                    30: 0
                }),
                z: new app.ObjectCollection({
                    14: 0,
                    18: 0
                }),
                w: new app.ObjectCollection({
                    2: 0,
                    7: 0
                }),
                o: new app.ObjectCollection({
                    9: 0,
                    12: 0
                }),
                u: new app.ObjectCollection({
                    23: 0,
                    25: 0
                }),
                h: new app.ObjectCollection({
                    27: 0,
                    33: 0
                }),
                f: new app.ObjectCollection({
                    33: 0,
                    42: 0
                }),
                g: new app.ObjectCollection({
                    17: 0,
                    21: 0
                }),
                k: new app.ObjectCollection({
                    14: 0,
                    19: 0
                }),
                r: new app.ObjectCollection({
                    10: 0,
                    15: 0
                }),
                b: new app.ObjectCollection({
                    11: 0,
                    12: 0
                }),
                m: new app.ObjectCollection({
                    30: 0,
                    35: 0
                }),
                n: new app.ObjectCollection({
                    2: 0,
                    15: 0
                }),
                v: new app.ObjectCollection({
                    3: 0,
                    4: 0
                }),
                c: new app.ObjectCollection({
                    16: 0,
                    19: 0
                })
            }
        })

    ]
};
