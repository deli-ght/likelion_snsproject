import * as Global from "./global.js";
import Swiper from "https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js";

// Variables
const submitBtn = document.querySelector(".btn-submit");
const likeBtn = document.querySelector(".btn-likes");
const txtComment = document.querySelector("#comment .input-text");
const replyUl = document.querySelector(".cont-reply ul");
const commentModal = document.querySelector("#comment-modal");
const postModal = document.querySelector("#post-modal");
const homePostCont = document.querySelector(".home-post");
const backBtn = document.querySelector(".img-left-arrow");
const moreBtn = document.querySelector(".btn-more");
const alert = document.querySelector("#alert");

const postId = localStorage.getItem("postId");
let postUserId = "";

const swiper = new Swiper(".swiper", {
  direction: "horizontal", // 가로 슬라이드
  spaceBetween: 30,
  observer: true, // 추가
  observeParents: true, // 추가
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
// functions
const setLoginUserProfile = () => {
  const imgLoginUser = document.querySelector("#comment .img-basic-profile");

  Global.getUser(Global.LOGIN_ACCOUNT_NAME).then((data) => {
    imgLoginUser.src = data.profile.image;
  });
};

const setPostElements = (obj) => {
  // author
  homePostCont.querySelector(".img-profile").src = "../src/basic-profile.png"; // 테스트용
  homePostCont.querySelector(".img-profile").src = obj.post.author.image;
  homePostCont.querySelector(".txt-title").textContent =
    obj.post.author.username;
  homePostCont.querySelector(
    ".txt-nickname"
  ).textContent = `@ ${obj.post.author.accountname}`;

  //post
  if (obj.post.content)
    homePostCont.querySelector(".txt-content").textContent = obj.post.content;

  if (obj.post.hearted)
    homePostCont.querySelector(".btn-likes").classList.add("on");
  homePostCont.querySelector(".txt-likes").textContent = obj.post.heartCount;
  homePostCont.querySelector(".txt-comments").textContent =
    obj.post.commentCount;
  homePostCont.querySelector(".txt-date").textContent = Global.formatDate(
    obj.post.createdAt
  );
  // 콘텐츠 이미지 생성하기
  if (obj.post.image) {
    const imgArr = obj.post.image.split(",");
    const imgsContainer = homePostCont.querySelector(".swiper-wrapper");
    imgArr.forEach((filename) => {
      const imgContainer = document.createElement("div");
      const img = document.createElement("img");

      imgContainer.classList.add("cont-img");
      imgContainer.classList.add("swiper-slide");
      img.classList.add("img-preview");

      img.src = filename;

      imgContainer.appendChild(img);
      imgsContainer.appendChild(imgContainer);
    });
  }
};

const removeAllChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const setReplyElements = (obj) => {
  const replyUl = document.querySelector(".cont-reply ul");
  if (obj.length === 0) {
    replyUl.parentElement.classList.add("off");
  } else {
    if (replyUl.parentElement.classList.contains("off"))
      replyUl.parentElement.classList.remove("off");

    // 기존에 있던 댓글을 모두 없앰
    removeAllChildren(replyUl);

    obj.forEach((comt) => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const img = document.createElement("img");

      div.classList.add("user-reply");

      // 프로필 이미지
      // img.src = comt.author.image;
      // img.src = "../src/basic-profile.png"; // 테스트용
      img.classList.add("img-profile");
      img.src = comt.author.image;

      // 이름
      const wrapTxtEl = document.createElement("div");
      const usernameEl = document.createElement("strong");
      const afterTxt = document.createElement("span");

      wrapTxtEl.classList.add("wrap-txt");
      usernameEl.classList.add("txt-nickname");
      usernameEl.textContent = comt.author.username;
      afterTxt.classList.add("txt-after");
      afterTxt.textContent = calcAfterTime(comt.createdAt);
      wrapTxtEl.append(usernameEl, afterTxt);

      // 더보기 버튼
      const moreBtn = document.createElement("button");
      moreBtn.type = "button";
      moreBtn.classList.add("btn-more");

      // 댓글
      const comtTxt = document.createElement("p");
      comtTxt.classList.add("txt-reply");
      comtTxt.textContent = comt.content;

      div.append(img, wrapTxtEl, moreBtn, comtTxt);
      li.appendChild(div);
      replyUl.append(li);
    });
  }
};

const calcAfterTime = (createdDate) => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

  const now = new Date();
  const diffMs = now.getTime() - new Date(createdDate).getTime();

  if (diffMs >= minute && diffMs < hour) {
    return `${parseInt(diffMs / minute)}분 전`;
  } else if (diffMs >= hour && diffMs < day) {
    return `${parseInt(diffMs / hour)}시간 전`;
  } else if (diffMs >= day && diffMs < year) {
    return `${parseInt(diffMs / day)}일 전`;
  } else if (diffMs >= year) {
    return `${parseInt(diffMs / year)}년 전`;
  } else {
    return `0분 전`;
  }
};

