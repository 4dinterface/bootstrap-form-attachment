(function(){
	//модель таймлайна
	var timeline=new app.model.Timeline(),
		tlView=new app.view.Timeline({
                    model:timeline
                });
                
        //console.log(timeline);
        
        //контроллер 
        //tlController=new TimeLineController(timeline);
})();