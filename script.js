function clearTask(){
    clearPopup.style.display="block";
}
function clearConfirmation(){
    arrayOfTasks = JSON.parse(localStorage.getItem("arrayOfTasks")) || [];
    arrayOfTasks=[];
    localStorage.setItem("arrayOfTasks", JSON.stringify(arrayOfTasks));
    display();
    clearSuccess.style.display="block";
    setTimeout(function() {
        clearSuccess.style.display = "none";
        clearPopup.style.display="none";
    }, 2000);
}
function view(count){
    console.log(count);
    const popup = document.querySelector(`.viewPopUp`)
    popup.style.display="block";
    const object = arrayOfTasks.find(obj => obj.id === count);
    document.getElementById("viewTask").value=object.name;
    document.getElementById("viewId").value=object.id;
    cancelViewPopup.addEventListener("click",function(){
        popup.style.display="none";
    });
}

function edit(count){
    console.log(count);
    const edit = document.querySelector(`#editForm`)
    edit.style.display="block";
    const object = arrayOfTasks.find(obj => obj.id === count);
    document.getElementById("editName").value=object.name;
    document.getElementById("editPriority").value=object.Priority;
    document.getElementById("editDate").value=object.date;
    document.getElementById("editTime").value=object.time;
    editTask.addEventListener("click", function () {
    const updatedName = document.getElementById("editName").value;
    const updatedPriority = document.getElementById("editPriority").value;
    const updatedDate = document.getElementById("editDate").value;
    const updatedTime = document.getElementById("editTime").value;
    const updatedTasks = arrayOfTasks.map(task => {
            if (task.id === count) {
                return {
                    name: updatedName,
                    Priority: updatedPriority,
                    date: updatedDate,
                    time: updatedTime,
                };
            }
            return task;
    });
    localStorage.setItem("arrayOfTasks", JSON.stringify(updatedTasks));
    display();
    edit.style.display="none";
    editSuccess.style.display = "block";
    setTimeout(function() {
        editSuccess.style.display = "none";
    }, 2000);
    });  
}
function deleteTask(count){
    console.log(count);
    deletePopup.style.display="block";
    arrayOfTasks = JSON.parse(localStorage.getItem("arrayOfTasks")) || [];
    console.log(arrayOfTasks);
    deleteConfirmation.addEventListener("click",function(){
        console.log("hi");
        const index = arrayOfTasks.findIndex(obj => obj.id === count);
        console.log(index);
        arrayOfTasks.splice(index,1);
        localStorage.setItem("arrayOfTasks", JSON.stringify(arrayOfTasks));
        deleteSuccess.style.display="block";
        display();
    });  
    setTimeout(function() {
        deleteSuccess.style.display = "none";
        deletePopup.style.display="none";
    }, 2000);
}

function check(count){
       let element=document.getElementById("toggle"+count);
       arrayOfTasks = JSON.parse(localStorage.getItem("arrayOfTasks")) || [];
       console.log(count);
       const object = arrayOfTasks.find(obj => obj.id === count);
       if (element.style.textDecoration!="line-through"){
            element.style.textDecoration="line-through";
            console.log("hi")
            object.status="Completed";
       }else{
            element.style.textDecoration="none";
            object.status="not completed";
       }
       localStorage.setItem("arrayOfTasks", JSON.stringify(arrayOfTasks));
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
    if (arrayOfTasks.length===0){
        count=0;
        console.log("inside",count);
    }else{
        count=arrayOfTasks[0].id;
        console.log("inside else",count);
    }
    let name=document.getElementById("taskName");
    let priority=document.getElementById("taskPriority");
    let time=document.getElementById("taskTime");
    let date=document.getElementById("taskDate");
    let createDate=new Date;
    let status="not comleted";
    arrayOfTasks = JSON.parse(localStorage.getItem("arrayOfTasks")) || [];
    console.log("time...",time)
   
    newTask={
            id:count+1,
            name:name.value,
            priority:priority.value,
            time:time.value,
            date:date.value,
            createDate:createDate.toISOString(),
            status:status
    }
    arrayOfTasks.push(newTask);
    arrayOfTasks.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

    localStorage.setItem("arrayOfTasks", JSON.stringify(arrayOfTasks));
    addSuccess.style.display = "block";
    setTimeout(function() {
        addSuccess.style.display = "none";
    }, 2000);
    display();
    cancelItem();
}

function display(){
    var taskList=document.getElementById("tableBody")
    arrayOfTasks = JSON.parse(localStorage.getItem("arrayOfTasks")) || [];
    taskList.innerHTML=" ";
    arrayOfTasks.forEach(function (task){
        const tableRow=document.createElement("tr");
        //const tableDataId=document.createElement("td");
        const tableDataName=document.createElement("td");
        tableDataName.id="taskList";
        tableDataName.id="toggle"+`${task.id}`;
        const checkBox=document.createElement("input");
        const checkDiv=document.createElement("td");
        checkDiv.className="checkTable";
        const coloumnForButtons=document.createElement("td");
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
        //tableDataId.innerHTML=(task.id);
        tableDataName.innerHTML=(task.name);
        checkDiv.appendChild(checkBox);
        coloumnForButtons.appendChild(viewButton);
        coloumnForButtons.appendChild(editButton);
        coloumnForButtons.appendChild(deleteButton);
        tableRow.appendChild(checkDiv);
        //tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(coloumnForButtons);
        taskList.appendChild(tableRow);  
});
}
window.addEventListener('load', display());