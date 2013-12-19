
//============= Храним выбранные файлы =============//
$(function(){
    
    function Files(form){
        this.items=[];
	this.add=function(callback){
            var me=this;
            var $input=$('<input type=file name="userfile[]" min="1" max="1"  size=50 style="display:none;">');
            $input.on('change',function(){
                me.items.push({
                    input:$input[0],
                    file : $input[0].files[0],
                    id: me.items.length                    
		})                                
                callback();		
            })
            
            form.append( $input );
            $input[0].click();
        }
        this.remove=function(id){            
            //удалим input file
            $(this.items[id].input).remove();
            console.log(this.items);
            
            //todo выужден использовать delete вместо splice чтобыне расползлись id
            delete this.items[id];
        }

        //метод для перебора файлов
        this.each=function(callback){
            for (var i = 0; i < this.items.length; i++) {  
                if( this.items[i]) callback(this.items[i],i,this.items);
            }                        
        }

       //}
    }
    var imgTemplate=$('<div class="col-xs-6 col-md-3 viewelement">'+
                      '<a href="#" class="thumbnail" onclick="return false;">'+
                        '<div class="caption" style="position:relative;">'+
                            '<h3 class="center">Thumbnail label</h3>'+
                            '<p>'+'1232kb</p>'+                            
                            '<div class="deleteimage glyphicon glyphicon-remove-circle"></div>'+
                            //'<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>'+
                        '</div>'+                                  
                      '</a>'+                      
                    '</div>');
    
    
    $('.widgetuploader').each(function(){
        var widgetuploader=$(this),
            files=new Files( widgetuploader);

        //var fileList=$('.widgetuploader');
        widgetuploader.html('<div class="panel panel-default">'+
                        '<div class="panel-heading">Приложенные файлы</div>'+
                        '<div class="panel-body">'+
                            '<div class="row"></div>'+
                        '</div>'+                        
                        '<div class="panel-footer">'+
                            '<button id="upload" type="button" class="btn btn-default">Добавить файл</button>'+
                        '</div>'+
                    '</div>');
        
        //render
        function render(){        
            if (!files.items.length) {
                //widgetuploader.html('выберите файл');
            } else {            
                files.each(function(item){
                    if( !item.viewElement ) widgetuploader.find('.row').append( createImage ( item ) );    
                })                                                           
            }
        }
                    //создаем картинку
        function createImage(item){
            var file=item.file,
                imgWrap=imgTemplate.clone(),
                img = document.createElement("img");
        
            img.src = window.URL.createObjectURL(file);
            img.style.height = 200;
            //img.height = 100;
            img.onload = function(e) {
                window.URL.revokeObjectURL(this.src);
            }
            imgWrap.find('.caption').before(img);            
            imgWrap.find('.caption h3').html( file.name );
            imgWrap.find('.caption p').html( Math.round(file.size/1024) + " kbytes" ); 
            imgWrap.data('item',item);                        
            
            item.viewElement=imgWrap;            
            return imgWrap;
        }

        //Добавляем элемент
        widgetuploader.find('#upload').on('click',function(){
            files.add(render);
        })       
        
        //Удаляем элемент
        $(widgetuploader).on('click','.deleteimage',function(){
            var item=$(this).parents('.viewelement').data('item');
            item.viewElement.animate({height:50},300,function(){                
                item.viewElement.remove();
            });
            files.remove(item.id);
        })                
    });    
});