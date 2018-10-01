// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

var patt = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g
var url="https://slwspfunc.azurewebsites.net/api/GetWebDictResult?code=p8i0IwgWp4NMUnueeeAKchMJZjF4kRMnZSacO68m2m9HzlynPSxPwA==";
// Lets listen to mouseup DOM events.
window.addEventListener('mouseup', function (e) {
    chrome.storage.sync.get(['jpdict_on'], function(result) {
      if(result.jpdict_on==true){
        var selection = window.getSelection().toString();
        if (selection.length > 0) {
            if(patt.test(selection)){
                $.getJSON(url+"&keyword="+selection, function(json) {
                  renderBubble(e.pageX, e.pageY, json);
                });
      
            }
        }
      }
    });

});

window.addEventListener('touchend', function (e) {
  chrome.storage.sync.get(['jpdict_on'], function(result) {
    if(result.jpdict_on==true){
      var selection = window.getSelection().toString();
      if (selection.length > 0) {
          if(patt.test(selection)){
              $.getJSON(url+"&keyword="+selection, function(json) {
                renderBubble(e.changedTouches[0].pageX, e.changedTouches[0].pageY, json);
              });
    
          }
      }
    }
  });

});


// Close the bubble when we click on the screen.
window.addEventListener('mousedown', function (e) {
  bubbleDOM.style.visibility = 'hidden';
});

window.addEventListener('touchstart', function (e) {
  bubbleDOM.style.visibility = 'hidden';
});

// Move that bubble to the appropriate location.
function renderBubble(right, top, json) {
  if(json.length!=0){
    var html="";
    $.each(json, function(i, item) {
      if(i!=0){
        html+="<p class='title-jpdict' style='margin-top:12px; margin-bottom:2px;'>"+json[i]["reading"]+"</p>";
      }
      else{
        html+="<p class='title-jpdict' style='margin-top:0px; margin-bottom:2px;'>"+json[i]["reading"]+"</p>";
      }
      if(i!=json.length-1){
        html+="<p class='definition-jpdict' style='margin-top: 4px;margin-bottom: 12px; font-size:14px;'>"+json[i]["definition"]+"</p>";
        html+="<hr>"
      }
      else{
        html+="<p class='definition-jpdict' style='margin-top: 4px;margin-bottom: 0px; font-size:14px;'>"+json[i]["definition"]+"</p>";
      }
    });
    bubbleDOM.innerHTML = html;
    bubbleDOM.style.top = top+20+"px";
    bubbleDOM.style.left = right+20+"px";
    bubbleDOM.style.visibility = 'visible';
  }
}

function renderTestBubble(right, top, test) {
    bubbleDOM.innerHTML = test;
    bubbleDOM.style.top = top+20+"px";
    bubbleDOM.style.left = right+20+"px";
    bubbleDOM.style.visibility = 'visible';
  
}