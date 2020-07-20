document.onload=updateCounter()
document.addEventListener("mousedown",function(e){
    let item=e.target.closest(".todoContainer")
    if (item===null||e.target.tagName=="BUTTON"||e.target.className=="more"){return}
    else{
        document.addEventListener("mousemove",mousemove)
        
        let view=document.getElementById("view")
        let kids=[...view.children]
        let lowerclass=[]
        let upperclass=[]
        for(let i=2;i<view.children.length;i++){
            if (view.children[i].tagName!=="HR") {
                if(i<kids.indexOf(item)){
                    upperclass.push(view.children[i])
                }
                else if(i>kids.indexOf(item)){
                    lowerclass.push(view.children[i])
                }
            }
        }
        let mesurments=item.getBoundingClientRect()
        let x=e.clientX
        let y=e.clientY
        item.style.opacity=0.1
        let clone=item.cloneNode(true)
        clone.addEventListener("mouseup",mouserelease)
        clone.style.position="absolute"
        clone.style.top=mesurments.top+"px"
        clone.style.left=mesurments.left+"px"
        clone.style.width=mesurments.width+"px"
        clone.style.opacity=0.8
        clone.style.transition="none"
        document.querySelector("body").appendChild(clone)
        let movers=[]
        function mousemove(e){
            let top=clone.getBoundingClientRect().top
            movers=top<mesurments.top?upperclass:lowerclass
            let dx=e.clientX-x
            let dy=e.clientY-y
            clone.style.left=parseInt(clone.style.left)+dx+"px"
            clone.style.top=top+dy+"px"
            x=e.clientX
            y=e.clientY
            
            if(top<mesurments.top){
                for (let i=0;i<upperclass.length;i++){
                    let data=upperclass[i].getBoundingClientRect()
                    if (top<data.top){
                        upperclass[i].style.transform=`translateY(${data.height+15}px)`
                    }
                    else{
                        upperclass[i].style.transform=`translateY(0px)`
                    }
                }
            }
            else{
                for (let i=0;i<lowerclass.length;i++){
                    let data=lowerclass[i].getBoundingClientRect()
                    if (clone.getBoundingClientRect().bottom>data.bottom){
                        lowerclass[i].style.transform=`translateY(-${data.height+15}px)`
                    }
                    else{
                        lowerclass[i].style.transform=`translateY(0px)`
                    }
                }
            }
        }
        function mouserelease(e){
            document.removeEventListener("mouseup",mouserelease)
            document.removeEventListener("mousemove", mousemove)
            let top=clone.getBoundingClientRect().top
            
            if(movers.length!=0){
                for(let i=0;i<movers.length;i++){
                    let data=movers[i].getBoundingClientRect().top
                    if (top<data){
                        movers.splice(i,0,item)
                        break
                    }
                    else if(i==movers.length-1){
                        movers.splice(i+1,0,item)
                        break
                    }   
                }
                view.innerHTML="";
                headerCreator();
                if (upperclass.length!=0){
                    upperclass.forEach(function(x){
                        x.style.transform="translateY(0)"
                        x.style.opacity=1
                        view.appendChild(x)
                        view.appendChild(document.createElement("hr"))
                    })
                }
                if (lowerclass.length!=0){
                    lowerclass.forEach(function(x){
                        x.style.transform="translateY(0)"
                        x.style.opacity=1
                        view.appendChild(x)
                        view.appendChild(document.createElement("hr"))
                    })
                }
            }
            for(let i=0;i<kids.length;i++)(
                kids[i].style.transform="translateX(0px)"
            )
            item.style.opacity=1
            clone.remove()
        }
    }
})
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
document.getElementById("textInput").addEventListener("keypress", function(e){
    if(e.keyCode===13){addItem()}
})
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
        dueTime.className="todoCreatedFor"
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
        del.addEventListener("click",deleteItem)
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
        due.value=null
        //updating th counter
        updateCounter()
        if (localStorage.listName==null){
            localStorage.listName=""
        }
        
    }
}

//a function for turning the time stamp as printed to the todo list, into numbers
//for time comperrasions
function turnDateToNumber(stamp){
    //turning the inner text to a list of numbers(as strings)
    let nums=stamp.innerHTML.match(/\d+(?=(-|:|<br>|$))/g)
    let result=0
    //adding the numbers, giving more importance to bigger time units by multypling by exponents of 10 or 60
    for (let i=0;i<nums.length;i++){
        let n
        if (i>2){
            n=parseInt(nums[i])*(60**(nums.length-i))
        }
        else{
            n=parseInt(nums[i])*(10**(nums.length-i))
        }
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

function sortByCreationTime(){
    const target=document.getElementById("view")
    let kids=target.children
    let repo=[]
    //creating an array with all list objects
    for (let i=0;i<kids.length;i++){
        if (kids[i].querySelector(".todoCreatedAt")!=null){
            repo.push(kids[i])
        }   
    }
    //sorting the array by the value inside "todoCreatedAt" div with turnDateToNumberFunction I made
    repo.sort(function(a, b){return turnDateToNumber(a.querySelector(".todoCreatedAt"))-turnDateToNumber(b.querySelector(".todoCreatedAt"))})
    //empty the list and recostuct it with the new sorted list
    target.innerHTML=""
    headerCreator()
    repo.forEach(function(elem){
        target.appendChild(elem)
        target.appendChild(document.createElement("hr"))
    })
}

function sortByDueTime(){
    const target=document.getElementById("view")
    let kids=target.children
    let repo=[]
    let noDue=[]
    //creating an array with all list items that have a due time
    //creating another list of items without due time, to be appended later
    for (let i=0;i<kids.length;i++){
        if (kids[i].querySelector(".todoCreatedFor")!==null&&kids[i].querySelector(".todoCreatedFor").innerText!=="--"){
            repo.push(kids[i])
        }
        else if(kids[i].querySelector(".todoCreatedAt")!=null){
            noDue.push(kids[i])
        }   
    }
    //sorting the array by the value inside "todoCreatedFor" div with turnDateToNumberFunction I made
    repo.sort(function(a, b){return turnDateToNumber(a.querySelector(".todoCreatedFor"))-turnDateToNumber(b.querySelector(".todoCreatedFor"))})
    //empty the list and recostuct it with the new sorted list
    target.innerHTML=""
    headerCreator()
    repo.forEach(function(elem){
        target.appendChild(elem)
        target.appendChild(document.createElement("hr"))
    })
    noDue.forEach(function(elem){
        target.appendChild(elem)
        target.appendChild(document.createElement("hr"))
    })
}

function deleteItem(e){
    let button=e.target;
    let item=button.parentElement.parentElement;
    let target=document.getElementById("view");
    let kids=target.children;
    let hr=item.nextElementSibling;
    let distance=item.getBoundingClientRect().height;
    //starts by fading out the deleted element
    //followed by upward movment of all subsequent items
    item.style.opacity=0;
    hr.style.opacity=0;
    let index=[...kids].indexOf(item);
    for(let i=index+2;i<kids.length;i++){
        kids[i].style.transform=`translateY(-${distance+15}px)`
    }
    //then after all the transitions, actually deleting the element
    setTimeout(function(){
        item.remove();
        hr.remove();
        kids=target.children;
        let elems=[];
        for(let i=0;i<kids.length;i++){
            elems.push(kids[i])
        }
        target.innerHTML="";
        elems.forEach(function(x){
            target.appendChild(x);
            x.style.transform="translateY(0px)"})
        updateCounter()
    },200)
}

