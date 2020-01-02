let dragTarget=document.getElementById("droptarget")
dragTarget.addEventListener("dragover",(e)=>{

    e.preventDefault()
    let text=e.dataTransfer.getData("text")
    console.log(text)
    // e.dataTransfer.dropEffect="move"

})
dragTarget.addEventListener("dragenter",(e)=>{
    e.preventDefault()
    e.dataTransfer.dropEffect="copy"
    let text=e.dataTransfer.getData("text")
    console.log(text)

})
dragTarget.addEventListener("drop",e=>{
    console.log(e)
})
let dragSrc=document.getElementById("dragsrc")
dragSrc.addEventListener("dragstart",(e)=>{
    // e.preventDefault()
    e.dataTransfer.effectAllowed="copy"
    console.log(dragSrc.innerText)
    e.dataTransfer.setData("text",dragSrc.innerText)
})
