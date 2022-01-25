import * as Global from "./global.js";
import Swiper from "https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js";

// variables
let clickCnt = 0,
  clickTimer;
let loadFeedCnt = 0;
let clickPostId = "";
const postModal = document.querySelector("#post-modal");
const alert = document.querySelector("#alert");
const postContainer = document.querySelector(".cont-post");

// functions
export const init = (check = false) => {
  console.log("home", check);
  if (!check) {
    localStorage.setItem("currentUser", "");
  }
  Global.setInit();
  Global.getUserPosts(10, 0, check)
    .then((postObj) => {
      if (postObj.post) {
        if (postObj.post.length > 0) {
          setPostElements(postObj.post);
        }
      } else {
        if (postObj.posts.length > 0) {
          setPostElements(postObj.posts);
        } else {
          location.href = "home-none.html";
        }
      }
    })
    .then(() => swiperSetting(loadFeedCnt));
};

const swiperSetting = () => {
  const sliders = Array.from(document.querySelectorAll(".swiper")).slice(
    loadFeedCnt * 10
  );
  const paginations = Array.from(
    document.querySelectorAll(".swiper-pagination")
  ).slice(loadFeedCnt * 10);

  sliders.forEach((slider, index) => {
    const swiper = new Swiper(slider, {
      direction: "horizontal",
      spaceBetween: 30,
      observer: true,
      observeParents: true,
      pagination: {
        el: paginations[index],
        clickable: true,
      },
    });
  });
};

const setPostElements = (posts) => {
  const postContainer = document.querySelector(".cont-post");

  posts.forEach((post) => {
    const hiddenId = document.createElement("input");
    hiddenId.setAttribute("type", "hidden");
    hiddenId.value = post.id;
    const article = document.createElement("article");
    article.classList.add("home-post");

    const userInfo = document.createElement("div");
    userInfo.classList.add("user-search");
    const profile = document.createElement("img");
    profile.classList.add("img-profile");
    profile.src = post.author.image; // 테스트용

    const wrapText = document.createElement("div");
    wrapText.classList.add("wrap-txt");
    const title = document.createElement("strong");
    title.classList.add("txt-title");
    title.textContent = post.author.username;
    const nickname = document.createElement("span");
    nickname.classList.add("txt-nickname");
    nickname.textContent = `@ ${post.author.accountname}`;
    const userMoreBtn = document.createElement("button");
    userMoreBtn.classList.add("btn-more");
    userMoreBtn.addEventListener("click", () => {
      postMoreBtnClickHandler(post.author.accountname);
    });

    wrapText.append(title, nickname);
    userInfo.append(profile, wrapText, userMoreBtn);

    const wrapContent = document.createElement("div");
    wrapContent.classList.add("wrap-content");
    const txtContent = document.createElement("p");
    txtContent.classList.add("txt-content");
    txtContent.textContent = post.content;

    const swiper = document.createElement("div");
    swiper.classList.add("swiper");
    const previewContainer = document.createElement("div");
    // previewContainer.classList.add("cont-preview");
    previewContainer.classList.add("swiper-wrapper");

    // 콘텐츠 이미지 생성하기
    if (post.image) {
      const imgArr = post.image.split(",");
      imgArr.forEach((filename) => {
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");

        imgContainer.classList.add("cont-img");
        imgContainer.classList.add("swiper-slide");
        img.classList.add("img-preview");
        img.src = filename;

        imgContainer.appendChild(img);
        previewContainer.appendChild(imgContainer);
      });
    }
    const pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");

    swiper.append(previewContainer, pagination);

    const btnUl = document.createElement("ul");
    btnUl.classList.add("ul-btns");
    const btnLi1 = document.createElement("li");
    btnLi1.classList.add("li-btn");
    const btnLike = document.createElement("button");
    btnLike.classList.add("btn-likes");
    if (post.hearted) btnLike.classList.add("on");
    const txtLike = document.createElement("span");
    txtLike.classList.add("txt-likes");
    txtLike.textContent = post.heartCount;
    const btnLi2 = document.createElement("li");
    btnLi2.classList.add("li-btn");
    const btnComment = document.createElement("button");
    btnComment.classList.add("btn-comments");
    const txtComment = document.createElement("span");
    txtComment.classList.add("txt-comments");
    txtComment.textContent = post.commentCount;

    btnLi1.append(btnLike, txtLike);
    btnLi2.append(btnComment, txtComment);
    btnUl.append(btnLi1, btnLi2);

    const txtDate = document.createElement("p");
    txtDate.classList.add("txt-date");
    txtDate.textContent = Global.formatDate(post.createdAt);

    wrapContent.append(txtContent, swiper, btnUl, txtDate);
    article.append(userInfo, wrapContent);

    article.addEventListener("click", (e) => {
      const currentTarget = e.currentTarget;
      const target = e.target;
      clickPostId = hiddenId.value;
      clickCnt += 1;
      if (clickCnt === 1) {
        clickTimer = setTimeout(() => {
          clickCnt = 0;
          postClickHandler(target, currentTarget, clickPostId);
        }, 400);
      } else if (clickCnt === 2) {
        clearTimeout(clickTimer);
        clickCnt = 0;
        postDblClickHandler(target, currentTarget, clickPostId);
      }
    });

    postContainer.append(article);
  });
};

