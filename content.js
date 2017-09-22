// Reload page once browser navbar icon has been clicked to toggle anonymisation. 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    location.reload(); 
  }
});