import * as Global from "./global.js";

const getFeed = async () => {
  try {
    // GET /post/feed
    // // paging limit skip
    // GET /post/feed/?limit=Number&skip=Number
    const res = await fetch(`${Global.URL}/post/feed`, {
      method: "GET",
      headers: Global.HEADER,
    });

    // 포스트 정보 가져오기
    return await res.json();
  } catch (err) {
    console.error;
  }
};

const getMyPosts = async () => {
  try {
    // GET /post/:accountname/userpost
    // // paging limit skip
    // GET /post/:accountname/userpost/?limit=Number&skip=Number
    const res = await fetch(
      `${Global.URL}/post/${Global.LOGIN_ACCOUNT_NAME}/userpost`,
      {
        method: "GET",
        headers: Global.HEADER,
      }
    );

    // 포스트 정보 가져오기
    return await res.json();
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

const setPostElements = (posts) => {
  if (posts.length > 0) {
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
      profile.src = "../src/basic-profile.png"; // 테스트용
      getImageUrl(post.author.image)
        .then((url) => (profile.src = url))
        .catch(console.error);

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

      wrapText.append(title, nickname);
      userInfo.append(profile, wrapText, userMoreBtn);

      const wrapContent = document.createElement("div");
      wrapContent.classList.add("wrap-content");
      const txtContent = document.createElement("p");
      txtContent.classList.add("txt-content");
      txtContent.textContent = post.content;

      const previewContainer = document.createElement("div");
      previewContainer.classList.add("cont-preview");
      // 콘텐츠 이미지 생성하기
      if (post.image) {
        const imgArr = post.image.split(",");
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
          previewContainer.appendChild(imgContainer);
        });
      }

      const btnUl = document.createElement("ul");
      btnUl.classList.add("ul-btns");
      const btnLi1 = document.createElement("li");
      btnLi1.classList.add("li-btn");
      const btnLike = document.createElement("button");
      btnLike.classList.add("btn-likes");
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
      txtDate.textContent = formatDate(post.createdAt);

      wrapContent.append(txtContent, previewContainer, btnUl, txtDate);
      article.append(userInfo, wrapContent);

      postContainer.prepend(article);

      article.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-comments")) {
        }
      });
    });
  }
};
const init = () => {
  // getFeed().then((data) => setPostElements(data.posts));
  getMyPosts().then((data) => setPostElements(data.post));
};

init();
