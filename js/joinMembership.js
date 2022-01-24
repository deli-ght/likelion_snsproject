const emailRegex =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}/i
const primaryIdRegex = /[^a-zA-Z0-9_!.$]/g

const joinForm = document.querySelector(".join-form")
const getEmailValue = document.querySelector(".inp-join-email")
const getPwValue = document.querySelector(".inp-join-pw")
const validEmailText = document.querySelector(".txt-email-validation")
const validPwText = document.querySelector(".txt-pw-validation")
const btnNext = document.querySelector(".btn-next")

const userContainer = document.querySelector(".user-info")
const previewImage = document.querySelector(".img-basic")
const inputImage = document.querySelector("#profile-file")
const userName = document.querySelector(".inp-name")
const primaryId = document.querySelector(".inp-priId")
const userIntro = document.querySelector(".inp-intro")
const validNameText = document.querySelector(".txt-name-validation")
const validpriIdText = document.querySelector(".txt-pri-validation")
const validIntroText = document.querySelector(".txt-intro-validation")
const startButton = document.querySelector(".btn-start")

function checkIsProperRegex() {
  try {
    if (!emailRegex.test(getEmailValue.value)) {
      throw "알맞은 이메일 형식이 아닙니다."
    }
  } catch (error) {
    validEmailText.textContent = `${error}`
    return false
  }
  validEmailText.textContent = ""
  return true
}

function checkIsProperPwLength() {
  try {
    if (!(getPwValue.value && getPwValue.value.length >= 6)) {
      throw "비밀번호는 6자 이상 입력해주세요."
    }
  } catch (error) {
    validPwText.textContent = `${error}`
    return false
  }
  validPwText.textContent = ""
  return true
}

function joinToggleClassOn() {
  if (checkIsProperRegex() && checkIsProperPwLength()) {
    btnNext.classList.add("on")
    btnNext.disabled = false
  } else {
    btnNext.classList.remove("on")
  }
}

function goUserInfo(json) {
  if (json.message === "사용 가능한 이메일 입니다.") {
    if (checkIsProperRegex() && checkIsProperPwLength()) {
      joinForm.classList.toggle("hide-on")
      userContainer.classList.toggle("hide-on")
    } else {
      return
    }
  } else {
    return
  }
}

async function emailValid() {
  try {
    const res = await fetch("https://mandarin.cf/user/emailvalid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: getEmailValue.value,
        },
      }),
    })
    const json = await res.json()
    console.log(json)
    console.log(json.message)
    if (json.message === "사용 가능한 이메일 입니다.") {
      goUserInfo(json)
    } else {
      validPwText.textContent = "이미 가입된 이메일 주소 입니다."
    }
  } catch (err) {
    alert(err)
  }
}

function checkNameInput() {
  try {
    if (userName.value.length <= 0) {
      throw "필수입력 란입니다."
    }
  } catch (error) {
    validNameText.textContent = `${error}`
    return false
  }
  validNameText.textContent = ""
  return true
}

function checkIntroInput() {
  try {
    if (userIntro.value.length <= 0) {
      throw "필수입력 란입니다."
    }
  } catch (error) {
    validIntroText.textContent = `${error}`
    return false
  }
  validIntroText.textContent = ""
  return true
}

function checkIsProperId() {
  try {
    if (primaryId.value.length <= 0) {
      throw "필수 입력란입니다."
    }
    if (primaryIdRegex.test(primaryId.value)) {
      throw "알맞은 계정아이디가 아닙니다."
    }
  } catch (error) {
    validpriIdText.textContent = `${error}`
    return false
  }
  validpriIdText.textContent = ""
  return true
}

function toggleClassOn() {
  if (checkNameInput() && checkIntroInput() && checkIsProperId()) {
    startButton.classList.add("on")
    startButton.disabled = false
  } else {
    startButton.classList.remove("on")
  }
}

getEmailValue.addEventListener("blur", joinToggleClassOn)
getPwValue.addEventListener("blur", joinToggleClassOn)
btnNext.addEventListener("click", emailValid)
userName.addEventListener("blur", toggleClassOn)
userIntro.addEventListener("blur", toggleClassOn)
primaryId.addEventListener("blur", toggleClassOn)

async function imageUpload(files) {
  const formData = new FormData()
  formData.append("image", files[0])
  const res = await fetch(`https://mandarin.cf/image/uploadfile`, {
    method: "POST",
    body: formData,
  })
  const data = await res.json()
  const productImgName = data["filename"]
  return productImgName
}

async function profileImage(e) {
  const files = e.target.files
  const result = await imageUpload(files)
  previewImage.src = "https://mandarin.cf/" + result
}
inputImage.addEventListener("change", profileImage)

async function join() {
  const imageUrl = document.querySelector(".img-basic").src
  try {
    const res = await fetch("https://mandarin.cf/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: getEmailValue.value,
          password: getPwValue.value,
          username: userName.value,
          accountname: primaryId.value,
          intro: userIntro.value,
          image: imageUrl,
        },
      }),
    })
    const json = await res.json()
    if (res.status === 200) {
      location.href = "./login.html"
    } else {
      console.log(json)
    }
  } catch (err) {
    alert(err)
  }
}
startButton.addEventListener("click", join)
