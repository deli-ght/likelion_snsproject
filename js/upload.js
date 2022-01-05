document
  .querySelector(".btn-img-upload")
  .addEventListener("click", () => document.querySelector(".inp-imgs").click());

function previewFiles() {
  var preview = document.querySelector(".cont-preview");
  var files = document.querySelector(".inp-imgs").files;

  function readAndPreview(file) {
    // `file.name` 형태의 확장자 규칙에 주의하세요
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();

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

          preview.appendChild(container);
        },
        false
      );

      reader.readAsDataURL(file);
    }
  }

  if (files) {
    [].forEach.call(files, readAndPreview);
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
