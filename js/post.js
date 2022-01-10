import * as Global from "./global.js";

const getPost = async (postId) => {
  try {
    //GET /post/:post_id
    const res = await fetch(`${Global.URL}/post/${postId}`, {
      method: "GET",
      headers: Global.HEADER,
    });

    // 포스트 정보 가져오기
    const postObj = await res.json();
    setPostElements(postObj);
    setLoginUserProfile();
    // 댓글 가져오기
    getReply(postId);
  } catch (err) {
    console.error;
  }
};
const getImageUrl = (filename) => {
  return fetch(`${Global.URL}/${filename}`, {
    method: "GET",
  }).then((res) => res.url);
};

// yyyy년 mm월 dd일
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return `${year}년 ${month}월 ${day}일`;
};

const setLoginUserProfile = () => {
  const imgLoginUser = document.querySelector("#comment .img-basic-profile");

  Global.getUser(Global.LOGIN_ACCOUNT_NAME).then((data) => {
    getImageUrl(data.profile.image)
      .then((url) => (imgLoginUser.src = url))
      .catch(console.error);
  });
};

const setPostElements = (obj) => {
  const homePostCont = document.querySelector(".home-post");
  // author
  homePostCont.querySelector(".img-profile").src = "../src/basic-profile.png"; // 테스트용
  getImageUrl(obj.post.author.image)
    .then((url) => (homePostCont.querySelector(".img-profile").src = url))
    .catch(console.error);
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
  homePostCont.querySelector(".txt-date").textContent = formatDate(
    obj.post.createdAt
  );
  // 콘텐츠 이미지 생성하기
  if (obj.post.image) {
    const imgArr = obj.post.image.split(",");
    const imgsContainer = homePostCont.querySelector(".cont-preview");
    imgArr.forEach((filename) => {
      const imgContainer = document.createElement("div");
      const img = document.createElement("img");

      imgContainer.classList.add("cont-img");
      img.classList.add("img-preview");
      // 본문 이미지
      getImageUrl(filename)
        .then((url) => (img.src = url))
        .catch(console.error);

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

const sortDescByDate = (obj) => {
  return obj.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
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
      getImageUrl(comt.author.image)
        .then((url) => (img.src = url))
        .catch(console.error);

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

const getReply = async (postId) => {
  try {
    //GET /post/:post_id/comments
    const res = await fetch(`${Global.URL}/post/${postId}/comments`, {
      method: "GET",
      headers: Global.HEADER,
    });

    const replyObj = await res.json();
    let sortedReplyObj;

    replyObj.comments.length > 1
      ? (sortedReplyObj = sortDescByDate(replyObj.comments))
      : (sortedReplyObj = replyObj.comments);

    document.querySelector(".txt-comments").textContent =
      replyObj.comments.length;
    setReplyElements(sortedReplyObj);
  } catch (err) {
    console.error;
  }
};

const postComment = async (txtComment) => {
  try {
    const res = await fetch(
      `${Global.URL}/post/${Global.TEST_POST_ID}/comments`,
      {
        method: "POST",
        headers: Global.HEADER,
        body: JSON.stringify({
          comment: {
            content: txtComment,
          },
        }),
      }
    );

    getReply(Global.TEST_POST_ID);

    // const data = await res.json();
    // console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const postLike = async (postId, isLike) => {
  let action, reqMethod;
  if (isLike) {
    // like
    action = "heart";
    reqMethod = "POST";
  } else {
    // unlike
    action = "unheart";
    reqMethod = "DELETE";
  }
  try {
    const res = await fetch(`${Global.URL}/post/${postId}/${action}`, {
      method: reqMethod,
      headers: Global.HEADER,
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

// Variables
const submitBtn = document.querySelector(".btn-submit");
const likeBtn = document.querySelector(".btn-likes");
const txtComment = document.querySelector("#comment .input-text");
const replyUl = document.querySelector(".cont-reply ul");
const modal = document.querySelector("#post-modal");

// Handlers
const submitBtnClickHandler = () => {
  postComment(txtComment.value);
  txtComment.value = "";
};
const likeBtnClickHandler = () => {
  const isLike = likeBtn.classList.contains("on") ? false : true;
  postLike(Global.TEST_POST_ID, isLike)
    .then((data) => {
      likeBtn.classList.toggle("on");
      document.querySelector(".txt-likes").textContent = data.post.heartCount;
    })
    .catch(console.error);
};
const commentChangeHandler = (e) => {
  if (txtComment.value === "") {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};

const commentMoreBtnClickHandler = (e) => {
  modal.classList.remove("off");
  const comment = e.target.parentElement;
  console.log(comment);
};
// EventListeners
submitBtn.addEventListener("click", submitBtnClickHandler);
likeBtn.addEventListener("click", likeBtnClickHandler);
txtComment.addEventListener("input", commentChangeHandler);
replyUl.addEventListener("click", commentMoreBtnClickHandler);
modal.addEventListener("click", function (e) {
  e.target.classList.add("off");
});

// init
getPost(Global.TEST_POST_ID);
