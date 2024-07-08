/*-------- -------- -------- -------- --------
==========<: To Do List Project :>===========
-------- -------- -------- -------- --------*/

let input = document.querySelector("[type='text']")

let addBtn = document.querySelector("[type='button']")

let taskDiv = document.querySelector(".tasks-div")

let theTitleOfAllTasks = document.querySelector("h2")

let resetBtn = document.querySelector("button")



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

    let deleteBtn = document.createElement("input") // create delete task button

    deleteBtn.setAttribute("value","Delete")
    deleteBtn.setAttribute("type","button")
    deleteBtn.setAttribute("id","del-btn")

    Task.appendChild(deleteBtn)

    Task.classList.add("task")

    taskDiv.appendChild(Task)

    
    // add Task Attributes Values To local storage
    
    Task.setAttribute(`ID-${1171900+counter}`,`ID-${1171900+counter}`)

    localStorage.setItem( `id-${1171900+counter}`, [ID = 1171900 + counter , title = `${input.value}`])

    counter += 7

    // localStorage.setItem('tasks',`${input.value} and ${counter}`)


    input.value = ""
    input.setAttribute("placeholder","What's Your Next Task ? ")

    input.style.removeProperty("border-color")

    input.focus()

    // [-] Functions of Task After its Created !
    let allTasks = document.querySelectorAll(".task")
      
      allTasks.forEach(function(current){

        current.onclick = function() {
          current.children[1].style.borderColor = "#1de61d" // change border color of span Text
          current.children[1].style.textDecoration = "line-through"

          current.style.opacity= ".6"
          // current.style.textDecoration = "line-through"
          current.children[0].children[0].classList.remove("fa-regular", "fa-hourglass-half")
          current.children[0].children[0].classList.add("fa-solid", "fa-check")

          if (current.children[0].getAttribute("status") === "[wait..]-"){
            current.children[0].setAttribute("status","[Done!]-")
            current.children[0].textContent = current.children[0].getAttribute("status") + current.children[0].textContent.slice(11)
          }
          }
      })

      allTasks.forEach(function(ele){
        deleteBtn.onclick = function() {

          let allP = document.querySelectorAll('p.task')

          let theTitleOfAllTasks = document.querySelector("h2")

          localStorage.removeItem(ele.attributes[1].nodeName)

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
}
