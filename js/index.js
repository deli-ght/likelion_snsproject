// camelCase
const token = localStorage.getItem("token")
const splash = document.querySelector('.splash')

if(token) {
    $('.splash').fadeOut(1000);
    setTimeout(function() {
        location.href = './home-feed.html'
      }, 1000);
}
else {
    $('.splash').fadeOut(1000);
    setTimeout(function() {
        location.href = './login.html'
      }, 1000);
}
