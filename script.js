
let Tasks = [];
let global_id = -1;

let modalcontobj = document.querySelector(".modalcontainer");

function hideform() {
    modalcontobj.classList.add("modalcontainerhide");
}

function showform() {
    modalcontobj.classList.remove("modalcontainerhide");
}

let formobj = document.querySelector("form");
let subbtn = document.querySelector(".butclass>input:nth-child(1)");
let searbar = document.querySelector("#searchbox");


formobj.addEventListener("submit", (e) => {

    e.preventDefault();

    if (document.querySelector(".butclass>input:nth-child(1)").value == "Edit") {

        let index = -1;

        for (let i = 0; i < Tasks.length; i++) {

            if (Tasks[i].id == global_id) {
                index = i;
                break;
            }
        }
        Tasks[index].title = document.querySelector("#title").value;
        Tasks[index].date = document.querySelector("#date").value ; 
        Tasks[index].description=document.querySelector("#description").value ;

        localStorage.setItem("Tasks",JSON.stringify(Tasks));

        showcards(Tasks);
        removeunwanteddesc();
        document.querySelector(".butclass>input:nth-child(1)").value = "Add";
        cleardetails();
        hideform();
        alert("Card sucessfully updated!");
      
        return;
    }

    let titlestr = document.querySelector("#title").value;
    let datestr = document.querySelector("#date").value;
    let descriptionstr = document.querySelector("#description").value;

    let task = {
        id: Tasks.length + 1,
        title: titlestr,
        date: datestr,
        description: descriptionstr
    }
    Tasks.push(task);
    localStorage.setItem("Tasks",JSON.stringify(Tasks));
    hideform();
    alert("Task Sucessfully added");
    showcards(Tasks);
    removeunwanteddesc();
    cleardetails();
    console.log(Tasks);
});




searbar.addEventListener("input",()=>{
  
    let input_search = "";
    input_search = searbar.value.toLowerCase();

    console.log(input_search);

    let cardarr = document.querySelectorAll(".taskcard");
    cardarr.forEach((cardobj)=>{

        let targstr =   cardobj.querySelector("span").textContent.toLowerCase();

        if (targstr.indexOf(input_search) > -1 ) {

            cardobj.style.display = "";
        }
        else {
            cardobj.style.display = "none";
        }
    });
    
});


function showcards(Tasks) {
    let taskcontaner = document.querySelector(".taskcardcontainer");
    let str = "";
    for (let i = 0; i < Tasks.length; i++) {
        str += `
          <div class="taskcard">
             <span>${Tasks[i].id}: ${Tasks[i].title}</span>
             <div>
                 <span>Deadline: </span>
                 <span>${Tasks[i].date}</span>
             </div>
             <div class="description">
                 <p>${Tasks[i].description}</p>
             </div>
             <div class="taskiconcont" >
                 <span class="material-icons" onclick="edittask(${Tasks[i].id})">
                     edit_note
                 </span>
                 <span class="material-icons" onclick="deletetask(${Tasks[i].id})">
                     delete
                 </span>
             </div>
             
         </div>`

    }
    taskcontaner.innerHTML = str;
}

function removeunwanteddesc() {
    let taskobjs = document.querySelectorAll(".taskcard");
    for (let i = 0; i < taskobjs.length; i++) {
        let desc = taskobjs[i].querySelector(".description>p").innerText;
        if (desc == "") {
            taskobjs[i].querySelector(".description").classList.add("desciptionchide");
        }
    }
}

function edittask(eid) {
    console.log(eid);
    showform();

    let task = {};

    for (let i = 0; i < Tasks.length; i++) {

        if (Tasks[i].id == eid) {
            task = Tasks[i];
            break;
        }
    }



    document.querySelector("#title").value = task.title;
    document.querySelector("#date").value = task.date;
    document.querySelector("#description").value = task.description;

    document.querySelector(".butclass>input:nth-child(1)").value = "Edit";

    global_id = eid;
}

function deletetask(id){
    
    for (let i = 0; i < Tasks.length; i++) {
        if (Tasks[i].id == id) {
            Tasks.splice(i,1);
            break;
        }
    }

    let newid=1;
    for (let i = 0; i < Tasks.length; i++) {
        Tasks[i].id = newid;
        newid++;
    }
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
    alert(`Task No ${id} Sucessfully Deleted`);
    showcards(Tasks);
}


function cleardetails(){
    document.querySelector("#title").value="";
    document.querySelector("#date").value="";
    document.querySelector("#description").value="";
}

(()=>{
 
    Tasks = JSON.parse(localStorage.getItem("Tasks")) ;

    showcards(Tasks);
    removeunwanteddesc();

})()

