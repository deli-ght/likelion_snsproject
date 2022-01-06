const menu = document.querySelector(".btn-vertical")
const modal = document.querySelector(".post-modal")

function showModal() {
  modal.classList.toggle("show-modal")
}

menu.addEventListener("click", showModal)

const chatroom = document.querySelector(".main-chat")
const submitBtn = document.querySelector(".btn-submit")

submitBtn.addEventListener("click", sendMessage)

let inputMsg = document.querySelector(".input-text")

function sendMessage() {
  inputMsg = document.querySelector(".input-text")
  const newMsg = document.createElement("div")
  newMsg.classList.add("msg-my")

  let data = new Date()
  if (inputMsg.value != "") {
    newMsg.innerHTML = `
  <div class="msg-mycontainer">
  <p class="msg-mycontent"> ${inputMsg.value}</p>
  <span class="msg-mytime">${data.getHours()}:${data.getMinutes()}</span>
</div>
  `
    chatroom.appendChild(newMsg)
    // const sendMsg = document
    //   .querySelector(".msg-my")
    //   .focus({ preventScroll: false })
    inputMsg.value = ""
  }
}

inputMsg.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault()
    submitBtn.click()
  }
})
