# SNS 감귤마켓 만들기🍊

감귤마켓 서비스는 자신의 스토어에서 판매하고 있는 상품(감귤)을 등록하여 홍보할 수 있는 SNS입니다. 오직 감귤만 상품으로 업로드할 수 있습니다.

상품을 등록하지 않아도 일상을 공유하며 즐거운 SNS 활동을 할 수 있습니다. 글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다. 또한 다른 사용자와 메시지를 주고 받을 수 있습니다.

피드를 구경하다가 마음에 드는 게시물을 발견했다면 좋아요를 누를 수 있고 댓글을 남기거나 공유를 할 수도 있습니다.

## stack

### Frontend

- HTML
- CSS
- JAVASCRIPT

### Backend

- 제공된 api 사용

## product

[피그마 이미지](https://www.figma.com/file/Gn6gQJdYwImYsEYSzBXhud/%EB%A9%8B%EC%82%AC_%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%8A%A4%EC%BF%A8?node-id=39%3A1814)
[감귤마켓 🍊]()

# 역할

## member

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/deli-ght"
        ><img
          src="https://avatars.githubusercontent.com/deli-ght"
          width="100px;"
          alt=""
        /><br /><sub><b>김민주</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/sohyeonAn"
        ><img
          src="https://avatars.githubusercontent.com/sohyeonAn"
          width="100px;"
          alt=""
        /><br /><sub><b>안소현</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/poiu03290"
        ><img
          src="https://avatars.githubusercontent.com/poiu03290"
          width="100px;"
          alt=""
        /><br /><sub><b>권혁</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/sichan1301"
        ><img
          src="https://avatars.githubusercontent.com/sichan1301"
          width="100px;"
          alt=""
        /><br /><sub><b>정시찬</b></sub></a><br />
    </td>
  </tr>
</table>

## UI 모듈 제작

| 이름       | 모듈                                     |
| ---------- | ---------------------------------------- |
| **안소현** | home-post, user-search, userfollow       |
| **권혁**   | top-\*                                   |
| **김민주** | buttons, text-Active-input               |
| **정시찬** | product, tab-menu, comment, delete alert |

## page UI 및 기능 구현

| 이름       | pages                                           |
| ---------- | ----------------------------------------------- |
| **안소현** | home, myfeed, 게시물 등록, 게시물 상세조회      |
| **권혁**   | 스플래시 화면, 로그인, 회원가입, 내 프로필 수정 |
| **김민주** | home(UI only), 검색, 채팅, 에러페이지, 팔로우   |
| **정시찬** | user profile                                    |

## [🔗 상세 기능 확인하기](https://github.com/deli-ght/likelion_snsproject/wiki/%EC%83%81%EC%84%B8-%EA%B8%B0%EB%8A%A5)

### 로그인/로그아웃

- 초기 화면
  - 시작시 스플래쉬 화면 전환
  - 로그인을 하지 않은 경우 : 로그인 화면
  - 로그인이 되어있는 경우 : 감귤마켓 피드
- 로그인

  - 토큰을 사용해 로그인 구현
  - 입력에 대한 유효성 검사

- 회원가입
  - 이메일 주소 유효성 검사
  - 프로필 사진 등록
  - 계정 중복 확인

### home feed

- 감귤마켓 피드

  - 팔로우한 사용자의 게시물 목록 조회
  - 팔로우한 사용자가 없는 경우, 검색하기 화면 로드

- 검색
  - accountname을 기준으로 유저 검색
  - 유저 클릭시 해당 유저 페이지로 이동

### userpage

- 사용자 프로필 페이지

  - 사용자 이름, 계정 ID, 소개, 팔로워 및 팔로잉 수, 판매 상품, 업로드한 게시글을 확인
  - 본인의 페이지인 경우, 프로필 수정과 상품 등록 가능
  - 게시글 조회 (목록형, 앨범형)
  - 게시글 삭제

- 팔로워, 팔로잉 목록

  - 해당 유저의 팔로워, 팔로잉 리스트 확인
  - 팔로우, 언팔로우 기능

- 게시물 등록
  - 텍스트 및 이미지 등록
  - 이미지 등록시 최대 3장까지 등록 가능
- 게시물 상세 조회
  - 게시물 클릭시 상세 조회
  - 좋아요 기능
  - 댓글 조회
  - 댓글 등록

### chat

- 채팅방
  - 텍스트 입력 후 전송시 UI상으로 메세지 전송 (실제 전송 x)
