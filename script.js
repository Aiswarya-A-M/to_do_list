let array=[];
function clearTask(){
    array=[];
    display();
}
function view(count){
    console.log(count);
    const popup = document.querySelector(`.viewPopUp`)
    popup.style.display="block";
    array.forEach(task=>{
        if(task.id===count){ 
            document.getElementById("viewTask").value=task.name;
            document.getElementById("viewId").value=task.id;
        }
    })
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
        for (let i=0;i<array.length;i++){
            if(array[i].id===count){    
                array.splice(i,1);
                console.log(array);
                break;
            }
        }
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
    const name=document.getElementById("taskName");
    newTask={
            id:count+1,
            name:name.value
    }
    array.push(newTask);
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
    taskList.innerHTML=" ";
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