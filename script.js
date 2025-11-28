const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")
let drageElement = null

const tasks = document.querySelectorAll(".task")

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
        colm.appendChild(drageElement);   // fixed spelling
        colm.classList.remove("hover-over");
    });
    
}

addDraheEventOnColm(todo);
addDraheEventOnColm(progress);
addDraheEventOnColm(done);

