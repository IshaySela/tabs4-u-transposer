const btn = document.getElementById("transpose-button")
const input = document.getElementById("transpose-input")

btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const amountTransposed = input.value * 2;

    // Pass the amount to tranpose to script.js
    await chrome.storage.local.set({ amountToTranspose: amountTransposed })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["script.js"],
    });
})
