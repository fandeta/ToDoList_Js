/*-------- -------- -------- -------- --------
==========<: To Do List Project :>===========
-------- -------- -------- -------- --------*/

let input = document.querySelector("[type='text']")

let addBtn = document.getElementById("add-btn")

let taskDiv = document.querySelector(".tasks-div")

let theTitleOfAllTasks = document.querySelector("h2")

let resetBtn = document.querySelectorAll("button")[1]



let counterID = 0
let counter = 1

window.onload = () => {
  input.focus()
}

addBtn.onclick = function () {

  let allP = document.querySelectorAll('p.task')

  if (input.value !== ""){ // when input Value not empty!
    let Task = document.createElement("p") // Create Task Paragraph
    let statusSpan = document.createElement("span") // Create Span for Status

    let myIcon = document.createElement("i")
    myIcon.classList.add("fa-regular", "fa-hourglass-half")

    statusSpan.appendChild(myIcon)

    Task.appendChild(statusSpan) // append status span To p Task 
    let TaskSpan = document.createElement("span")// Create span To put the text of task on it
    let TaskTxt = document.createTextNode(`  ${input.value}`)   // putting text of task from input in Task Text Variable
    TaskSpan.appendChild(TaskTxt) // append the text of task To task span

    Task.appendChild(TaskSpan) 

    let deleteBtn = document.createElement("button") // create delete task button

    // deleteBtn.setAttribute("value","Delete")
    // deleteBtn.setAttribute("type","button")

    deleteBtn.setAttribute("id","del-btn")

    let IconTrash =  document.createElement("i")

    IconTrash.classList.add("fa-solid","fa-trash")

    deleteBtn.appendChild(IconTrash)

    Task.appendChild(deleteBtn)

    Task.classList.add("task")

    taskDiv.appendChild(Task)

    // add Task Attributes Values To local storage
    
    Task.setAttribute(`id`,`${counterID}`)

    // Add Task to local Storage 

    var tasks = JSON.parse(localStorage.getItem('all_tasks')) || [];

    var addNewTasks = function (idFunc, task) {
      
      tasks.push({id: idFunc, TaskText: task});

      localStorage.setItem('all_tasks', JSON.stringify(tasks));
      
    }

    addNewTasks(counterID,input.value)
    
    counterID++

    input.value = ""

    input.setAttribute("placeholder","What's Your Next Task ? ")

    input.style.removeProperty("border-color")

    input.focus()

    // [-] Functions of Task After its Created !

    let allTasks = document.querySelectorAll(".task")
      allTasks.forEach(function(current){
        
        // This function To Change Task status and Make it Done and replace hour glass with check mark !
        current.onclick = function() {

          current.children[1].style.cssText = `border-color:#1de61d; text-decoration: line-through; opacity : .6 ;`
          current.children[0].children[0].classList.remove("fa-regular", "fa-hourglass-half")
          current.children[0].children[0].classList.add("fa-solid", "fa-check")

          // This Click Function will Work if user clicked on Task Three Times  --> After clicked three times Will Delete The Task 

          current.ondblclick = function (){
            let theTitleOfAllTasks = document.querySelector("h2")
            let allP = document.querySelectorAll('p.task')
            theTitleOfAllTasks.innerHTML = `<span> ${allP.length -1} Tasks </span><i class="fa-solid fa-check h2-icon"></i>`
            resetBtn.innerHTML = ` ${allP.length -1} Tasks <i class="fa-solid fa-trash"></i>`
            current.remove()
          }
        }
      })

      // Function of The Delete Button inside Task
      allTasks.forEach(function(ele){
        deleteBtn.onclick = function() {

          let allP = document.querySelectorAll('p.task')
          let theTitleOfAllTasks = document.querySelector("h2")

          // --> Delete the task From local Storage

          localStorage.removeItem(ele.attributes[1].nodeName)
          // --> new way
          
          theTitleOfAllTasks.innerHTML = `<span> ${allP.length -1} Tasks </span><i class="fa-solid fa-check h2-icon"></i>`
          resetBtn.innerHTML = ` ${allP.length -1} Tasks <i class="fa-solid fa-trash"></i>`

          if (allP.length === 0){
            theTitleOfAllTasks.innerHTML = `<span> No Tasks </span><i class="fa-solid fa-check h2-icon"></i>`
            resetBtn.innerHTML = ` No Tasks <i class="fa-solid fa-trash"></i>`
          }
          ele.remove()
          
        }
      })
      theTitleOfAllTasks.innerHTML = `<span> ${allP.length + 1} Tasks </span><i class="fa-solid fa-check h2-icon"></i>`
      resetBtn.innerHTML = ` ${allP.length + 1} Tasks <i class="fa-solid fa-trash"></i>`

  }
  else{
    input.setAttribute("placeholder","Field Is Empty!")
    input.style.borderColor = "orangered"
    input.focus()
  }

}

resetBtn.onclick = () => {

  let allP = document.querySelectorAll('p.task')

  for (let i = 0 ; i < allP.length ; i++){
    allP[i].remove()
  }
  resetBtn.innerHTML = ` No Tasks <i class="fa-solid fa-trash"></i>`
  theTitleOfAllTasks.innerHTML = `<span> No Tasks </span><i class="fa-solid fa-check h2-icon"></i>`

  localStorage.clear()
  counterID = 0
}

