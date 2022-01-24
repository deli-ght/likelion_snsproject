import { Unfollow, Follow } from "./follow.js"
import { init } from "./home.js"
// 뒤로가기
const back = document.querySelector(".img-left-arrow")
back.addEventListener("click", () => {
  history.back()
})

// 사용자 정보
const profiles = document.querySelector("#profiles")
const userinf = async () => {
  const res = await fetch(
    url + "/profile/" + localStorage.getItem("currentUser"),
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  )
  const json = await res.json()

  profiles.innerHTML = `
    <div class="profile">
        <div class="followers">
        <p class="followers_count">${json.profile.followerCount}</p>
        <p class="followers_text">followers</p>
        </div>

        <img src="${json.profile.image}" alt="사용자 프로필사진" class="img-profile">

        <div class="followings">
        <p class="followings_count">${json.profile.followingCount}</p>
        <p class="followings_text">following</p>
        </div>

        </div>

        <div class="wrap-txt">
        <p class="txt-title">${json.profile.username}</p>
        <p class="txt-nickname">@${json.profile.accountname}</p>
        </div>

        <p class="sub_title">${json.profile.intro}</p>

    `
  const profileBtns = document.createElement("div") // <div></div>
  profileBtns.classList.add("buttons") // <div class = "buttons"></div>
  profileBtns.innerHTML = `<img class="img-comment" src="../src/message-btn.png" alt="댓글 버튼">`

  let followBtn = document.createElement("button") // <button/>
  followBtn.setAttribute("type", "button") //<button type="button"/>
  followBtn.classList.add("btn-button", "btn-small", "btn-follow")

  if (json.profile.follower.includes(localStorage.getItem("id"))) {
    followBtn.classList.add("btn-disabled")
    followBtn.textContent = "언팔로우"
    followBtn.addEventListener("click", (e) => {
      Unfollow(e, json.profile.accountname)
    })
  } else {
    followBtn.classList.remove("btn-disabled")
    followBtn.textContent = "팔로우"
    followBtn.addEventListener("click", (e) => {
      Follow(e, json.profile.accountname)
    })
  }
  profileBtns.appendChild(followBtn)

  const shareBtn = document.createElement("img")
  shareBtn.classList.add("img-share")
  shareBtn.src = "../src/share-btn.png"
  shareBtn.alt = "공유버튼"
  profileBtns.appendChild(shareBtn)
  profiles.appendChild(profileBtns)

  // 팔로워 이동
  const followerBtn = document.querySelector(".followers")
  followerBtn.addEventListener("click", () => {
    location.href = "followers.html"
  })

  const followingBtn = document.querySelector(".followings")
  followingBtn.addEventListener("click", () => {
    location.href = "following.html"
  })
}

// 판매중인 상품
const selling = document.querySelector("#selling")
const products = document.querySelector(".products")
const url = "https://api.mandarin.cf"

