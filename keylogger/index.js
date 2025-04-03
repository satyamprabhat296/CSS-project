const logdiv=document.getElementById("log");
const statediv=document.getElementById("state");
const startbtn=document.getElementById("start-btn");
const stopbtn=document.getElementById("stop-btn");

startbtn.addEventListener("click",()=>{
    document.addEventListener("keydown",handleDown);
    document.addEventListener("keyup",handleUp);
    startbtn.disabled=true;
    stopbtn.disabled=false;

})
stopbtn.addEventListener("click",()=>{
    document.addEventListener("keydown",handleDown);
    document.addEventListener("keyup",handleUp);
    logdiv.textContent="";
    statediv.textContent="";
    stopbtn.disabled=true;
    startbtn.disabled=false;


})

function handleDown(e){
    logdiv.textContent=`Key ${e.key} pressed down`;
    statediv.textContent="key is down"

}
function handleUp(e){
    logdiv.textContent=`Key ${e.key} pressed up`;
    statediv.textContent="key is up"

}
