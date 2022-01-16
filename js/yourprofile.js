// 사용자 정보

const profiles = document.querySelector('#profiles');
const userinf = async () => {
    const res = await fetch(url+"/profile/admin",{
        headers: {
            "Authorization" : "Bearer "+localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    })
    const json = await res.json();
    profiles.innerHTML =`
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
        <p class="txt-nickname">@weniv_Mandarin</p>
        </div>

        <p class="sub_title">${json.profile.intro}</p>

        <div class="buttons">
        <img class="img-comment" src="../src/message-btn.png" alt="댓글 버튼">
        <button type="button" class="btn-follow btn-button btn-small id="foll-btn">팔로우</button>
        <img class="img-share" src="../src/share-btn.png" alt="공유 버튼">
    </div>
    `

    followerBtn = document.querySelector('.followers');
    followerBtn.addEventListener('click',() =>{
        location.href="followers.html";
    })

    // followingBtn = document.querySelector('.followings');
    // followingBtn.addEventListener('click',() =>{
    //     location.href="followings.html";
    // })

    ch()
}


// button change
async function ch(){ 
    const fo = profiles.querySelector('.btn-follow');
    fo.onclick = (e)=> {
        const btn = e.target;
        if(btn.textContent=="팔로우"){
            btn.style.backgroundColor="#fff";
            btn.textContent = "언팔로우";
            btn.style.color="#767676";
            btn.style.borderWidth="0.5px";
            btn.style.borderStyle = "solid";
            btn.style.borderColor = "#767676";

        }else{
            btn.style.backgroundColor="#F26E22";
            btn.style.color="#fff";
            btn.textContent = "팔로우"
            btn.style.borderColor = "#fff";
        }
    }
}

// 판매중인 상품
const products = document.querySelector('.products');
const url = "http://146.56.183.55:5050";
const check = async () => {
    const res = await fetch(url + "/product/admin", {
    method : "GET",
    headers:{
        "Authorization" : "Bearer "+localStorage.getItem("token"),
        "Content-Type": "application/json"
    }
    })
    const json = await res.json()
    console.log(json)
    for (const data of json.product) {
        products.innerHTML += `<li class="product">
        <img class="img-product" src="${data.itemImage}" alt="애월읍 노지 감귤">
        <p class="p-text">${data.itemName}</p>
        <p class="p-price">${data.price}원</p>
        </li> `
        
    }
    
}

// 게시글 리스트
const homepost = document.querySelector('#home-post');
const home = async () => {
    const res = await fetch(url+"/post/admin/userpost",{
        headers : {
            "Authorization" : "Bearer "+localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    })

    const json = await res.json();
    let count=1;

    const photo = document.querySelector('#photo');
    if (json.post.length ===0 ){
        photo.style.display = 'none';
    }
    else{
        photo.style.display = "block";
    }
    for (const data of json.post) {
        console.log(data)
        const date = JSON.stringify(data.updatedAt).split('-');
        homepost.innerHTML += `
        <article class="home-post">
        <div class="user-search">
        <img src="${data.author.image}" alt="사용자 프로필사진" class="img-profile">
        <div class="wrap-txt">
        <strong class="txt-title">${data.author.username}</strong>
        <span class="txt-nickname">@ weniv-Mandarin</span>
        </div>
        <button type="button" class="btn-more" value="더보기버튼"></button>
        </div>
        
        <div class="wrap-content">
        <p class="txt-content">
        ${data.content}
        </p>
        
        <div class="cont-preview">
        <div class="cont-img"><img src="../src/img-post-sample${count++}.png" class="img-preview"></div>
        </div>
        
        <ul class="ul-btns">
        <li class="li-btn">
        <button type="button" class="btn-likes"></button>
        <span class="txt-likes">${data.heartCount}</span>
        </li>
        <li class="li-btn">
        <button type="button" class="btn-comments"></button>
        <span class="txt-comments">${data.commentCount}</span>
        </li>
        </ul>
        <p class="txt-date">${date[0].slice(1,5)}년 ${date[1]}월 ${date[2].slice(1,2)}일</p>
    </div>
    </article>
  `
}
}

// 하단 탭 메뉴

const homeBtn = document.querySelector('.button-home');
const homeTxt = document.querySelector('.p-home');
const chatBtn = document.querySelector('.button-circle1');
const chatTxt = document.querySelector('.p-circle1');
const editBtn = document.querySelector('.button-edit');
const editTxt = document.querySelector('.p-edit');
const profileBtn = document.querySelector('.button-profile');
const profileTxt = document.querySelector('.p-profile');


function btnChange(btnName1,btnName2,btnName3){
    btnName1.style.color = '#767676';
    btnName2.style.color = '#767676';
    btnName3.style.color = '#767676';
}


homeBtn.addEventListener('click', () =>{
    btnChange(chatTxt,editTxt,profileTxt);
    chatBtn.style.backgroundImage = "url('../src/icon-message-circle-1.png')";
    editBtn.style.backgroundImage = "url('../src/icon-edit.png')";
    profileBtn.style.backgroundImage = "url('../src/icon-user.png')";

    homeBtn.style.backgroundImage = "url('../src/icon-home-fill.png')";
    homeTxt.style.color = '#f26e22'
})

chatBtn.addEventListener('click', () =>{
    btnChange(homeTxt,editTxt,profileTxt);
    homeBtn.style.backgroundImage = "url('../src/icon-home.png')";
    editBtn.style.backgroundImage = "url('../src/icon-edit.png')";
    profileBtn.style.backgroundImage = "url('../src/icon-user.png')";

    chatBtn.style.backgroundImage = "url('../src/icon-message-circle-fill.png')";
    chatTxt.style.color = '#f26e22'
})

editBtn.addEventListener('click', () =>{
    location.href="upload.html";
})

profileBtn.addEventListener('click', () =>{
    btnChange(homeTxt,chatTxt,editTxt);
    homeBtn.style.backgroundImage = "url('../src/icon-home.png')";
    chatBtn.style.backgroundImage = "url('../src/icon-message-circle-1.png')";
    editBtn.style.backgroundImage = "url('../src/icon-edit.png')";

    profileBtn.style.backgroundImage = "url('../src/icon-user-fill.png')";
    profileTxt.style.color = '#f26e22'
})

// 삭제
// const delet = async ()=> {
//     await fetch(url+'/product/61e257d1848431e191bb2c2b',{
//         method : "delete",
//         headers: {
//             "Authorization" : "Bearer "+localStorage.getItem("token"),
//             "Content-Type": "application/json"
//         }
//     })
// }

check();
userinf();
home();
