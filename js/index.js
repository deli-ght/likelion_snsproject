// camelCase
const token = localStorage.getItem("testToken")
console.log(token)
if(token) {
    alert('토큰이 있음! 감귤마켓 피드페이지로 이동하는 코드 입력.')
}
else {
    alert('토큰이 없음! login.html로 이동합니다.')
    location.href = './login.html'
}