const setComments = (postId) => {
  Global.getComments(postId).then((commentObj) => {
    let sortedCommentObj;

    commentObj.comments.length > 1
      ? (sortedCommentObj = Global.sortDescByDate(commentObj.comments))
      : (sortedCommentObj = commentObj.comments);

    document.querySelector(".txt-comments").textContent =
      commentObj.comments.length;
    setReplyElements(sortedCommentObj);
  });
};

const setLike = () => {
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

  Global.postLike(localStorage.getItem("postId"), isLike)
    .then((data) => {
      likeBtn.classList.toggle("on");
      document.querySelector(".txt-likes").textContent = data.post.heartCount;
    })
    .catch(console.error);
};

// Handlers
const submitBtnClickHandler = () => {
  const postId = localStorage.getItem("postId");
  Global.postComment(postId, txtComment.value).then(() => {
    setComments(postId);
    submitBtn.disabled = true;
    replyUl.scrollTop = 0;
  });
  txtComment.value = "";
};

const likeBtnClickHandler = () => {
  setLike();
};

const commentChangeHandler = (e) => {
  if (txtComment.value === "") {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};

const postDblClickHandler = (e) => {
  const parent = e.target.parentElement;
  if (
    parent.classList.contains("wrap-content") ||
    parent.classList.contains("cont-img")
  ) {
    setLike();
  }
};

const commentMoreBtnClickHandler = (e) => {
  const commentUserId =
    e.target.parentElement.querySelector(".txt-nickname").textContent;

  if (e.target.classList.contains("btn-more")) {
    commentModal.classList.add("show-modal");
    if (commentUserId === Global.LOGIN_ACCOUNT_NAME) {
      commentModal.querySelector(".btn-report").classList.add("off");
      commentModal.querySelector(".btn-delete").classList.remove("off");
    } else {
      commentModal.querySelector(".btn-report").classList.remove("off");
      commentModal.querySelector(".btn-delete").classList.add("off");
    }
  }
};
const postMoreBtnClickHandler = () => {
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

// EventListeners
submitBtn.addEventListener("click", submitBtnClickHandler);
likeBtn.addEventListener("click", likeBtnClickHandler);
txtComment.addEventListener("input", commentChangeHandler);
replyUl.addEventListener("click", commentMoreBtnClickHandler);
homePostCont.addEventListener("dblclick", (e) => {
  postDblClickHandler(e);
});
backBtn.addEventListener("click", () => {
  location.href = "home-feed.html";
});
moreBtn.addEventListener("click", postMoreBtnClickHandler);
postModal.addEventListener("click", (e) => {
  const title = alert.querySelector(".p-check");
  const action = alert.querySelector(".p-action");

  if (e.target.classList.contains("post-modal")) {
    postModal.classList.remove("show-modal");
  }

  if (e.target.classList.contains("btn-delete")) {
    console.log("삭제");
    alert.classList.add("show");
    title.textContent = "게시물을 삭제 하시겠습니까?";
    action.textContent = "삭제";
  }
  if (e.target.classList.contains("btn-report")) {
    console.log("신고");
    alert.classList.add("show");
    title.textContent = "게시물을 신고 하시겠습니까?";
    action.textContent = "신고";
  }
});

commentModal.addEventListener("click", (e) => {
  const title = alert.querySelector(".p-check");
  const action = alert.querySelector(".p-action");

  if (e.target.classList.contains("post-modal")) {
    commentModal.classList.remove("show-modal");
  }

  if (e.target.classList.contains("btn-delete")) {
    console.log("삭제");
    alert.classList.add("show");
    title.textContent = "댓글을 삭제 하시겠습니까?";
    action.textContent = "삭제";
  }
  if (e.target.classList.contains("btn-report")) {
    console.log("신고");
    alert.classList.add("show");
    title.textContent = "댓글을 신고 하시겠습니까?";
    action.textContent = "신고";
  }
});

alert.querySelector(".p-cancle").addEventListener("click", () => {
  alert.classList.remove("show");
});
// init
const init = () => {
  if (postId) {
    Global.getPost(postId).then((postObj) => {
      postUserId = postObj.post.author.accountname;
      setPostElements(postObj);
      // 유저 프로필 사진세팅 (댓글 인풋)
      setLoginUserProfile();

      // 댓글관련 세팅
      setComments(postObj.post.id);
    });
  }
};

init();
