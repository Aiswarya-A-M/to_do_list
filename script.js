
let array=[]/*[{
    id:1,
    name:"aiswarya",
    priority:"Low",
    date:"31/10/2023",
    createDate:"31/2/2001"
},{
    id:2,
    name:"aiswarya2",
    priority:"High",
    date:"31/10/2024",
    createDate:"31/6/2001"
}]*/
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
    /*ok.addEventListener("click",function(){
        console.log("hit...",index);
    });*/
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
    //const Id=document.getElementById("taskId");
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
function toggleColor(count){
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
    var taskList = document.getElementById("displayTable");
    taskList.innerHTML=" ";
    array.forEach(function (task){
        /*const tableHead=document.createElement("tr");
        const tableId=document.createElement("th");
        tableId.innerHTML-"Id";
        const tableTask=document.createElement("th");
        tableTask.innerHTML="Task";*/
        const tableRow=document.createElement("tr");
        const tableDataId=document.createElement("td");
        const tableDataName=document.createElement("td");
        tableDataName.id="toggle"+`${task.id}`;
        const buttons=document.createElement("td");
        const viewButton=document.createElement("button");
        const editButton=document.createElement("button");
        const deleteButton=document.createElement("button");
        viewButton.setAttribute("onclick", `view(${task.id})`);
        editButton.setAttribute("onclick", `edit(${task.id})`);
        deleteButton.setAttribute("onclick", `deleteTask(${task.id})`);
        tableRow.setAttribute("onclick", `toggleColor(${task.id})`);
        viewButton.textContent="View";
        editButton.textContent="Edit";
        deleteButton.textContent="Delete";
        tableDataId.innerHTML=(task.id);
        tableDataName.innerHTML=(task.name);

       /* tableHead.appendChild(tableId);
        tableHead.appendChild(tableTask);
        taskList.appendChild(tableHead);*/
        
        buttons.appendChild(viewButton);
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);
        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(buttons);
        taskList.appendChild(tableRow);   
});


}


/*let count=1;
const array=[{
    id:1,
    name:"aiswarya",
    priority:"Low",
    date:"31/10/2023",
    createDate:"31/2/2001"
},{
    id:2,
    name:"aiswarya2",
    priority:"High",
    date:"31/10/2024",
    createDate:"31/6/2001"
}]
function view(count){
    const popup = document.querySelector(`.viewPopUp`)
    popup.style.display="block";
    array.forEach(task=>{
        if(task.id===count){ 
            document.getElementById("viewTask").value=task.name;
            document.getElementById("viewId").value=task.id;
        }
    })
    /*ok.addEventListener("click",function(){
        console.log("hit...",index);
    });
    cancelViewPopup.addEventListener("click",function(){
        popup.style.display="none";
    });
}
function edit(count){
    const edit = document.querySelector(`#editForm`)
    edit.style.display="block";
    array.forEach(task=>{
        if(task.id===count){
            document.getElementById("editName").value=task.name;
            editTask.addEventListener("click",function(){
                task.name=document.getElementById("editName").value;
                edit.style.display="none";
                hlo (task);
            });
        }    
    }) 
    cancelEdit.addEventListener("click",function(){
        edit.style.display="none";
    })
}
function deleteTask(count){
    console.log("hi",count);
    array.forEach(task=>{
        if(task.id===count){ 
            console.log(array.indexOf(task))
        }
    });
}

function addTask(){
    document.getElementById("addForm").style.display="block";
}
function addItem(){
    let count=array[array.length-1].id;
    const name=document.getElementById("taskName");
    //const Id=document.getElementById("taskId");
    newTask={
            id:count+1,
            name:name.value
    }
    array.push(newTask);
    var taskList = document.getElementById("displayTable");
    taskList.innerHTML=" ";
    array.forEach(function (task){
        const tableRow=document.createElement("tr");
        const tableDataId=document.createElement("td");
        const tableDataName=document.createElement("td");
        const buttons=document.createElement("td");
        const viewButton=document.createElement("button");
        const editButton=document.createElement("button");
        const deleteButton=document.createElement("button");
        viewButton.setAttribute("onclick", `view(${task.id})`);
        editButton.setAttribute("onclick", `edit(${task.id})`);
        editButton.setAttribute("onclick", `deleteTask(${task.id})`);
        viewButton.textContent="View";
        editButton.textContent="Edit";
        deleteButton.textContent="Delete";
        tableDataId.innerHTML=(task.id);
        tableDataName.innerHTML=(task.name);
        buttons.appendChild(viewButton);
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);
        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(buttons);
        taskList.appendChild(tableRow);
        
    });
    cancelItem();
}
function cancelItem(){
    document.getElementById("addForm").style.display="none";
}*/