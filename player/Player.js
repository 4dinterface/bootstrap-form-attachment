window.player=window.player||{};

(function(player){        
    var Player=function(cfg){        
        //создадим сцену
        this.stage=new player.stage.Stage();
        
        // создадим ролик                
        this.rootMovie=new player.movie.Movie({
            timeline:cfg.timeline,
            stage:this.stage,
            ignoreReflow: false
        })
        
        // создадим конструктор сцены
        // TODO возможно stagebuilder должен отсутствовать на клиентском плеере, 
        // так какего роль в синхронизации модели и сцены, но у конечного пользователя 
        // таймлайн неменяется 
        this.stageBuilder=new player.StageBuilder({
            composition:cfg.timeline,
            stage:this.stage
        })        
    }
        
    var p=Player.prototype;
    
    //Установка символа который будет считаться плеером главным
    p.setRootSymbol=function(symbol){
        
    },
        
    p.setModel=function(){}
    
    player.Player=Player;        
})(window.player)


//устанавливает значение по неймспейсу
player.NS=function(name, obj) {
    var result = window;
    name.split(".").forEach(function (val, num, arr) {        

        if (num == arr.length - 1) result[val] = obj||result[val];
        else result[val] = result[val] || {};

        result = result[val];
    });

    return result;
}   