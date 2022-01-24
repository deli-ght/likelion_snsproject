const URL = "https://mandarin.cf"

const btnBack = document.querySelector("img[src='../src/icon-arrow-left.png']")
const file = document.querySelector(".input-imgbox")
const body = document.querySelector("body")

// 뒤로가기
btnBack.addEventListener("click", () => {
  history.back()
})

// 유효성 검사
let [check1, check2, check3] = [false, false, false]

// 상품 유효성 검사
const product = document.querySelector(".input-product")
const product_alert = document.querySelector(".span-product")
product.addEventListener("blur", (e) => {
  if (e.target.value.length < 2 || e.target.value.length > 15) {
    product_alert.textContent = "2자리 ~ 15자 이내여야 합니다."
  } else {
    product_alert.textContent = ""
    check1 = true
  }
  check()
})

// 가격 유효성 검사

const price = document.querySelector(".input-price")
const price_alert = document.querySelector(".span-price")
price.addEventListener("blur", (e) => {
  if (isNaN(e.target.value)) {
    price_alert.textContent = "숫자만 입력할 수 있습니다."
  } else if (e.target.value.length == 0) {
    price_alert.textContent = "값을 입력해주세요"
  } else {
    price_alert.textContent = ""
    check2 = true
  }
  check()
})
// 링크 유효성 검사
const link = document.querySelector(".input-link")
const link_alert = document.querySelector(".span-link")
link.addEventListener("blur", (e) => {
  if (e.target.value.length === 0) {
    link_alert.textContent = "URL을 입력해주세요."
  } else {
    link_alert.textContent = ""
    check3 = true
  }
  check()
})

// 저장버튼
const saveBtn = document.querySelector(".btn-button")
const productlength = product.value.length
const pricevalue = price.value
const linklength = link.value.length

function check() {
  if (check1 == true && check2 == true && check3 == true) {
    saveBtn.disabled = false
  } else {
    saveBtn.disabled = true
  }
}

// 이미지 업로드 및 보이기
file.addEventListener("change", (e) => {
  const selectedFile = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(selectedFile)
  reader.onload = () => {
    const showImg = body.querySelector(".div-imgbox")
    showImg.style = `background : url(${reader.result}) no-repeat center center;`
    showImg.style.backgroundSize = "100% 40vh"
  }
  showImg = selectedFile
})

async function imgApi(showImg) {
  const formdata = new FormData()
  formdata.append("image", showImg)
  const res = await fetch(`${URL}/image/uploadfile`, {
    method: "post",
    body: formdata,
  })

  const result = await res.json()
  return result["filename"]
}

// 30143:8080//img.jpg
saveBtn.onclick = async () => {
  const image = URL + "/" + (await imgApi(showImg))
  const res = await fetch(URL + "/product", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      product: {
        itemName: product.value,
        price: +price.value,
        link: link.value,
        itemImage: image,
      },
    }),
  })
  const json = await res.json()
  location.href = "../pages/myprofile.html"
}
