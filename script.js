let index=0;
console.log("hi");
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
var taskList = document.getElementById("displayTable");
array.forEach(function (task,index){
    const tableRow=document.createElement("tr");
    const tableDataId=document.createElement("td");
    const tableDataName=document.createElement("td");
    const viewButton=document.createElement("button");
    viewButton.setAttribute("onclick", `view(${index})`)
    viewButton.textContent="View";
    tableDataId.innerHTML=(task.id);
    tableDataName.innerHTML=(task.name);
    tableDataName.appendChild(viewButton);
    tableRow.appendChild(tableDataId);
    tableRow.appendChild(tableDataName);
    taskList.appendChild(tableRow);
});

function view(index){
    console.log(index);
    const popup = document.querySelector(`.viewPopUp`)
    popup.style.display="block";
    ok.addEventListener("click",function(){
        console.log("hit...",index);
    });
    cancel.addEventListener("click",function(){
        const popup = document.querySelector(`.viewPopUp`)
        popup.style.display="none";
    });
}