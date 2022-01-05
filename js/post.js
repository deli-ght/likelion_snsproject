const TEST_TOKEN =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3MjdjNmI4MjE2ZmM1NjY4NzZhOSIsImV4cCI6MTY0NjU2MjY4NCwiaWF0IjoxNjQxMzc4Njg0fQ.TBRQv7LmYSlN92I8ZYtf8ly1DomJ55MAIwc042YMv4g";
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

    const postObj = await res.json();
    console.log(postObj);
    console.log(postObj.post.content);
    console.log(postObj.post.image);
    console.log(postObj.post.hearted);
    console.log(postObj.post.heartCount);
    console.log(postObj.post.commentCount);
    console.log(postObj.post.createdAt);

    // 댓글 가져오기
    getReply(postId);
  } catch (err) {
    console.error;
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
    replyObj.comments.forEach((reply) => {
      console.log(reply.author.accountname);
      console.log(reply.author.image);
      console.log(reply.content);
      console.log(reply.createdAt);
    });
  } catch (err) {
    console.error;
  }
};
getPost(TEST_POST_ID);
