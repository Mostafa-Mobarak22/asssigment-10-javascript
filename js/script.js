var bookmarkName=document.getElementById("bookName")
var bookmarkUrl=document.getElementById("bookUrl")
var websites=[]
if(localStorage.getItem("sites")!=null){
    websites=JSON.parse(localStorage.getItem("sites"))
    display()
}
var inputName=document.querySelector("input[type='text']")
var namePattern=/^[a-zA-Z]{3}/;
var testName =function(){
    if(!(document.querySelector("input[type='text']").value.match(namePattern))){
        document.querySelector("input[type='text']").classList.add("notvalid")
        document.querySelector("input[type='text']").classList.remove("isvalid")
        return false
    }
    else{
        document.querySelector("input[type='text']").classList.remove("notvalid")
        document.querySelector("input[type='text']").classList.add("isvalid")
        return true
    }
}
inputName.addEventListener("keyup",testName)
var inputUrl=document.querySelector("input[type='url']")
var urlPattern=/^www\.[A-Za-z0-9]+\.com$/;
var testUrl =function(){
    if(!(document.querySelector("input[type='url']").value.match(urlPattern))){
        document.querySelector("input[type='url']").classList.add("notvalid")
        document.querySelector("input[type='url']").classList.remove("isvalid")
        return false
    }
    else{
        document.querySelector("input[type='url']").classList.remove("notvalid")
        document.querySelector("input[type='url']").classList.add("isvalid")
        return true
    }
}
inputUrl.addEventListener("keyup",testUrl)
function addWebsite(){
    var websiteInfo={
        name:bookmarkName.value,
        url:bookmarkUrl.value
    }
    console.log(testUrl())
    console.log(testName())
    if(testUrl() && testName()){
        updateData(websiteInfo)
        display()
        clear()
        // document.querySelector("input[type='url']").classList.remove("notvalid")
        // document.querySelector("input[type='text']").classList.remove("notvalid")
        document.querySelector("input[type='url']").classList.remove("isvalid")
        document.querySelector("input[type='text']").classList.remove("isvalid")
    }
    else{
        document.getElementsByClassName("massage-box")[0].classList.remove("d-none")
        document.getElementsByClassName("massage-box")[0].style.backgroundColor="#0007"
    }

}
function display(){
    var cartona=""
    for(var i=0;i<websites.length;i++){
        cartona+=`
        <tr>
            <td>${i+1}</td>
            <td>${websites[i].name}</td>              
            <td>
                <button onclick="visitSite(${i+1})" class="btn btn-visit" data-index="0">
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
                </button>
            </td>
            <td>
                <button onclick="deleteSite(${i+1})" class="btn btn-delete pe-2" data-index="0">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
            </td>
        </tr>
        `
    }

    document.getElementById("tableContent").innerHTML=cartona
}
function clear(){
    bookmarkName.value=""
    bookmarkUrl.value=""
}
function deleteSite(index){
    websites.splice(index-1,1)
    localStorage.setItem("sites",JSON.stringify(websites))
    display()
}
function visitSite(index){
    var newWindow=open("https://"+websites[index-1].url,"_blank")   
}
function updateData(websiteInfo){
    websites.push(websiteInfo)
    localStorage.setItem("sites",JSON.stringify(websites))
}
function closeMassage(){
    document.getElementsByClassName("massage-box")[0].classList.add("d-none")
}
