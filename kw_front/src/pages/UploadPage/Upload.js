import index from "../../index.css";
import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  useRef,
} from "react";

function Upload() {
  const [title, setTitle] = useState("이곳에 파일을 드롭해주세요.");
  const [dropclass, setDropclass] = useState("dropBox");
  const [file, setFile] = useState();
  var $file = document.getElementById("directory_upload");
  var selectFile = (files) => {
    $file.files = files;
  };
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-row justify-center items-center w-full">
        <form
          method="post"
          action=""
          encType="multipart/form-data"
          className="flex justify-center flex-col items-center"
        >
          <div
            class={dropclass}
            onDrop={(e) => {
              e.preventDefault();
              const files = [...e.dataTransfer?.files];
              console.log(files);
              setTitle(files.map((v) => v.name).join("<br>"));
              setDropclass("dropBox");
              setFile(files);
              selectFile(files);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDropclass("dropBoxactive");
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setDropclass("dropBoxactive");
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDropclass("dropBox");
            }}
          >
            <h1>{title}</h1>
          </div>
          <input
            type="file"
            id="directory_upload"
            multiple
            webkitdirectory="true"
            onChange={(e) => {
              console.log(e.target.files);
              setFile(e.target.files);
              setTitle(e.target.files[0].name);
            }}
          />
          <div id="preview"></div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Upload;
