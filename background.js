// Turn Twanonymise on when it is first installed.
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({twanonymise: true}); 
});

// If Twanonymise is on (set to 'true' in storage), insert the anonymisation css.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.storage.sync.get("twanonymise", function(data){
	    if (data["twanonymise"]){
	    	chrome.tabs.insertCSS({file: './anonymise.css'})
	    }
	});   
});

// Toggle anonymisation on and off when you click the icon browser navbar
// and change icon accordingly.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get("twanonymise", function(data){
    if (data["twanonymise"]){
      chrome.browserAction.setIcon({path: 'iconpause48.png'});
      chrome.storage.sync.set({twanonymise: false});
      chrome.browserAction.setTitle({title: 'Twanonymous is paused'});
    } else {
      chrome.storage.sync.set({twanonymise: true});
      chrome.browserAction.setIcon({path: 'icon48.png'});
      chrome.browserAction.setTitle({title: 'Twanonymous is active'});
    }
});

// Send message when the icon in browser navbar is clicked.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});