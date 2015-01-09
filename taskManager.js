function taskModel(){
var task="";
var removeFlag=false;

    this.setTask = function(taskName){
    task = taskName;
    }    
    
    this.getTask = function(){
    return task;
    }
	
    this.setFlag = function(flag){
    removeFlag = flag;
    }    
    
    this.getFlag = function(){
    return removeFlag;
    }
    
}


function taskCollection(){
var tasks = [];
    
    this.getTasks = function(){
    return tasks;
    }
	
	this.setTasks = function(tempTasks){
	tasks = tempTasks;
	}
    
    this.addTask = function(task){
    tasks.push(task);
    }
    
    this.keepTask = function(taskVal,flag){
    for(index in tasks){
			if(taskVal==tasks[index].getTask()){
			tasks[index].setFlag(flag);
			break;
			}
		}
    }
}

function taskView(){
 
    var template = $('.task','#template');
    this.showAllTasks=function(taskAllCollection){
	
	var tempCollectionTasks=[]; 
	var taskCollection = taskAllCollection.getTasks();
	var len = taskCollection.length;
	
    $('#task-box').html("");
		
	for(index=0;index<len;index++){
            var task = taskCollection[index];
            var template = $("#template");
			if(!task.getFlag()){
			template.find('.task').html(task.getTask());
			$('#task-box').append(template.html());
			tempCollectionTasks.push(task);
			}    
	}
		taskAllCollection.setTasks(tempCollectionTasks);
    }
	
	this.showTask = function(taskModel){
			var template = $("#template");
            template.find('.task').html(taskModel.getTask());
            $('#task-box').append(template.html());
    }
    
}

function taskController(collection,view){
    this.init= function(){
        $('#add-btn').off('click').on('click',function(){
        var taskVal = $('#task-name').val();
        if(taskVal.trim()!=''){
            $('#task-name').val('');
            var model = new taskModel();
                model.setTask(taskVal);
                collection.addTask(model);
                view.showTask(model);            
        }
        else{
            alert('Please enter some value!!');
            return;
        }

		});
		this.addEvent();
    }
	
	this.addEvent = function(){
	  $('#task-box').off('click').on('click','.close',function(ev){
        if($(ev.currentTarget).is(':checked')) {  
            $(ev.currentTarget).parent().css('text-decoration','line-through');
			var taskVal = $(ev.currentTarget).parent().find('.task').text();
			collection.keepTask(taskVal,true);
			
        }
        else{
            $(ev.currentTarget).parent().css('text-decoration','none');
			var taskVal = $(ev.currentTarget).parent().find('.task').text();
			collection.keepTask(taskVal,false)
        }
    });
	
	$('#remove-btn').off('click').on('click',function(){
		view.showAllTasks(collection);
	});
	
	}
}

var collection = new taskCollection();
var view = new taskView();
var controller = new taskController(collection,view);
controller.init();