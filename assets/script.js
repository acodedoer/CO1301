divs = document.querySelectorAll(".list-div")
divs.forEach(element=>{
    let hint, link
    let hintB = false;
    let linkB = false;
    element.childNodes.forEach(node=>{
        if(node.className=="hint-link"){
            link = node;
            linkB = true
        }
        else if(node.className=="hint-div"){
            hint = node
            hintB = true
        }
    })
    if(hintB === true && linkB === true){
        link.addEventListener('click', function(e){
            e.preventDefault();
        if(hint.style.display != "block"){
            hint.style.display = "block"
        }
        else{
            hint.style.display = "none"
        }
    });
    }
    }
)