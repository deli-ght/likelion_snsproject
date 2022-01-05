//refresh-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDEzNzg2ODQsImV4cCI6MTY0MjU4ODI4NH0.oX1QmdQG36F7NqX7CgJGIwfOhzLCXhgSMMqxtyIbciE
//token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3MjdjNmI4MjE2ZmM1NjY4NzZhOSIsImV4cCI6MTY0NjU2MjY4NCwiaWF0IjoxNjQxMzc4Njg0fQ.TBRQv7LmYSlN92I8ZYtf8ly1DomJ55MAIwc042YMv4g
const TEST_TOKEN =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDEzNzg2ODQsImV4cCI6MTY0MjU4ODI4NH0.oX1QmdQG36F7NqX7CgJGIwfOhzLCXhgSMMqxtyIbciE";
("");
const TEST_POST_ID = "61d576a66b8216fc566876d2";
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
    // console.log(postObj);
    // console.log(postObj.post.author.accountname);
    // console.log(postObj.post.author.username);
    // console.log(postObj.post.author.image);
    // console.log(postObj.post.content);
    // console.log(postObj.post.image);
    // console.log(postObj.post.hearted);
    // console.log(postObj.post.heartCount);
    // console.log(postObj.post.commentCount);
    // console.log(postObj.post.createdAt);

    setPostElements(postObj);

    // 댓글 가져오기
    getReply(postId);
  } catch (err) {
    console.error;
  }
};

const setPostElements = (obj) => {
  const homePostCont = document.querySelector(".home-post");
  // author
  homePostCont.querySelector(".img-profile").src = obj.post.author.image;
  homePostCont.querySelector(".txt-title").textContent =
    obj.post.author.username;
  homePostCont.querySelector(".txt-nickname").textContent =
    obj.post.author.accountname;

  //post
  homePostCont.querySelector(".txt-content").textContent = obj.post.content;
  homePostCont.querySelector(".txt-likes").textContent = obj.post.heartCount;
  homePostCont.querySelector(".txt-comments").textContent =
    obj.post.commentCount;
};

const setReplyElements = (obj) => {
  const replyUl = document.querySelector(".cont-reply ul");

  obj.comment.forEach((comt) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const img = document.createElement("img");

    div.classList.add("user-reply");

    // 프로필 이미지
    // img.src = comt.author.image;
    img.src = "../src/basic-profile.png"; // 테스트용
    img.classList.add("img-profile");

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
    replyUl.appendChild(li);
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
  } else {
    return `${parseInt(diffMs / year)}년 전`;
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
    console.log(replyObj);

    setReplyElements(replyObj);

    // replyObj.comments.forEach((reply) => {
    //   console.log(reply.author.accountname);
    //   console.log(reply.author.image);
    //   console.log(reply.content);
    //   console.log(reply.createdAt);
    // });
  } catch (err) {
    console.error;
  }
};

// getPost(TEST_POST_ID);
setReplyElements({
  comment: [
    {
      id: "1",
      content: "코멘트 내용입니다.",
      createdAt: "2021-12-20T06:10:26.803Z",
      author: {
        _id: "작성자 id",
        username: "user",
        accountname: "user_account",
        intro: "1",
        image: "1",
        following: [],
        follower: [],
        followerCount: 0,
        followingCount: 0,
      },
    },
  ],
});
