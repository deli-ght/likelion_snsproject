import * as Global from "./global.js";

// API
const uploadImgs = (formData) => {
  return fetch(`${Global.URL}/image/uploadfiles`, {
    method: "POST",
    body: formData,
  });
};

const uploadPost = async (txtContent, filename) => {
  const response = await fetch(`${Global.URL}/post`, {
    method: "POST",
    headers: Global.HEADER,
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

const getImageUrl = (filename) => {
  return fetch(`${Global.URL}/${filename}`, {
    method: "GET",
  }).then((res) => res.url);
};

// variables
const dataTransfer = new DataTransfer();
const uploadBtn = document.querySelector(".btn-upload");
const imgUploadBtn = document.querySelector(".btn-img-upload");
const inpImgs = document.querySelector(".inp-imgs");
const previewContainer = document.querySelector(".cont-preview");
const txtContent = document.querySelector(".input-txt");

let imgAdded = false;
let txtAdded = false;

// handlers
const uploadBtnClickHandler = () => {
  let formData = new FormData();
  [].forEach.call(dataTransfer.files, (file) => {
    formData.append("image", file);
  });

  uploadImgs(formData)
    .then((res) => res.json())
    .then((data) => {
      const filenameArr = [];

      Array.from(data).forEach((imgInfo) => {
        filenameArr.push(imgInfo.filename);
      });

      if (filenameArr.length > 1) {
        return filenameArr.join();
      } else {
        return filenameArr[0];
      }
    })
    .then((filename) => uploadPost(txtContent.textContent, filename))
    .catch(console.error);
};

const imgRemoveHanlder = (e) => {
  if (e.target.tagName === "BUTTON") {
    if (confirm("사진을 삭제하시겠습니까?")) {
      const parent = e.target.parentElement;
      removeImgOnDataTransfer(parent.firstChild.getAttribute("filename"));
      e.currentTarget.removeChild(parent);
    }

    // 이미지가 모두 삭제되면 플래그 변경
    if (e.currentTarget.children.length === 0) {
      imgAdded = false;

      // 이미지는 없지만 텍스트는 추가된 경우 업로드 버튼 활성화
      if (!txtAdded) {
        uploadBtn.disabled = true;
      }
    }
  }
};

// event listeners
inpImgs.addEventListener("change", addImgOnPreview);
uploadBtn.addEventListener("click", uploadBtnClickHandler);
imgUploadBtn.addEventListener("click", () =>
  document.querySelector(".inp-imgs").click()
);
previewContainer.addEventListener("click", imgRemoveHanlder);
txtContent.addEventListener("input", (e) => {
  const target = e.target;
  console.log(target.value);
  fnChkByte(target);
  resize(target);
});

// functions
function init() {
  const imgLoginUser = document.querySelector("#upload .img-basic-profile");

  Global.getUser(Global.LOGIN_ACCOUNT_NAME).then((data) => {
    getImageUrl(data.profile.image)
      .then((url) => (imgLoginUser.src = url))
      .catch(console.error);
  });
}

function removeImgOnDataTransfer(filename) {
  // remove(index: number): void;
  // [].forEach.call(files, readAndPreview);

  [].forEach.call(dataTransfer.files, (file, index) => {
    if (file.name === filename) dataTransfer.items.remove(index);
  });
}

function isValidFile(insertFiles) {
  // 지금 추가할 파일이 이미 있는 파일인지 확인한다.
  // 이미 있는 파일은 dataTransfer.files 에 있다.
  // 현재 추가하려는 파일의 이름과
  // dataTransfer에 있는 파일의 이름이 같으면
  // 둘은 같은 파일로 가정하고
  // 같은 파일을 또 추가하려하면 알림 없이 추가 하지 않는다.
  const tempDataTransfer = new DataTransfer();
  for (const file of insertFiles) {
    let canSave = true;
    for (const existFile of dataTransfer.files) {
      if (file.name === existFile.name) {
        canSave = false;
        break;
      }
    }
    if (
      canSave &&
      dataTransfer.files.length + tempDataTransfer.files.length < 3
    ) {
      tempDataTransfer.items.add(file);
      // dataTransfer.items.add(file);
    }
  }

  if (tempDataTransfer.files)
    [...tempDataTransfer.files].forEach((file) => dataTransfer.items.add(file));
  return tempDataTransfer.files;
}

function addImgOnPreview() {
  const preview = document.querySelector(".cont-preview");
  if (dataTransfer.files.length + inpImgs.files.length > 3) {
    alert("사진은 최대 3장 까지 추가 할 수 있습니다.");
    return;
  }

  const files = isValidFile(inpImgs.files);

  if (files) {
    [].forEach.call(files, readAndPreview);

    // 추가한 이미지가 있으므로 업로드 버튼 활성화
    imgAdded = true;
    uploadBtn.disabled = false;
  }

  function readAndPreview(file) {
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.addEventListener(
        "load",
        function () {
          const container = document.createElement("div");
          const img = document.createElement("img");
          const delBtn = document.createElement("button");

          img.classList.add("img-preview");
          img.src = this.result;
          img.setAttribute("filename", file.name);

          container.classList.add("cont-img");
          container.appendChild(img);
          container.appendChild(delBtn);

          preview.insertBefore(container, preview.firstChild);
        },
        false
      );
    }
  }
}

function fnChkByte(obj) {
  const maxByte = 500;
  const str = obj.value;
  let currByte = 0,
    endIdx = 0;

  // 입력한 글이 없으면 업로드 버튼 활성화 되지 못함.
  if (str.length > 0) {
    txtAdded = true;
    uploadBtn.disabled = false;
  } else {
    txtAdded = false;

    // 텍스트는 없지만 이미지는 추가된 경우 업로드 버튼 활성화
    if (!imgAdded) {
      uploadBtn.disabled = true;
    }
  }

  for (let i = 0; i < str.length; i++) {
    if (escape(str.charAt(i)) > 4) {
      currByte += 2;
    } else {
      currByte += 1;
    }

    if (currByte >= maxByte) {
      endIdx = i;
      break;
    }
  }

  if (endIdx === 0) {
    obj.value = str;
  } else {
    alert(`메세지는 최대 ${maxByte}바이트까지 입력 가능합니다.`);
    obj.value = str.substring(0, endIdx);
  }
}

function resize(obj) {
  obj.style.height = "1px";
  obj.style.height = 12 + obj.scrollHeight + "px";
}

// start
init();
