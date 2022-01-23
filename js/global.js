export const URL = "http://146.56.183.55:5050";

export let TOKEN = "";
export let TEST_TOKEN = "";
export let LOGIN_ACCOUNT_NAME = "";
let HEADER = "";

export const setInit = () => {
  console.log("setInit", localStorage.getItem("currentUser"));
  TOKEN = localStorage.getItem("token");
  TEST_TOKEN = "Bearer " + TOKEN;
  LOGIN_ACCOUNT_NAME = localStorage.getItem("accountName");
  HEADER = new Headers({
    Authorization: TEST_TOKEN,
    "Content-type": "application/json",
  });
};

export const setLoginUser = () => {
  LOGIN_ACCOUNT_NAME = localStorage.getItem("accountName");
};
export const getUser = async (accountname) => {
  // GET /profile/:accountname
  return await fetch(`${URL}/profile/${accountname}`, {
    method: "GET",
    headers: HEADER,
  }).then((res) => res.json());
};

export const getPost = async (postId) => {
  try {
    //GET /post/:post_id
    const res = await fetch(`${URL}/post/${postId}`, {
      method: "GET",
      headers: HEADER,
    });

    // 포스트 정보 가져오기
    return await res.json();
  } catch (err) {
    console.error;
  }
};

export const postLike = async (postId, isLike) => {
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
    const res = await fetch(`${URL}/post/${postId}/${action}`, {
      method: reqMethod,
      headers: HEADER,
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const getComments = async (postId) => {
  try {
    //GET /post/:post_id/comments
    const res = await fetch(`${URL}/post/${postId}/comments`, {
      method: "GET",
      headers: HEADER,
    });

    return await res.json();
  } catch (err) {
    console.error;
  }
};

export const postComment = async (postId, txtComment) => {
  try {
    await fetch(`${URL}/post/${postId}/comments`, {
      method: "POST",
      headers: HEADER,
      body: JSON.stringify({
        comment: {
          content: txtComment,
        },
      }),
    });
    // console.log(await res.json());
  } catch (err) {
    console.error(err);
  }
};

export const getUserPosts = async (limit, skip, check = false) => {
  try {
    const currUser = localStorage.getItem("currentUser");
    console.log("getUser", currUser);
    console.log("check", check);
    let res = "";
    if (check && currUser !== "") {
      // GET /post/:accountname/userpost
      // // paging limit skip
      // GET /post/:accountname/userpost/?limit=Number&skip=Number
      res = await fetch(
        `${URL}/post/${currUser}/userpost?limit=${limit}&skip=${skip}`,
        {
          method: "GET",
          headers: HEADER,
        }
      );
    } else {
      res = await fetch(`${URL}/post/feed?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: HEADER,
      });
    }

    // 포스트 정보 가져오기
    return await res.json();
  } catch (err) {
    console.error;
  }
};

export const getFeed = async (limit, skip) => {
  try {
    // GET /post/feed
    // // paging limit skip
    // GET /post/feed/?limit=Number&skip=Number
    const res = await fetch(`${URL}/post/feed?limit=${limit}&skip=${skip}`, {
      method: "GET",
      headers: HEADER,
    });

    // 포스트 정보 가져오기
    return await res.json();
  } catch (err) {
    console.error;
  }
};

export const uploadImgs = async (formData) => {
  try {
    const res = await fetch(`${URL}/image/uploadfiles`, {
      method: "POST",
      body: formData,
    });

    return res.json();
  } catch (err) {
    console.error;
  }
};

export const uploadPost = async (txtContent, filename) => {
  const response = await fetch(`${URL}/post`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      post: {
        content: txtContent,
        image: filename,
      },
    }),
  });

  const data = await response.json();
  console.log(data);
};
// yyyy년 mm월 dd일
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return `${year}년 ${month}월 ${day}일`;
};

export const sortDescByDate = (obj) => {
  return obj.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
