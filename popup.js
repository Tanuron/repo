// popup.js
document.addEventListener('DOMContentLoaded', function() {
    var reportButton = document.getElementById('reportButton');
  
    reportButton.addEventListener('click', function() {
      // Trigger a message to the background script when the button is clicked
      chrome.runtime.sendMessage({ action: 'report' });
    });
  });
