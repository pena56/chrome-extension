console.log(
  "The HelpMeOut browser extension connects to dev tools to help you log web application bugs."
)

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
      <button id="pause-recording" class="btn">
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
    
      <button id="stop-recording" class="btn">
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

const createPreviewElement = () => {
  const previewContainer = document.createElement("div")
  previewContainer.classList.add("overlay")

  previewContainer.innerHTML = `
    <div class="overlay_content">
    <button id="closePreview" class="close_button">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9997 37.4166C10.3925 37.4166 2.58301 29.6071 2.58301 19.9999C2.58301 10.3927 10.3925 2.58325 19.9997 2.58325C29.6069 2.58325 37.4163 10.3927 37.4163 19.9999C37.4163 29.6071 29.6069 37.4166 19.9997 37.4166ZM19.9997 4.08325C11.2235 4.08325 4.08301 11.2238 4.08301 19.9999C4.08301 28.7761 11.2235 35.9166 19.9997 35.9166C28.7758 35.9166 35.9163 28.7761 35.9163 19.9999C35.9163 11.2238 28.7758 4.08325 19.9997 4.08325Z"
          fill="#292D32"
          stroke="#120B48"
        />
        <path
          d="M15.8127 25.2465L15.8066 25.2526L15.8007 25.2589C15.6772 25.3913 15.485 25.4668 15.2829 25.4668C15.0917 25.4668 14.9045 25.3978 14.7532 25.2465C14.4651 24.9585 14.4651 24.4751 14.7532 24.187L24.1865 14.7537C24.4746 14.4656 24.958 14.4656 25.2461 14.7537C25.5341 15.0417 25.5341 15.5251 25.2461 15.8132L15.8127 25.2465Z"
          fill="#292D32"
          stroke="#120B48"
        />
        <path
          d="M24.7163 25.4668C24.5251 25.4668 24.3378 25.3978 24.1865 25.2465L14.7532 15.8132C14.4651 15.5251 14.4651 15.0417 14.7532 14.7537C15.0412 14.4656 15.5247 14.4656 15.8127 14.7537L25.2461 24.187C25.5341 24.4751 25.5341 24.9585 25.2461 25.2465C25.0948 25.3978 24.9075 25.4668 24.7163 25.4668Z"
          fill="#292D32"
          stroke="#120B48"
        />
      </svg>
    </button>
    <div class="video_container">
      <video controls>
        <source id="videoSource" type="video/webm" />
      </video>
    </div>

    <div class="overlay_actions">
      <input
        type="text"
        value="Untitled_949767848"
        placeholder="Video Name"
        id="videoTitle"
      />

      <button id="sendVideo" class="save_btn">Save Video</button>
    </div>
  </div>
    `

  return previewContainer
}

let recorder
let data = []

function onAccessApproved(stream) {
  ;(async () => {
    const response = await chrome.runtime.sendMessage({
      startedRecording: true,
      document: document,
    })
    // do something with response here, not outside the function
    // console.log(response)
  })()

  const controller = createControllerElement()
  const previewWindow = createPreviewElement()

  document.body.appendChild(controller)

  let intervalId
  let seconds = 0
  let minutes = 0
  let hours = 0

  function updateCounter() {
    seconds++
    if (seconds >= 60) {
      seconds = 0
      minutes++
      if (minutes >= 60) {
        minutes = 0
        hours++
        if (hours >= 24) {
          hours = 0
        }
      }
    }

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    document.getElementById("counter").textContent = formattedTime
  }

  intervalId = setInterval(updateCounter, 1000)

  updateCounter()

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" })

  let lastSentBlobChunk

  recorder.ondataavailable = (event) => {
    data.push(event.data)

    console.log(
      "At this point, this blob chunk will be sent to the backend",
      event.data
    )

    console.log(
      "After successfully sending this chunk, a variable is updated to hold the just sent blob"
    )
  }
  recorder.onstop = () => {
    clearInterval(intervalId)
    document.body.removeChild(controller)
    document.body.appendChild(previewWindow)

    // video preview controls
    const videoElement = document.getElementById("videoSource")
    const closePreviewBtn = document.getElementById("closePreview")
    const videoTitleInput = document.getElementById("videoTitle")
    const sendBtn = document.getElementById("sendVideo")

    closePreviewBtn.addEventListener("click", () => {
      document.body.removeChild(previewWindow)
    })

    stream.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop()
      }
    })

    const blob = new Blob(data, { type: "video/webm" })
    const videoURL = URL.createObjectURL(blob)

    videoElement.src = videoURL

    sendBtn.addEventListener("click", () => {
      console.log(
        "When the user clicks on the send button, the last blob chunk is compared with the array of blobs to ensure all blobs were sent. If all blobs were sent. Then the complete upload endpoint is called with the video title",
        videoTitleInput.value,
        "and this is the data "
      )

      console.log("Here's the blob array that was generated.", data)

      console.log("But for now Im just going to download to my pc")

      let a = document.createElement("a")

      a.style.display = "none"
      a.href = videoURL
      a.download = "screen-recording.webm"

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      URL.revokeObjectURL(videoURL)
    })

    // window.open(videoURL, "_blank")

    // Clear state ready for next recording
    recorder = undefined
    data = []
  }

  const stopBtn = document.getElementById("stop-recording")
  const pauseBtn = document.getElementById("pause-recording")

  stopBtn.addEventListener("click", () => {
    recorder.stop()
  })

  //   pauseBtn.addEventListener("click", () => {
  //     recorder.pause()
  //   })

  recorder.start(30000)
}

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "request_recording") {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          width: 99999999999,
          height: 99999999999,
        },
      })
      .then((stream) => {
        stream.getTracks().forEach((track) => {
          console.log(track)
        })
        onAccessApproved(stream)
      })
  } else if (request.action === "record_current_tab") {
    console.log("this is for active tab recording")
  }
})
