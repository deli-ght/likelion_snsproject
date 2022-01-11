const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}/i
const primaryIdRegex = /[^a-zA-Z0-9_!.$]/g

const joinForm = document.querySelector('.join-form')
const getEmailValue = document.querySelector('.inp-join-email')
const getPwValue = document.querySelector('.inp-join-pw')
const validEmailText = document.querySelector('.txt-email-validation')
const validPwText = document.querySelector('.txt-pw-validation')
const btnNext = document.querySelector('.btn-next')

const userContainer = document.querySelector('.user-info')
const previewImage = document.querySelector(".img-basic")
const inputImage = document.querySelector("#profile-file")
const userName = document.querySelector('.inp-name')
const primaryId = document.querySelector('.inp-priId')
const userIntro = document.querySelector('.inp-intro')
const validNameText = document.querySelector('.txt-name-validation')
const validpriIdText = document.querySelector('.txt-pri-validation')
const validIntroText = document.querySelector('.txt-intro-validation')
const startButton = document.querySelector('.btn-start')


function checkIsProperRegex() {
    try {
        if (!emailRegex.test(getEmailValue.value)) {
            throw '알맞은 이메일 형식이 아닙니다.'
        }
    } catch (error) {
        validEmailText.textContent = `${error}`
        return false
    } 
    validEmailText.textContent = ''
    return true
}

function checkIsProperPwLength() {
    try {
        if (!(getPwValue.value && getPwValue.value.length >= 6)) {
            throw '비밀번호는 6자 이상 입력해주세요.'
        }
    } catch (error) {
        validPwText.textContent = `${error}`
        return false
    }
    validPwText.textContent = ''
    return true
}

function joinToggleClassOn() {
    if (checkIsProperRegex() && checkIsProperPwLength()) {
        btnNext.classList.add('on')
        btnNext.disabled = false;
    } else {
        btnNext.classList.remove('on')
    }
}

function goUserInfo() {
    if (checkIsProperRegex() && checkIsProperPwLength()) {
        joinForm.classList.toggle('hide-on')
        userContainer.classList.toggle('hide-on')
    } 
    else {
        return
    }
}   

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
        startButton.classList.add('on')
        startButton.disabled = false;
    } else {
        startButton.classList.remove('on')
    }
}

async function joinMemberShip(file) {
    const res = await fetch("http://146.56.183.55:5050/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            "user": {
                "email": getEmailValue.value,
                "password": getPwValue.value,
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

startButton.addEventListener('click', async function() {
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
    .then(file => joinMemberShip(file))
})

getEmailValue.addEventListener('blur', joinToggleClassOn)
getPwValue.addEventListener('blur', joinToggleClassOn)
btnNext.addEventListener('click', goUserInfo)
userName.addEventListener('blur', toggleClassOn);
userIntro.addEventListener('blur', toggleClassOn);
primaryId.addEventListener('blur', toggleClassOn);

function readImage(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (event) => {
            previewImage.src = event.target.result
        }
                reader.readAsDataURL(input.files[0])
            }
        }
        
        inputImage.addEventListener("change", (event) => {
            readImage(event.target)
        })