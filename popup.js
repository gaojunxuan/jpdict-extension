let toggleBtn=document.getElementById("toggleBtn");
chrome.storage.sync.get(['jpdict_on'], function(result) {
    toggleBtn.checked=result.jpdict_on;
});
toggleBtn.onclick=function(element){
    if(document.getElementById("toggleBtn").checked) {
        //on
        chrome.storage.sync.set({jpdict_on:true}, function() {
            console.log("JPDict: on");
        });
    }
    else{
        chrome.storage.sync.set({jpdict_on:false}, function() {
            console.log("JPDict: off");
        });
        //off
    }
};