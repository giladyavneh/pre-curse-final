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
        container.appendChild(more)
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

function sortByPriority(){
    const target=document.getElementById("view")
    let kids=target.children
    for (let i=0;i<kids.length;i++){
        if (kids[i].querySelector(".todoPriority")!=null){
            if(parseInt(kids[i].querySelector(".todoPriority").innerText)>parseInt(prior.value)){
                target.insertBefore(document.createElement("hr"),kids[i])
                target.insertBefore(container,kids[i])
                break
            }
        }
        
    }
    
}