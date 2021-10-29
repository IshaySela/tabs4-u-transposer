chrome.runtime.onInstalled.addListener(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: test,
  });
})


function test() {
  alert("this is a test")
}