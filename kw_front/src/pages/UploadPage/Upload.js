import { useState } from "react";
import index from "./Upload.css";
import FileList from "./FileList";
function Upload() {
  const [fileList, setFileList] = useState([]);
  const [dropClass, setDropClass] = useState("dropBox");
  const [fileName, setFilename] = useState("이곳에 폴더를 드롭해주세요.");
  let tmpFile = [];
  const traverseFileTree = (item, path) => {
    path = path || "";
    if (item.isFile) {
      // Get file
      if (item.name.split(".").pop() === "dwg") {
        tmpFile.push(item);
      }
      //console.log(tmpFile);
    } else if (item.isDirectory) {
      // Get folder contents
      var dirReader = item.createReader();
      dirReader.readEntries(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          traverseFileTree(entries[i], path + item.name + "/");
        }
      });
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files;
    //console.log(file);
    //console.log(file[0].name.split(".").pop());
    let result = [];
    for (let i = 0; i < file.length; i++) {
      if (file[i].name.split(".").pop() === "dwg") {
        //console.log(file[i].name.split(".").pop());
        result = [...result, file[i]];
      }
    }
    //console.log(result);
    setFileList((prev) => (prev = result));
    setFilename(file[0].webkitRelativePath.split("/")[0]);
  };
  const listItems = (fileList) => {
    let filelist = [...fileList];
    console.log("filelist2", fileList);
    return filelist.map((file) => <li>{file.name}</li>);
  };
  console.log("fileLsit", fileList);
  //console.log("tmpfile1", tmpFile);
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div
          draggable="ture"
          className={dropClass}
          onDrop={(e) => {
            e.preventDefault();
            var items = e.dataTransfer.items;
            for (var i = 0; i < items.length; i++) {
              var item = items[i].webkitGetAsEntry();
              if (item) {
                traverseFileTree(item);
              }
            }
            console.log("tmpfile2", tmpFile);
            setFileList((prev) => {
              prev = tmpFile;
            });
            setFilename(e.dataTransfer.files[0].name);
            setDropClass("dropBox");
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setDropClass("dropBoxactive");
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDropClass("dropBox");
          }}
          onChange={(e) => {
            e.preventDefault();
          }}
        >
          {fileName}
          <button
            className="flex ml-5 border"
            onClick={() => {
              setFileList([]);
              setFilename("이곳에 폴더를 드롭해주세요.");
            }}
          >
            {fileName !== "이곳에 폴더를 드롭해주세요." ? "x" : null}
          </button>
        </div>
        <input
          type="file"
          id="directory_upload"
          className="flex w-1/4 h-full justify-center"
          multiple
          webkitdirectory="true"
          onChange={handleFileInput}
          class="hidden"
        />
        <label
          for="directory_upload"
          className="flex w-1/6 justify-center border border-slate-400 bg-slate-200 items-center h-full mt-3"
        >
          폴더 선택
        </label>

        <FileList fileList={fileList} />

        <button
          type="submit"
          className="flex w-1/6 justify-center border border-slate-400 bg-slate-200 items-center h-full mt-3"
          onClick={() => {}}
        >
          업로드
        </button>
      </div>
    </div>
  );
}

export default Upload;
