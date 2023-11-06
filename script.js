function clearTask(){
    clearPopup.style.display="block";
}

function clearConfirmation(){
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks=[];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display();
    clearSuccess.style.display="block";
    setTimeout(function() {
        clearSuccess.style.display = "none";
        clearPopup.style.display="none";
    }, 2000);
}

function view(count){
    const popup = document.querySelector(`#viewPopUp`)
    popup.style.display="block";
    const taskToView = tasks.find(obj => obj.id === count);
    document.getElementById("viewTask").textContent=taskToView.name;
    document.getElementById("viewPriority").textContent=taskToView.priority;
    document.getElementById("viewTime").textContent=taskToView.scheduledTime;
    const formattedCreateDateScheduledDate = new Date(taskToView.scheduledDate).toLocaleDateString('en-GB');
    const formattedCreateDate = new Date(taskToView.createDate).toLocaleDateString('en-GB');
    document.getElementById("viewDate").textContent=formattedCreateDateScheduledDate;
    document.getElementById("viewCreateDate").textContent=formattedCreateDate;
    document.getElementById("viewStatus").textContent=taskToView.status;
    document.getElementById("viewId").textContent=taskToView.id;
    cancelView.addEventListener("click",function(){
        popup.style.display="none";
    });
}

function edit(count){
    const edit = document.querySelector(`#editForm`)
    edit.style.display="block";
    const taskToEdit = tasks.find(task => task.id === count);
    document.getElementById("editName").value=taskToEdit.name;
    document.getElementById("editPriority").value=taskToEdit.priority;
    document.getElementById("editDate").value=taskToEdit.scheduledDate;
    document.getElementById("editTime").value=taskToEdit.scheduledTime;
    editTask.addEventListener("click", function () {
        const updatedName = document.getElementById("editName").value;
        const updatedPriority = document.getElementById("editPriority").value;
        const updatedDate = document.getElementById("editDate").value;
        const updatedTime = document.getElementById("editTime").value;
        const updatedTasks = tasks.map(task => {
            if (task.id === count) {
                return {
                    id:task.id,
                    name: updatedName,
                    priority: updatedPriority,
                    scheduledDate: updatedDate,
                    scheduledTime: updatedTime,
                    createDate:task.createDate,
                    status:task.status
                };
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        display();
        edit.style.display="none";
        editSuccess.style.display = "block";
        setTimeout(function() {
            editSuccess.style.display = "none";
        }, 2000);
    });
}

function deleteTask(count){
    deletePopup.style.display="block";
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    deleteConfirmation.addEventListener("click",function(){
        const index = tasks.findIndex(obj => obj.id === count);
        if (index !== -1){
            tasks.splice(index,1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            deleteSuccess.style.display="block";
            display();
        }
    });
    setTimeout(function() {
        deleteSuccess.style.display = "none";
        deletePopup.style.display="none";
    }, 2000);
}

function check(count){
    let element=document.getElementById("toggle"+count);
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskForCheck = tasks.find(obj => obj.id === count);
    if(element.style.textDecoration!="line-through"){
        element.style.textDecoration="line-through";
        taskForCheck.status="Completed";
    }else{
        element.style.textDecoration="none";
        taskForCheck.status="not completed";
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function cancelItem(){
    addForm.style.display="none"; 
    clearPopup.style.display="none";
    deletePopup.style.display="none";
    document.getElementById("editForm").style.display="none";
}

function addTask(){
    document.getElementById("addForm").style.display="block";
}

function addItem(){
    let count;
    if (tasks.length===0){
        count=1;
    }else{
        count = Math.max(...tasks.map(task => task.id)) + 1;
    }
    let name=document.getElementById("taskName");
    let priority=document.getElementById("taskPriority");
    let scheduledTime=document.getElementById("taskTime");
    let scheduledDate=document.getElementById("taskDate").value;
    let createDate=new Date();
    let status="not completed";
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    newTask={
        id:count,
        name:name.value,
        priority:priority.value,
        scheduledTime:scheduledTime.value,
        scheduledDate:scheduledDate,
        createDate:createDate,
        status:status
    }
    tasks.push(newTask);
    tasks.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addSuccess.style.display = "block";
    setTimeout(function() {
        addSuccess.style.display = "none";
    }, 2000);
    display();
    cancelItem();
    addForm.reset();
}

function display(){
    var taskList=document.getElementById("tableBody")
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML=" ";
    tasks.forEach(function (task){
        const tableRow=document.createElement("tr");
        switch (task.priority) {
            case "low":
                tableRow.style.backgroundColor = "rgb(222, 229, 222)";
                break;
            case "medium":
                tableRow.style.backgroundColor = "rgb(68, 200, 68)";
                break;
            case "high":
                tableRow.style.backgroundColor = "rgb(229, 92, 28)";
                break;
            case "severe":
                tableRow.style.backgroundColor = "rgb(221, 33, 67)";
                break;
            default:
                tableRow.style.backgroundColor = "white";
        }
        const coloumnForButtons=document.createElement("td");
        const tableDataId=document.createElement("td");
        const tableDataName=document.createElement("td");
        tableDataName.id="taskList";
        tableDataName.id="toggle"+`${task.id}`;
        const checkBox=document.createElement("input");
        const checkDiv=document.createElement("td");
        checkDiv.className="checkTable";
        coloumnForButtons.className="coloumnForButtons"
        const viewButton=document.createElement("button");
        const editButton=document.createElement("button");
        const deleteButton=document.createElement("button");
        checkBox.type="checkbox";
        viewButton.setAttribute("onclick", `view(${task.id})`);
        editButton.setAttribute("onclick", `edit(${task.id})`);
        deleteButton.setAttribute("onclick", `deleteTask(${task.id})`);
        checkBox.setAttribute("onclick", `check(${task.id})`);
        viewButton.textContent="View";
        editButton.textContent="Edit";
        deleteButton.textContent="Delete";
        tableDataId.innerHTML=(task.id);
        tableDataName.innerHTML=(task.name);
        checkDiv.appendChild(checkBox);
        coloumnForButtons.appendChild(viewButton);
        coloumnForButtons.appendChild(editButton);
        coloumnForButtons.appendChild(deleteButton);
        tableRow.appendChild(checkDiv);
        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(coloumnForButtons);
        taskList.appendChild(tableRow); 
    });
}

window.addEventListener('load', display());