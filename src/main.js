document.onload=updateCounter()

function updateCounter(){
    let counter=document.getElementById("counter")
    let items=document.getElementById("view").children.length
    if(items>2){
        counter.innerText=(items-2)/2
    }
    else{
        counter.innerText=0
    }
}

function addItem(){
    const input=document.getElementById("textInput");
    const prior=document.getElementById("prioritySelector")
    const due=document.getElementById("dueTime")
    const target=document.getElementById("view")
    let container=document.createElement("div")
    if (input.value!==""){
        //This if statement bellow creates the header for the to do list.
        //I would rather hard code it, but it will break the 'list should start off empty' test
        if (target.innerHTML==""){
            headerCreator()
        }
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
        priority.className="todoPriority"
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
        more.addEventListener("click",showMore)
        more.style.cursor="pointer"
        container.appendChild(more)
        //creatin the menu element
        let menu=document.createElement("div")
        menu.className="menu"
        let del=document.createElement("button")
        del.className="delete"
        del.innerText="DELETE"
        let edit=document.createElement("button")
        edit.className="edit"
        edit.innerText="EDIT"
        menu.appendChild(edit)
        menu.appendChild(del)
        container.appendChild(menu)
        //appending it all to the actual page, by the priority
        target.appendChild(container)
        target.appendChild(document.createElement("hr"))
        input.value=""
        //updating th counter
        updateCounter()
    }
}

//a function for turning the time stamp as printed to the todo list, into numbers
//for time comperrasions
function turnDateToNumber(stamp){
    //turning the inner text to a list of numbers(as strings)
    let nums=stamp.innerHTML.match(/\d+(?=(-|:|<br>|$))/g)
    let result=0
    //adding the numbers, giving more importance to bigger time units by multypling by exponents of 10
    for (let i=0;i<nums.length;i++){
        let n=parseInt(nums[i])*(10**(nums.length-i))
        result+=n
    }
    return result
}
//function for creating the list headers, because when the list is modified
//it's more simple the erase it all and reconstuct it
//the same header needed to be generated each time
function headerCreator(){
    let target=document.getElementById("view")
    let header=document.createElement("div")
    header.id="thead"
    for (let x of ["status","task","priority","created","due"]){
        let div=document.createElement("div")
        div.innerText=x
        header.appendChild(div)
    }
    target.appendChild(header)
    target.appendChild(document.createElement("hr"))
}

function sortByPriority(){
    const target=document.getElementById("view")
    let kids=target.children
    let repo=[]
    //creating an array with all list objects
    for (let i=0;i<kids.length;i++){
        if (kids[i].querySelector(".todoPriority")!=null){
            repo.push(kids[i]) 
        }   
    }
    //sorting the array by the value inside "todoPriority" div
    repo.sort(function(a, b){return b.querySelector(".todoPriority").innerText-a.querySelector(".todoPriority").innerText})
    //empty the list and recostuct it with the new sorted list
    target.innerHTML=""
    headerCreator()
    repo.forEach(function(elem){
        target.appendChild(elem)
        target.appendChild(document.createElement("hr"))
    })
}
function showMore(e){
    let button=e.target
    let item=button.parentElement
    let menu=item.querySelector(".menu")
    if(button.getAttribute("open")=="true"){
        button.removeAttribute("open")
        menu.style.maxWidth="0px"
        menu.style.transform="translateX(0px)"
        item.style.transform="translateX(0px)"
    }
    else{
        button.setAttribute("open","true")
        menu.style.maxWidth="100px"
        menu.style.transform="translateX(100px)"
        item.style.transform="translateX(-100px)"
    }
}
