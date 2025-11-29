const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll(".task")
const toggleModelButton = document.querySelector("#toggle-modal")
const modalBg = document.querySelector(".modal .bg")
const modal = document.querySelector(".modal")
const addtaskButton = document.querySelector("#add-new-task")
let drageElement = null
let tasksData = {}
const colums = [todo, progress, done]


function addTask(title, desc, column) {
    const div = document.createElement("div")
    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
        `
    column.appendChild(div)

    div.addEventListener("drag", (e) => {
        drageElement = div
    })

    // delete button
    const deleteButton = div.querySelector("button")
    deleteButton.addEventListener("click", () =>{
        div.remove()
        updateTaskCount()
    })

    return div
}

function updateTaskCount() {
    colums.forEach(col => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")

        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })

        localStorage.setItem("tasks", JSON.stringify(tasksData))
        count.innerText = tasks.length
    })
}


if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"))

    for (const col in data) {
        const colums = document.querySelector(`#${col}`)

        data[col].forEach(task => {
            addTask(task.title, task.desc, colums)
        })
    }
    updateTaskCount()
}


tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        drageElement = task
    })
})

function addDraheEventOnColm(colm) {
    colm.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    colm.addEventListener("dragenter", (e) => {
        e.preventDefault();
        colm.classList.add("hover-over");
    });

    colm.addEventListener("dragleave", (e) => {
        e.preventDefault();
        colm.classList.remove("hover-over");
    });

    colm.addEventListener("drop", (e) => {
        e.preventDefault();

        colm.appendChild(drageElement);
        colm.classList.remove("hover-over");
        updateTaskCount()
    });
}

addDraheEventOnColm(todo);
addDraheEventOnColm(progress);
addDraheEventOnColm(done);



toggleModelButton.addEventListener("click", (e) => {
    modal.classList.toggle("active")
})

modalBg.addEventListener("click", (e) => {
    modal.classList.remove("active")
})

addtaskButton.addEventListener("click", (e) => {
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value

    addTask(taskTitle, taskDesc, todo)
    updateTaskCount()

    modal.classList.remove("active") 
    document.querySelector("#task-title-input").value = "" 
    document.querySelector("#task-desc-input").value = ""


})