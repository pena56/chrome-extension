chrome.runtime.onMessage.addListener(async (message) => {
  if (message.target === "offscreen") {
    switch (message.type) {
      case "start-recording":
        startRecording(message.data)
        break
      case "stop-recording":
        stopRecording()
        break
      default:
        throw new Error("Unrecognized message:", message.type)
    }
  }
})

let recorder
let data = []

const createControllerElement = () => {
  // Create the main container div
  const controlContainer = document.createElement("div")
  controlContainer.classList.add("control_container")

  controlContainer.innerHTML = `
    <div class="timer">
    <p id="counter">00:00:00</p>
  
    <div class="dot">
      <div></div>
    </div>
  </div>
  
  <div class="button_group">
    <button class="btn">
      <div class="circle">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="43"
            height="43"
            rx="21.5"
            fill="white"
          />
          <path
            d="M18 16.5L18 27.5"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M26 16.5L26 27.5"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <rect
            x="0.5"
            y="0.5"
            width="43"
            height="43"
            rx="21.5"
            stroke="white"
          />
        </svg>
      </div>
  
      <p>Pause</p>
    </button>
  
    <button class="btn">
      <div class="circle">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.25 7.5C5.25 6.25736 6.25736 5.25 7.5 5.25H16.5C17.7426 5.25 18.75 6.25736 18.75 7.5V16.5C18.75 17.7426 17.7426 18.75 16.5 18.75H7.5C6.25736 18.75 5.25 17.7426 5.25 16.5V7.5Z"
            stroke="#0F172A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
  
      <p>Stop</p>
    </button>
  
    <button class="btn">
      <div class="circle">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.63 7.58008C16.63 7.58008 16.66 6.63008 16.63 6.32008C16.46 4.28008 15.13 3.58008 12.52 3.58008H6.21C3.05 3.58008 2 4.63008 2 7.79008V16.2101C2 17.4701 2.38 18.7401 3.37 19.5501L4 20.0001"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.7398 10.95V16.21C16.7398 19.37 15.6898 20.42 12.5298 20.42H7.25977"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.0002 6.73999V15.81C22.0002 17.48 20.8802 18.06 19.5202 17.1L16.7402 15.15"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.02 2.18994L2.02002 22.1899"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
  
      <p>Camera</p>
    </button>
  
    <button class="btn">
      <div class="circle">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z"
            stroke="#0F172A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
  
      <p>Mic</p>
    </button>
  
    <button class="btn">
      <div class="gray_btn">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.7404 9L14.3942 18M9.60577 18L9.25962 9M19.2276 5.79057C19.5696 5.84221 19.9104 5.89747 20.25 5.95629M19.2276 5.79057L18.1598 19.6726C18.0696 20.8448 17.0921 21.75 15.9164 21.75H8.08357C6.90786 21.75 5.93037 20.8448 5.8402 19.6726L4.77235 5.79057M19.2276 5.79057C18.0812 5.61744 16.9215 5.48485 15.75 5.39432M3.75 5.95629C4.08957 5.89747 4.43037 5.84221 4.77235 5.79057M4.77235 5.79057C5.91878 5.61744 7.07849 5.48485 8.25 5.39432M15.75 5.39432V4.47819C15.75 3.29882 14.8393 2.31423 13.6606 2.27652C13.1092 2.25889 12.5556 2.25 12 2.25C11.4444 2.25 10.8908 2.25889 10.3394 2.27652C9.16065 2.31423 8.25 3.29882 8.25 4.47819V5.39432M15.75 5.39432C14.5126 5.2987 13.262 5.25 12 5.25C10.738 5.25 9.48744 5.2987 8.25 5.39432"
            stroke="#BEBEBE"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </button>
  </div>
      `

  return controlContainer
}

async function startRecording(streamId) {
  if (recorder?.state === "recording") {
    throw new Error("Called startRecording while recording is in progress.")
  }

  const media = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: streamId,
      },
    },
    video: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: streamId,
      },
    },
  })

  // Continue to play the captured audio to the user.
  const output = new AudioContext()
  const source = output.createMediaStreamSource(media)
  source.connect(output.destination)

  // Start recording.
  recorder = new MediaRecorder(media, { mimeType: "video/webm" })
  recorder.ondataavailable = (event) => data.push(event.data)
  recorder.onstop = () => {
    const blob = new Blob(data, { type: "video/webm" })
    window.open(URL.createObjectURL(blob), "_blank")

    // Clear state ready for next recording
    recorder = undefined
    data = []
  }

  recorder.start()

  // Record the current state in the URL. This provides a very low-bandwidth
  // way of communicating with the service worker (the service worker can check
  // the URL of the document and see the current recording state). We can't
  // store that directly in the service worker as it may be terminated while
  // recording is in progress. We could write it to storage but that slightly
  // increases the risk of things getting out of sync.
  window.location.hash = "recording"
}

async function stopRecording() {
  recorder.stop()

  // Stopping the tracks makes sure the recording icon in the tab is removed.
  recorder.stream.getTracks().forEach((t) => t.stop())

  // Update current state in URL
  window.location.hash = ""

  // Note: In a real extension, you would want to write the recording to a more
  // permanent location (e.g IndexedDB) and then close the offscreen document,
  // to avoid keeping a document around unnecessarily. Here we avoid that to
  // make sure the browser keeps the Object URL we create (see above) and to
  // keep the sample fairly simple to follow.
}
