// popup.js
document.addEventListener('DOMContentLoaded', function() {
    var reportButton = document.getElementById('reportButton');
  
    reportButton.addEventListener('click', function() {
      // Trigger a message to the background script when the button is clicked
      chrome.tabs.create({ url: 'report.html' }); // Open a new page (report.html) in a new tab
    });
  });
