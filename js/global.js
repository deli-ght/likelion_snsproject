export let TOKEN = "";

//token(ash__h): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3MjdjNmI4MjE2ZmM1NjY4NzZhOSIsImV4cCI6MTY0NjU2MjY4NCwiaWF0IjoxNjQxMzc4Njg0fQ.TBRQv7LmYSlN92I8ZYtf8ly1DomJ55MAIwc042YMv4g
//token(ash2): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3ODMxNmI4MjE2ZmM1NjY4NzZlZCIsImV4cCI6MTY0NjU2Mzk2OSwiaWF0IjoxNjQxMzc5OTY5fQ.ugws0yLMbn0G4dKLwPSDTHPz-e3TmG7HeO_lXC8y-PM
export let TEST_TOKEN =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3MjdjNmI4MjE2ZmM1NjY4NzZhOSIsImV4cCI6MTY0NjU2MjY4NCwiaWF0IjoxNjQxMzc4Njg0fQ.TBRQv7LmYSlN92I8ZYtf8ly1DomJ55MAIwc042YMv4g";
// export let TEST_POST_ID = "61d576a66b8216fc566876d2"; // ash__H, 이미지 1장, 댓글 있음
export let TEST_POST_ID = "61d6df2b685c75821c469db4"; // ash2, 이미지 1장, 댓글 있음
// export let TEST_POST_ID = "61d7f550685c75821c46aca5"; // ash2, 이미지 2장, 댓글 없음
// export let TEST_POST_ID = "61d7fc4a685c75821c46ad08"; // ash2, 글만 있음, 댓글 있음
export const URL = "http://146.56.183.55:5050";

export const setToken = (token) => {
  TOKEN = token;
};
export const setPostId = (postId) => {
  TEST_POST_ID = postId;
};

export const HEADER = new Headers({
  Authorization: TEST_TOKEN,
  "Content-type": "application/json",
});

export let LOGIN_USER_INFO = {
  user: {
    _id: "61d5727c6b8216fc566876a9",
    username: "ash__h",
    accountname: "ash__h",
    intro: "반갑습니다",
    image: "1641719153648.jpg",
    following: [
      "61ca638ab5c6cd18084e447d",
      "61ca67d620684884d8d9dbe8",
      "61cac5b7ea18ab64b98b8092",
      "61cac631ea18ab64b98b80a9",
      "61cbe6f50ffe50bf512bab10",
      "61cc16160ffe50bf512bb9f7",
    ],
    follower: ["61d578316b8216fc566876ed"],
    followerCount: 1,
    followingCount: 6,
  },
};
