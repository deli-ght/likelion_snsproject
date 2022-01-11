const primaryIdRegex = /[^a-zA-Z0-9_!.$]/g
const previewImage = document.querySelector(".img-basic")
const inputImage = document.querySelector("#profile-file")
const userName = document.querySelector('.inp-name')
const primaryId = document.querySelector('.inp-priId')
const userIntro = document.querySelector('.inp-intro')
const validNameText = document.querySelector('.txt-name-validation')
const validpriIdText = document.querySelector('.txt-pri-validation')
const validIntroText = document.querySelector('.txt-intro-validation')

const uploadButton = document.querySelector('.btn-upload')

function checkNameInput() {
    try {
        if (userName.value.length <= 0) {
            throw '필수입력 란입니다.'
        }
    } catch (error) {
        validNameText.textContent = `${error}`
        return false
    }
    validNameText.textContent = ''
    return true
}

function checkIntroInput() {
    try {
        if (userIntro.value.length <= 0) {
            throw '필수입력 란입니다.'
        }
    } catch (error) {
        validIntroText.textContent = `${error}`
        return false
    }
    validIntroText.textContent = ''
    return true
}

function checkIsProperId() {
    try {
        if (primaryId.value.length <= 0) {
            throw '필수 입력란입니다.'
        }
        if (primaryIdRegex.test(primaryId.value)) {
            throw '알맞은 계정아이디가 아닙니다.'
        }
    } catch (error) {
        validpriIdText.textContent = `${error}`
        return false
    }
    validpriIdText.textContent = ''
    return true
}

function toggleClassOn() {
    if (checkNameInput() && checkIntroInput() && checkIsProperId()) {
        uploadButton.classList.add('on')
        uploadButton.disabled = false;
    } else {
        uploadButton.classList.remove('on')
    }
}

async function updateProfile(file) {
    const res = await fetch("http://146.56.183.55:5050/user", {
        method: "PUT",
        headers: {
            "Authorization" : "Bearer key",
            "Content-type" : "application / json"
        },
        body : JSON.stringify({
            "user": {
                "username": userName.value,
                "accountname": primaryId.value,
                "intro": userIntro.value,
                "image": file[0].filename,
            }
        })
    });
    const json = await res.json();
    console.log(json)
}

uploadButton.addEventListener('click', async function() {
    const srcImg = previewImage.src.split('/')
    basicImg = srcImg[srcImg.length - 1]
    if (!inputImage.files[0]) {
        let list = new DataTransfer();
        let file = new File(["name"], basicImg);
        list.items.add(file);
        let myFileList = list.files;
        inputImage.files = myFileList
    }
    var formData = new FormData();
    formData.append('image', inputImage.files[0])
    await fetch('http://146.56.183.55:5050/image/uploadfiles', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(file => updateProfile(file))
})

userName.addEventListener('blur', toggleClassOn);
userIntro.addEventListener('blur', toggleClassOn);
primaryId.addEventListener('blur', toggleClassOn);

function readImage(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (event) => {
            const previewImage = document.querySelector(".img-basic")
            previewImage.src = event.target.result
        }
        reader.readAsDataURL(input.files[0])
    }
}

inputImage.addEventListener("change", (event) => {
    readImage(event.target)
})