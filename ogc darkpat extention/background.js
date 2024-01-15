// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'report') {
      // Handle the report action here
      window.open('report.html', '_blank');
      console.log('Report button clicked!');
      // You can perform actions like sending the report to a server, displaying a confirmation, etc.
    }
  });