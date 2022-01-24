const TEST_TOKEN = "Bearer " + localStorage.getItem("token")
const URL = "https://mandarin.cf"

const GET_HEADER = new Headers({
  Authorization: TEST_TOKEN,
  "Content-type": "application/json",
})

const getUserInfo = async () => {
  const response = await fetch(`${URL}/user`, {
    method: "GET",
    headers: GET_HEADER,
  })

  const data = await response.json()
  return data
}

const searchinput = document.querySelector(".inp-search")
const main = document.querySelector(".main-result")

const showResult = async (event) => {
  const data = await getUserInfo()
  let result = data.filter((e) => e.accountname.includes(event.target.value))
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
      <span class="txt-nickname">@ ${r.accountname.replace(
        event.target.value,
        `<span class="span_search">${event.target.value}</span>`
      )}</span>
    </div>`
    main.appendChild(newResult)
  })
}

searchinput.addEventListener("keydown", showResult)

function checkImgErr(image) {
  image.src = "../src/basic-profile.png"
}

function movePage(accountName) {
  localStorage.setItem("currentUser", accountName)
  location.href = "../pages/yourprofile.html"
}
