function addItem(){
    const input=document.getElementById("textInput");
    const prior=document.getElementById("prioritySelector")
    const due=document.getElementById("dueTime")
    const target=document.getElementById("view")
    let container=document.createElement("div")
    container.className="todoContainer"
    //creating the checkbox element
    let done=document.createElement("div")
    done.className="done"
    let check=document.createElement("input")
    check.type="checkbox"
    done.appendChild(check)
    container.appendChild(done)
    //creating the todo text div
    let todoText=document.createElement("div")
    todoText.className="todoText"
    todoText.innerText=input.value
    container.appendChild(todoText)
    //creating the priority div
    let priority=document.createElement("div")
    priority.className="priority"
    priority.innerText=prior.value
    container.appendChild(priority)
    //creating the time stamp elelment using the Date object
    let todoCreatedAt=document.createElement("div")
    todoCreatedAt.className="todoCreatedAt"
    let now=new Date()
    todoCreatedAt.innerText=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}
    ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    container.appendChild(todoCreatedAt)
    //creating the due time element
    let dueTime=document.createElement("div")
    dueTime.className="todoCreatedAt"
    dueTime.innerText=due.value==""?"--":`${due.value.split("T")[0]}
    ${due.value.split("T")[1]}`
    container.appendChild(dueTime)
    //creating the 'more' button
    let more=document.createElement("div")
    more.className="more"
    more.innerText=":"
    container.appendChild(more)
    //appending it all to the actual page
    target.appendChild(container)
    target.appendChild(document.createElement("hr"))
}