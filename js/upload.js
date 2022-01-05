document
  .querySelector(".btn-img-upload")
  .addEventListener("click", () => document.querySelector(".inp-imgs").click());

document.querySelector(".cont-preview").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    if (confirm("사진을 삭제하시겠습니까?")) {
      const parent = e.target.parentElement;
      e.currentTarget.removeChild(parent);
    }
  }
});

function previewFiles() {
  const preview = document.querySelector(".cont-preview");
  const files = document.querySelector(".inp-imgs").files;

  if (files) {
    [].forEach.call(files, readAndPreview);
    obj.value = "";
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
    console.log(str);
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
