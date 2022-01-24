import { Follow, Unfollow } from "./follow.js"

const TEST_TOKEN = "Bearer " + localStorage.getItem("token")
const URL = "https://146.56.183.55:5050"

const GET_HEADER = new Headers({
  Authorization: TEST_TOKEN,
  "Content-type": "application/json",
})

const getUserInfo = async () => {
  let username = localStorage.getItem("currentUser")
  const response = await fetch(
    `${URL}/profile/${username}/following?limit=1000`,
    {
      method: "GET",
      headers: GET_HEADER,
    }
  )

  const data = await response.json()
  return data
}

const showFollowings = async () => {
  let result = await getUserInfo()
  let myid = localStorage.getItem("id")
  const main = document.querySelector(".main-result")
  main.innerHTML = ""
  result.forEach((r) => {
    let newResult = document.createElement("div")
    newResult.classList.add("user-search")
    newResult.addEventListener("click", () => movePage(r.accountname))
    newResult.innerHTML = `
    <img src=${
      r.image ? r.image : "../src/basic-profile.png"
    } alt="사용자 프로필사진" onerror="checkImgErr(this)" class="img-profile">
    <div class="wrap-txt">
      <strong class="txt-title">${r.username}</strong>
      <span class="txt-nickname">@ ${r.accountname}</span>
    </div>`
    if (r._id != myid) {
      let followBtn = document.createElement("button")
      followBtn.setAttribute("type", "button")
      followBtn.classList.add("btn-button", "btn-small", "btn-follow")
      if (r.follower.includes(myid)) {
        followBtn.classList.add("btn-disabled")
        followBtn.textContent = "언팔로우"
        followBtn.addEventListener("click", (e) => Unfollow(e, r.accountname))
      } else {
        followBtn.classList.remove("btn-disabled")
        followBtn.textContent = "팔로우"
        followBtn.addEventListener("click", (e) => Follow(e, r.accountname))
      }
      newResult.appendChild(followBtn)
    }
    main.appendChild(newResult)
  })
}

function movePage(accountName) {
  localStorage.setItem("currentUser", accountName)
  location.href = "../pages/yourprofile.html"
}

showFollowings()
