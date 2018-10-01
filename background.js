chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({jpdict_on:true}, function() {
    });
});