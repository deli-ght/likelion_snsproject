const getEmailValue = document.querySelector(".inp-login-email")
const getPwValue = document.querySelector(".inp-login-pw")
const btnLogin = document.querySelector(".btn-login")
const valid = document.querySelector(".txt-validation")
let errorMessage = ""

function checkIsProperLength() {
  if (getEmailValue.value.length >= 1 && getPwValue.value.length >= 1) {
    return true
  }
  return false
}

function toggleClassOn() {
  if (checkIsProperLength()) {
    btnLogin.classList.add("on")
  } else if (!checkIsProperLength()) {
    btnLogin.classList.remove("on")
  }
}

async function login() {
  const res = await fetch("https://mandarin.cf/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: getEmailValue.value,
        password: getPwValue.value,
      },
    }),
  })
  const json = await res.json()
  console.log(json)
  errorMessage = json.message
  valid.textContent = errorMessage
  localStorage.setItem("token", json.user.token)
  const data = json.user._id
  if (data) {
    alert("로그인")
  }
}

btnLogin.addEventListener("click", login)
