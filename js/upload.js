let txtAdded = false;
let imgAdded = false;

const uploadBtn = document.querySelector(".btn-upload");
document
  .querySelector(".btn-img-upload")
  .addEventListener("click", () => document.querySelector(".inp-imgs").click());

document.querySelector(".cont-preview").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    if (confirm("사진을 삭제하시겠습니까?")) {
      const parent = e.target.parentElement;
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
});

function previewFiles() {
  const preview = document.querySelector(".cont-preview");
  const inpEl = document.querySelector(".inp-imgs");
  const files = inpEl.files;

  if (files) {
    [].forEach.call(files, readAndPreview);
    inpEl.value = "";

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
    obj.innerText = str;
  } else {
    alert(`메세지는 최대 ${maxByte}바이트까지 입력 가능합니다.`);
    obj.innerText = str.substring(0, endIdx);
  }
}

function resize(obj) {
  obj.style.height = "1px";
  obj.style.height = 12 + obj.scrollHeight + "px";
}
