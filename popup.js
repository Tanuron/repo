// popup.js
document.addEventListener('DOMContentLoaded', function () {
  var reportButton = document.getElementById('reportButton');
  var onOffButton = document.getElementById('onOffButton');

  reportButton.addEventListener('click', function () {
    // Capture the current tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      var tabUrl = currentTab.url;

      // Capture a screenshot of the current tab
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (screenshot) {
        // Send the URL and screenshot to the backend
        fetch('http://your-backend-url/save_tab_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: tabUrl, screenshot: screenshot }),
        })
          .then(response => response.text())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
      });
    });
  });

  // An enum-like object that defines numbers for activation states of the extension.
  const activationState = Object.freeze({
    On: 1,
    Off: 0,
    PermanentlyOff: -1,
  });

  // Retrieve the current activation state from storage (you may need to handle initialization)
  chrome.storage.sync.get('activationState', (result) => {
    const currentActivationState = result.activationState || activationState.Off;

    // Set the button text based on the current activation state
    onOffButton.innerText = currentActivationState === activationState.On ? 'Turn Off' : 'Turn On';
  });

  // Add a click event listener to toggle the activation state
  onOffButton.addEventListener('click', () => {
    // Retrieve the current activation state from storage
    chrome.storage.sync.get('activationState', (result) => {
      const currentActivationState = result.activationState || activationState.Off;

      // Toggle the activation state
      const newActivationState =
        currentActivationState === activationState.On ? activationState.Off : activationState.On;

      // Save the updated activation state to storage
      chrome.storage.sync.set({ activationState: newActivationState });

      // Update the button text based on the new activation state
      onOffButton.innerText = newActivationState === activationState.On ? 'Turn Off' : 'Turn On';
    });
  });
});