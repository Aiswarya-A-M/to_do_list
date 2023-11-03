function clearTask(){
    array=[];
    display();
}
function view(count){
    console.log(count);
    const popup = document.querySelector(`.viewPopUp`)
    popup.style.display="block";
    const object = array.find(obj => obj.id === count);
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
    array.forEach(task=>{
        if(task.id===count){
            document.getElementById("editName").value=task.name;
            editTask.addEventListener("click",function(){
                task.name=document.getElementById("editName").value;
                display();
                edit.style.display="none";
            });
        }
        
    });
    
    cancelEdit.addEventListener("click",function(){
        edit.style.display="none";
    })
}
function deleteTask(count){
    document.getElementById("deletePopup").style.display="block";
    deleteConfirmation.addEventListener("click",function(){
        const index = array.findIndex(obj => obj.id === count);
        array.splice(index,1);
        display();
        document.getElementById("deletePopup").style.display="none";
    });
    cancelDelete.addEventListener("click",function(){
        document.getElementById("deletePopup").style.display="none";
    }) 
}
function addTask(){
    document.getElementById("addForm").style.display="block";
}
function addItem(){
    let count;
    if (array.length===0){
        count=0;
        console.log("inside",count);
    }else{
        count=array[array.length-1].id;
        console.log("inside else",count);
    }
    console.log("outside loop",count);
    let name=document.getElementById("taskName");
    let priority=document.getElementById("taskPriority");
    let time=document.getElementById("taskTime");
    let date=document.getElementById("taskDate");
    let createDate=new Date;
    let status="not comleted";
    array = JSON.parse(localStorage.getItem("array")) || [];
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
    array.push(newTask);
    localStorage.setItem("array", JSON.stringify(array));
    console.log(array);
    console.log('next',array[array.length-1]);
    display();
    cancelItem();
}
function cancelItem(){
    document.getElementById("addForm").style.display="none";
}
function check(count){
       let element=document.getElementById("toggle"+count);
       console.log(count);
       if (element.style.textDecoration!="line-through"){
        element.style.textDecoration="line-through";
        console.log("hi")
       }else{
        element.style.textDecoration="none";
       }
}
function display(){
    var taskList=document.getElementById("displayTable")
    array = JSON.parse(localStorage.getItem("array")) || [];
    array.forEach(function (task){
        const tableRow=document.createElement("tr");
        const tableDataId=document.createElement("td");
        const tableDataName=document.createElement("td");
        tableDataName.id="toggle"+`${task.id}`;
        const checkBox=document.createElement("input");
        const checkDiv=document.createElement("td");
        const buttons=document.createElement("td");
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
        buttons.appendChild(viewButton);
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);
        tableRow.appendChild(checkDiv);
        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(buttons);
        taskList.appendChild(tableRow);  
});
}
window.addEventListener('load', display());