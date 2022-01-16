const getEmailValue = document.querySelector(".inp-login-email");
const getPwValue = document.querySelector(".inp-login-pw");
const btnLogin = document.querySelector(".btn-login");
const valid = document.querySelector(".txt-validation");
let errorMessage = "";

function checkIsProperLength() {
  if (getEmailValue.value.length >= 1 && getPwValue.value.length >= 1) {
    return true;
  }
  return false;
}

function toggleClassOn() {
  if (checkIsProperLength()) {
    btnLogin.classList.add("on");
  } else if (!checkIsProperLength()) {
    btnLogin.classList.remove("on");
  }
}

async function login() {
  const res = await fetch("http://146.56.183.55:5050/user/login", {
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
  });
  const json = await res.json();
  console.log(json);
  if (json.status === 422) {
    errorMessage = json.message;
    valid.textContent = errorMessage;
  } else {
    alert(`${json.user.username}님 로그인 성공하셨습니다.`);
    localStorage.setItem("token", json.user.token);
    localStorage.setItem("accountName", json.user.accountname);
    console.log(localStorage);
    location.href = "./home-feed.html";
  }
}

btnLogin.addEventListener("click", login);
