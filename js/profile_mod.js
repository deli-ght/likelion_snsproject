const primaryIdRegex = /[^a-zA-Z0-9_!.$]/g
const previewImage = document.querySelector(".img-basic")
const inputImage = document.querySelector("#profile-file")
const userName = document.querySelector(".inp-name")
const primaryId = document.querySelector(".inp-priId")
const userIntro = document.querySelector(".inp-intro")
const validNameText = document.querySelector(".txt-name-validation")
const validpriIdText = document.querySelector(".txt-pri-validation")
const validIntroText = document.querySelector(".txt-intro-validation")

const backButton = document.querySelector(".btn-back")
const uploadButton = document.querySelector(".btn-upload")

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
    uploadButton.classList.add("on")
    uploadButton.disabled = false
  } else {
    uploadButton.classList.remove("on")
  }
}

userName.addEventListener("blur", toggleClassOn)
userIntro.addEventListener("blur", toggleClassOn)
primaryId.addEventListener("blur", toggleClassOn)

async function imageUpload(files) {
  const formData = new FormData()
  formData.append("image", files[0])
  const res = await fetch(`https://mandarin.api.weniv.co.kr/image/uploadfile`, {
    method: "POST",
    body: formData,
  })
  const data = await res.json()
  const productImgName = data["filename"]
  uploadButton.disabled = false
  uploadButton.classList.add("on")
  return productImgName
}

async function profileImage(e) {
  const files = e.target.files
  const result = await imageUpload(files)
  previewImage.src = "https://mandarin.api.weniv.co.kr/" + result
}

inputImage.addEventListener("change", profileImage)

async function updateProfile() {
  const imageUrl = document.querySelector(".img-basic").src
  const token = localStorage.getItem("token")
  localStorage.setItem("accountName", primaryId.value)
  const res = await fetch(`https://mandarin.api.weniv.co.kr/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: userName.value,
        accountname: primaryId.value,
        intro: userIntro.value,
        image: imageUrl,
      },
    }),
    //   })
  }).then((location.href = "./myprofile.html"))
  const json = await res.json()
  console.log("11111", userName.value)
}

// accoutname 중복 검증
async function isCheckDuplicatedId() {
  const primaryId = document.querySelector(".inp-priId")
  const accountName = localStorage.getItem("accountName")
  if (primaryId.value !== accountName) {
    try {
      const res = await fetch(
        "https://mandarin.api.weniv.co.kr/user/accountnamevalid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              accountname: primaryId.value,
            },
          }),
        },
      )
      const json = await res.json()
      console.log(json)
      console.log(json.message)
      if (json.message === "사용 가능한 계정ID 입니다.") {
        updateProfile()
      } else {
        validpriIdText.textContent = "이미 가입된 계정ID 입니다."
      }
    } catch (err) {
      alert(err)
    }
  } else {
    updateProfile()
  }
}

function backPage() {
  location.href = "./myprofile.html"
}

backButton.addEventListener("click", backPage)
uploadButton.addEventListener("click", isCheckDuplicatedId)

// 프로필 정보 가져오기
async function getProfile() {
  const token = localStorage.getItem("token")
  const accountName = localStorage.getItem("accountName")
  const url = `https://mandarin.api.weniv.co.kr/profile/${accountName}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  })
  const json = await res.json()
  console.log("22222", json)
  primaryId.value = json.profile.accountname
  userName.value = json.profile.username
  userIntro.value = json.profile.intro
  previewImage.src = json.profile.image
}

getProfile()
