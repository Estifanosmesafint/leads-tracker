let mylead = []
let inputel = document.getElementById("input-el")
let inputbtn = document.getElementById("input-btn")
let ulel = document.getElementById("ul-el")
let deletebtn=document.getElementById("delet-btn")
let leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"))
let tabtn=document.getElementById("tab-btn")
tabtn.addEventListener("click",function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let activetab=tabs[0]
        let activetabid=activetab.id
        mylead.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(mylead))
        renderleads()
    })
})
deletebtn.addEventListener("dblclick",function(){
    localStorage.clear()
    mylead=[]
    renderleads()
})
if (leadsfromlocalstorage) {
    mylead = leadsfromlocalstorage
    renderleads()
}

inputbtn.addEventListener("click", function () {
    mylead.push(inputel.value)
    inputel.value = ""
    localStorage.setItem("myleads", JSON.stringify(mylead))
    renderleads()
})

function renderleads() {
    let listitem = ""

    for (let i = 0; i < mylead.length; i++) {
        listitem += `
            <li>
                <a target="_blank" href="${mylead[i]}">
                    ${mylead[i]}
                </a>
            </li>
        `
    }

    ulel.innerHTML = listitem
}