const setLike = (postId, currentTarget) => {
  const likeBtn = currentTarget.querySelector(".btn-likes");
  const isLike = likeBtn.classList.contains("on") ? false : true;

  if (isLike) {
    likeBtn.animate(
      [
        //keyframes
        { transform: "scale(1)" },
        { transform: "scale(1.2)" },
        { transform: "scale(1)" },
      ],
      {
        // timing options
        duration: 500,
        easing: "linear",
      }
    );
  } else {
    likeBtn.animate(
      [
        //keyframes
        { transform: "scale(1)" },
        { transform: "scale(1.2)" },
        { transform: "scale(1)" },
      ],
      {
        // timing options
        duration: 500,
        easing: "linear",
      }
    );
  }

  Global.postLike(postId, isLike)
    .then((data) => {
      likeBtn.classList.toggle("on");
      currentTarget.querySelector(".txt-likes").textContent =
        data.post.heartCount;
    })
    .catch(console.error);
};

// event handlers
const postClickHandler = (target, currentTarget, postId) => {
  if (
    target.classList.contains("txt-content") ||
    target.classList.contains("btn-comments") ||
    target.classList.contains("img-preview")
  ) {
    localStorage.setItem("postId", postId);
    location.href = "./post.html";
  }

  if (target.classList.contains("btn-likes")) {
    setLike(postId, currentTarget);
  }
};

const postDblClickHandler = (target, currentTarget, postId) => {
  const parent = target.parentElement;
  if (
    parent.classList.contains("wrap-content") ||
    parent.classList.contains("cont-img")
  ) {
    setLike(postId, currentTarget);
  }
};

const postMoreBtnClickHandler = (postUserId) => {
  if (postUserId === Global.LOGIN_ACCOUNT_NAME) {
    postModal.querySelector(".btn-report").classList.add("off");
    postModal.querySelector(".btn-delete").classList.remove("off");
    postModal.querySelector(".btn-modify").classList.remove("off");
  } else {
    postModal.querySelector(".btn-report").classList.remove("off");
    postModal.querySelector(".btn-delete").classList.add("off");
    postModal.querySelector(".btn-modify").classList.add("off");
  }

  postModal.classList.add("show-modal");
};

const postModalClickHandler = (e) => {
  const title = alert.querySelector(".p-check");
  const action = alert.querySelector(".p-action");

  if (e.target.classList.contains("post-modal")) {
    postModal.classList.remove("show-modal");
  }

  if (e.target.classList.contains("btn-delete")) {
    alert.classList.add("show");
    title.textContent = "게시물을 삭제 하시겠습니까?";
    action.textContent = "삭제";
    action.addEventListener("click", postDeleteClickHandler);
  }
  if (e.target.classList.contains("btn-report")) {
    console.log("신고");
    alert.classList.add("show");
    title.textContent = "게시물을 신고 하시겠습니까?";
    action.textContent = "신고";
  }
};

const postScrollHandler = () => {
  const isEndReached =
    parseInt(postContainer.scrollHeight - postContainer.scrollTop) <=
    parseInt(postContainer.clientHeight);

  if (isEndReached) {
    loadFeedCnt += 1;

    Global.getUserPosts(10, 10 * loadFeedCnt)
      .then((postObj) => {
        if (postObj.post) {
          if (postObj.post.length > 0) {
            setPostElements(postObj.post);
          }
        } else {
          if (postObj.posts.length > 0) {
            setPostElements(postObj.posts);
          } else {
            // location.href = "home-none.html";
          }
        }
      })
      .then(() => swiperSetting(loadFeedCnt));
  }
};

const postDeleteClickHandler = (e) => {
  console.log(clickPostId);

  Global.deletePost(clickPostId)
    .then((data) => {
      alert.querySelector(".p-cancle").click();
      location.reload();
    })
    .catch(console.error);
};

// event listeners
alert.querySelector(".p-cancle").addEventListener("click", () => {
  alert.classList.remove("show");
  postModal.classList.remove("show-modal");
});
postContainer.addEventListener("scroll", postScrollHandler);
postModal.addEventListener("click", postModalClickHandler);
