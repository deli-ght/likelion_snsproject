import * as Global from "./global.js";

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
      Global.getImageUrl(post.author.image)
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
          Global.getImageUrl(filename)
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

      wrapContent.append(txtContent, previewContainer, btnUl, txtDate);
      article.append(userInfo, wrapContent);

      article.addEventListener("click", (e) => {
        console.log(e.detail);
        // if (e.detail === 1) {
        //   // it was a single click
        //   postClickHandler(e, hiddenId.value);
        // } else if (e.detail === 2) {
        //   // it was a double click
        //   postDblClickHandler(e, hiddenId.value);
        // }
      });

      postContainer.append(article);
    });
  }
};

// variables

// event handlers
const postClickHandler = (e, postId) => {
  const target = e.target;
  if (
    target.classList.contains("txt-content") ||
    target.classList.contains("img-preview") ||
    target.classList.contains("btn-comments")
  ) {
    localStorage.setItem("postId", postId);
    location.href = "./post.html";
  }
};

const postDblClickHandler = (e, postId) => {
  const target = e.target;
  if (
    target.classList.contains("txt-content") ||
    target.classList.contains("img-preview")
  ) {
    console.log(target);
    // const isLike = likeBtn.classList.contains("on") ? false : true;
    // Global.postLike(postId, isLike)
    //   .then((data) => {
    //     likeBtn.classList.toggle("on");
    //     document.querySelector(".txt-likes").textContent = data.post.heartCount;
    //   })
    //   .catch(console.error);
  }
};

// functions
const init = () => {
  Global.getFeed().then((postObj) => setPostElements(postObj.posts));
  // Global.getMyPosts().then((postObj) => setPostElements(postObj.post));
};

// start
init();
