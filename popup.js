document.addEventListener("DOMContentLoaded", function () {
  let selectedRecordOption = "currentTab"

  const recordButton = document.getElementById("record-button")
  const closeButton = document.getElementById("close-button")

  const fullScreenRecordButton = document.getElementById("fullScreenOption")
  const activeTabRecordButton = document.getElementById("activeTabOption")

  fullScreenRecordButton.addEventListener("click", () => {
    if (selectedRecordOption === "fullScreen") return

    activeTabRecordButton.classList.remove("active")
    fullScreenRecordButton.classList.add("active")
    selectedRecordOption = "fullScreen"
  })

  activeTabRecordButton.addEventListener("click", () => {
    if (selectedRecordOption === "currentTab") return

    fullScreenRecordButton.classList.remove("active")
    activeTabRecordButton.classList.add("active")
    selectedRecordOption = "currentTab"
  })

  closeButton.addEventListener("click", () => {
    window.close()
  })

  recordButton.addEventListener("click", () => {
    if (selectedRecordOption === "currentTab") {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        console.log(tabs)

        const existingContexts = await chrome.runtime.getContexts({})
        let recording = false

        const offscreenDocument = existingContexts.find(
          (c) => c.contextType === "OFFSCREEN_DOCUMENT"
        )

        if (!offscreenDocument) {
          // Create an offscreen document.
          await chrome.offscreen.createDocument({
            url: "offscreen.html",
            reasons: ["USER_MEDIA"],
            justification: "Recording from chrome.tabCapture API",
          })
        } else {
          recording = offscreenDocument.documentUrl.endsWith("#recording")
        }

        if (recording) {
          chrome.runtime.sendMessage({
            type: "stop-recording",
            target: "offscreen",
          })
          return
        }

        const streamId = await chrome.tabCapture.getMediaStreamId({
          targetTabId: tabs[0].id,
        })

        chrome.runtime.sendMessage({
          type: "start-recording",
          target: "offscreen",
          data: streamId,
        })
      })
    } else {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          const streamId = await chrome.tabCapture.getMediaStreamId({
            targetTabId: tabs[0].id,
          })

          chrome.tabs.sendMessage(
            tabs[0].id,
            {
              action: "request_recording",
              data: streamId,
            },
            function (response) {}
          )
        }
      )
    }
  })
})
