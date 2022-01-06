//refresh-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDEzNzg2ODQsImV4cCI6MTY0MjU4ODI4NH0.oX1QmdQG36F7NqX7CgJGIwfOhzLCXhgSMMqxtyIbciE
//token(ash__h): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3MjdjNmI4MjE2ZmM1NjY4NzZhOSIsImV4cCI6MTY0NjU2MjY4NCwiaWF0IjoxNjQxMzc4Njg0fQ.TBRQv7LmYSlN92I8ZYtf8ly1DomJ55MAIwc042YMv4g
//token(ash2): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3ODMxNmI4MjE2ZmM1NjY4NzZlZCIsImV4cCI6MTY0NjU2Mzk2OSwiaWF0IjoxNjQxMzc5OTY5fQ.ugws0yLMbn0G4dKLwPSDTHPz-e3TmG7HeO_lXC8y-PM
const TEST_TOKEN =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3MjdjNmI4MjE2ZmM1NjY4NzZhOSIsImV4cCI6MTY0NjU2MjY4NCwiaWF0IjoxNjQxMzc4Njg0fQ.TBRQv7LmYSlN92I8ZYtf8ly1DomJ55MAIwc042YMv4g";
// const TEST_POST_ID = "61d576a66b8216fc566876d2";
const TEST_POST_ID = "61d6df2b685c75821c469db4";
const URL = "http://146.56.183.55:5050";

const HEADER = new Headers({
  Authorization: TEST_TOKEN,
  "Content-type": "application/json",
});

const getPost = async (postId) => {
  try {
    //GET /post/:post_id
    const res = await fetch(`${URL}/post/${postId}`, {
      method: "GET",
      headers: HEADER,
    });

    // 포스트 정보 가져오기
    const postObj = await res.json();
    setPostElements(postObj);

    // 댓글 가져오기
    getReply(postId);
  } catch (err) {
    console.error;
  }
};
const getImageUrl = (filename) => {
  return fetch(`${URL}/${filename}`, {
    method: "GET",
  }).then((res) => res.url);
};

const setPostElements = (obj) => {
  const imgArr = obj.post.image.split(",");

  const homePostCont = document.querySelector(".home-post");
  // author
  homePostCont.querySelector(".img-profile").src = "../src/basic-profile.png"; // 테스트용
  // homePostCont.querySelector(".img-profile").src = getImage(
  //   obj.post.author.image
  // );

  homePostCont.querySelector(".txt-title").textContent =
    obj.post.author.username;
  homePostCont.querySelector(
    ".txt-nickname"
  ).textContent = `@ ${obj.post.author.accountname}`;

  //post
  homePostCont.querySelector(".txt-content").textContent = obj.post.content;
  homePostCont.querySelector(".img-preview").src = "../src/img-post-sample.png";
  homePostCont.querySelector(".txt-likes").textContent = obj.post.heartCount;
  homePostCont.querySelector(".txt-comments").textContent =
    obj.post.commentCount;

  // 프로필이미지 테스트용 1641444666211.png
  // getImage(obj.post.author.image)
  getImageUrl("1641444666211.png")
    .then((url) => (homePostCont.querySelector(".img-profile").src = url))
    .catch(console.error);

  // 본문 이미지
  getImageUrl(imgArr[0])
    .then((url) => (homePostCont.querySelector(".img-preview").src = url))
    .catch(console.error);
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
  console.log(obj);
  const replyUl = document.querySelector(".cont-reply ul");

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
    getImageUrl("1641444666211.png")
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
    const res = await fetch(`${URL}/post/${postId}/comments`, {
      method: "GET",
      headers: HEADER,
    });

    const replyObj = await res.json();
    const sortedReplyObj = sortDescByDate(replyObj.comments);
    setReplyElements(sortedReplyObj);
  } catch (err) {
    console.error;
  }
};

const postComment = async (txtComment) => {
  try {
    const res = await fetch(`${URL}/post/${TEST_POST_ID}/comments`, {
      method: "POST",
      headers: HEADER,
      body: JSON.stringify({
        comment: {
          content: txtComment,
        },
      }),
    });

    getReply(TEST_POST_ID);

    // const data = await res.json();
    // console.log(data);
  } catch (err) {
    console.error(err);
  }
};

getPost(TEST_POST_ID);

// Variables
const submitBtn = document.querySelector(".btn-submit");

// Handlers
const submitBtnClickHandler = () => {
  const txtComment = document.querySelector("#comment .input-text");
  postComment(txtComment.value);
};

// EventListeners
submitBtn.addEventListener("click", submitBtnClickHandler);
