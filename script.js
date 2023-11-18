function clearTask() {
  clearPopUp.style.display = "block";
}

function clearConfirmation() {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  display();
  clearSuccess.style.display = "block";
  setTimeout(function () {
    clearSuccess.style.display = "none";
    clearPopUp.style.display = "none";
  }, 2000);
}

function view(id) {
  const popUp = document.querySelector(`#viewPopUp`);
  popUp.style.display = "block";
  const taskToView = tasks.find((obj) => obj.id === id);
  document.getElementById("viewTask").textContent = taskToView.name;
  document.getElementById("viewPriority").textContent = taskToView.priority;
  document.getElementById("viewTime").textContent = taskToView.scheduledTime;
  const formattedScheduledDate = new Date(
    taskToView.scheduledDate
  ).toLocaleDateString("en-GB");
  const formattedCreateDate = new Date(
    taskToView.createDate
  ).toLocaleDateString("en-GB");
  document.getElementById("viewDate").textContent = formattedScheduledDate;
  document.getElementById("viewCreateDate").textContent = formattedCreateDate;
  document.getElementById("viewStatus").textContent = taskToView.status;
  document.getElementById("viewId").textContent = taskToView.id;
  cancelView.addEventListener("click", function () {
    popUp.style.display = "none";
  });
}

function edit(id) {
  const edit = document.querySelector(`#editForm`);
  edit.style.display = "block";
  const taskToEdit = tasks.find((task) => task.id === id);
  document.getElementById("editName").value = taskToEdit.name;
  document.getElementById("editPriority").value = taskToEdit.priority;
  document.getElementById("editDate").value = taskToEdit.scheduledDate;
  document.getElementById("editTime").value = taskToEdit.scheduledTime;
  editTask.addEventListener("click", function () {
    const updatedName = document.getElementById("editName").value;
    const updatedPriority = document.getElementById("editPriority").value;
    const updatedDate = document.getElementById("editDate").value;
    const updatedTime = document.getElementById("editTime").value;
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          name: updatedName,
          priority: updatedPriority,
          scheduledDate: updatedDate,
          scheduledTime: updatedTime,
          createDate: task.createDate,
          status: task.status,
        };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    display();
    edit.style.display = "none";
    editSuccess.style.display = "block";
    setTimeout(function () {
      editSuccess.style.display = "none";
    }, 2000);
  });
}

function deleteTask(id) {
  deletePopUp.style.display = "block";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  deleteConfirmation.addEventListener("click", function () {
    const index = tasks.findIndex((obj) => obj.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      deleteSuccess.style.display = "block";
      display();
    }
  });
  setTimeout(function () {
    deleteSuccess.style.display = "none";
    deletePopUp.style.display = "none";
  }, 2000);
}

function check(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskForCheck = tasks.find((obj) => obj.id === id);
  if (taskForCheck.status === "not completed") {
    taskForCheck.status = "Completed";
  } else {
    taskForCheck.status = "not completed";
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  display();
}

function cancelItem() {
  addForm.style.display = "none";
  clearPopUp.style.display = "none";
  deletePopUp.style.display = "none";
  editForm.style.display = "none";
}

function addTask() {
  document.getElementById("addForm").style.display = "block";
}

function addItem() {
  let name = document.getElementById("taskName").value;
  let priority = document.getElementById("taskPriority").value;
  let scheduledTime = document.getElementById("taskTime").value;
  let scheduledDate = document.getElementById("taskDate").value;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (name && priority && scheduledTime && scheduledDate) {
    let id = tasks.length + 1;
    let createDate = new Date();
    let status = "not completed";
    let newTask = {
      id,
      name: name,
      priority: priority,
      scheduledTime: scheduledTime,
      scheduledDate: scheduledDate,
      createDate: createDate,
      status: status,
    };
    tasks.push(newTask);
    tasks.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addSuccess.style.display = "block";
    setTimeout(function () {
      addSuccess.style.display = "none";
    }, 2000);
    display();
    cancelItem();
    addForm.reset();
  } else {
    alert("all fields are required");
  }
}

function display() {
  let taskList = document.getElementById("tableBody");
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = " ";
  tasks.forEach(function (task) {
    const tableRow = document.createElement("tr");
    const tableDataName = document.createElement("td");
    const checkBox = document.createElement("input");
    const viewButton = document.createElement("button");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const checkDiv = document.createElement("td");
    const columnForButtons = document.createElement("td");
    const tableDataId = document.createElement("td");
    checkBox.type = "checkbox";
    checkDiv.className = "checkTable";
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
    if (task.status === "Completed") {
      tableDataName.style.textDecoration = "line-through";
      checkBox.checked = task.status === "Completed";
    } else {
      tableDataName.style.textDecoration = "none";
    }
    tableDataName.id = "taskList";
    tableDataName.id = "toggle" + `${task.id}`;
    columnForButtons.className = "columnForButtons";
    viewButton.setAttribute("onclick", `view(${task.id})`);
    editButton.setAttribute("onclick", `edit(${task.id})`);
    deleteButton.setAttribute("onclick", `deleteTask(${task.id})`);
    checkBox.setAttribute("onclick", `check(${task.id})`);
    viewButton.textContent = "View";
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";
    tableDataId.innerHTML = task.id;
    tableDataName.innerHTML = task.name;
    checkDiv.appendChild(checkBox);
    columnForButtons.appendChild(viewButton);
    columnForButtons.appendChild(editButton);
    columnForButtons.appendChild(deleteButton);
    tableRow.appendChild(checkDiv);
    tableRow.appendChild(tableDataId);
    tableRow.appendChild(tableDataName);
    tableRow.appendChild(columnForButtons);
    taskList.appendChild(tableRow);
  });
}

window.addEventListener("load", display());