const check = async () => {
  const res = await fetch(
    url + `/product/${localStorage.getItem("currentUser")}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  )
  const json = await res.json()
  if (json.product.length === 0) {
    selling.style.display = "none"
  } else {
    selling.style.display = "block"
  }
  products.innerHTML = ""
  for (const data of json.product) {
    products.innerHTML += `<li class="product">
        <img class="img-product" src="${data.itemImage}" alt="애월읍 노지 감귤">
        <p class="p-text">${data.itemName}</p>
        <p class="p-price">${data.price}원</p>
        </li> `
  }
}

// 게시글 리스트
const homepost = document.querySelector(".cont-post")
const listBtn = document.querySelector(".img-post-list")

listBtn.addEventListener("click", () => {
  listBtn.src = "../src/icon-post-list-on.png"
  postBtn.src = "../src/icon-post-album-off.png"
  homepost.style.display = "block"
  homeAlbum.style.display = "none"
  // home()
})

// const home = async () => {
//   const res = await fetch(
//     `${url}/post/${localStorage.getItem("currentUser")}/userpost`,
//     {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       },
//     }
//   )

//   const json = await res.json()
//   const photo = document.querySelector("#photo")
//   if (json.post) {
//     photo.style.display = "none"
//   } else {
//     photo.style.display = "block"
//   }
//   homepost.innerHTML = ""

//   for (const data of json.post) {
//     const date = JSON.stringify(data.updatedAt).split("-")
//     homepost.innerHTML += `
//         <article class="home-post">
//         <div class="user-search">
//         <img src="${
//           data.author.image
//         }" alt="사용자 프로필사진" class="img-profile">
//         <div class="wrap-txt">
//         <strong class="txt-title">${data.author.username}</strong>
//         <span class="txt-nickname">@ ${data.author.accountName}</span>
//         </div>
//         <button type="button" class="btn-more" value="더보기버튼" id="${
//           data.id
//         }"></button>
//         </div>

//         <div class="wrap-content">
//         <p class="txt-content">
//         ${data.content}
//         </p>

//         <div class="cont-preview">
//         <div class="cont-img">${data.image ? `<img src=${data.image}/>` : ""}
//         </div>

//         <ul class="ul-btns">
//         <li class="li-btn">
//         <button type="button" class="btn-likes"></button>
//         <span class="txt-likes">${data.heartCount}</span>
//         </li>
//         <li class="li-btn">
//         <button type="button" class="btn-comments"></button>
//         <span class="txt-comments">${data.commentCount}</span>
//         </li>
//         </ul>
//         <p class="txt-date">${date[0].slice(1, 5)}년 ${
//       date[1]
//     }월 ${date[2].slice(1, 2)}일</p>
//     </div>
//     </article>
//   `
//   }
// }

// 앨범 3x3
const homeAlbum = document.querySelector("#posts")
const postBtn = document.querySelector(".img-post-album")
postBtn.addEventListener("click", () => {
  listBtn.src = "../src/icon-post-list-off.png"
  postBtn.src = "../src/icon-post-album-on.png"
  homeAlbum.style.display = "grid"
  homepost.style.display = "none"
  album()
})
const album = async () => {
  const res = await fetch(
    url + "/post/" + localStorage.getItem("currentUser") + "/userpost",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  )
  const json = await res.json()
  homeAlbum.innerHTML = ""
  console.log(json)
  for (const data of json.post) {
    if (data.image) {
      homeAlbum.innerHTML += `
              <li style="background: url(${
                data.image.split(",")[0]
              }) no-repeat center center/cover"></li>
          `
    }
  }
}

//로그아웃

const verticalBtn = document.querySelector(".img-vertical")
const loginfo = document.querySelector("#loginfo")
const logbar = document.querySelector(".logout-div-button")
const logoutModal = document.querySelector("#logout")
const loginfoLogout = document.querySelector(".div-logout")
const cancleBtn = document.querySelector(".p-cancle")
const logoutBtn = document.querySelector(".p-logout")

loginfo.style.display = "none"
logoutModal.style.display = "none"

verticalBtn.addEventListener("click", () => {
  loginfo.style.display = "block"
  loginfoLogout.addEventListener("click", () => {
    logoutModal.style.display = "block"
  })
  cancleBtn.addEventListener("click", () => {
    logoutModal.style.display = "none"
  })
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("currentUser")
    location.href = "../index.html"
  })
})

logbar.addEventListener("click", () => {
  loginfo.style.display = "none"
})

// 하단 탭 메뉴

const homeBtn = document.querySelector(".button-home")
const chatBtn = document.querySelector(".button-circle1")
const editBtn = document.querySelector(".button-edit")
const profileBtn = document.querySelector(".button-profile")
homeBtn.addEventListener("click", () => {
  location.href = "home-feed.html"
})

chatBtn.addEventListener("click", () => {
  location.href = "chat-list.html"
})

editBtn.addEventListener("click", () => {
  location.href = "upload.html"
})

profileBtn.addEventListener("click", () => {
  location.href = "myprofile.html"
})

check()
userinf()
// home()
init(true)
