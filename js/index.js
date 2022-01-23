// camelCase
const token = localStorage.getItem("token")
const splash = document.querySelector(".splash")

if (token) {
  $(".splash").fadeOut(1000)
  setTimeout(function () {
    location.href = "./pages/home-feed.html"
  }, 1000)
} else {
  $(".splash").fadeOut(1000)
  setTimeout(function () {
    location.href = "./pages/login.html"
  }, 1000)
}
