import { useEffect, useRef, useState } from "react";
import index from "./Upload.css";
import AWS from "aws-sdk";

function Upload() {
  const [fileList, setFileList] = useState([]);
  const [dropClass, setDropClass] = useState("dropBox");
  const [fileName, setFilename] = useState("이곳에 폴더를 드롭해주세요.");
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  let tmpFile = [];
  const ACCESS_KEY = "AKIAQRW62EWBFZ6VWRID";
  const SECRET_ACCESS_KEY = "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";
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "engineering-data-search-service";

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const traverseFileTree = (item, path) => {
    path = path || "";
    if (item.isFile) {
      // Get file
      if (item.name.split(".").pop() === "dwg") {
        let FileObject;
        item.file(function (file) {
          FileObject = file;
          // console.log(FileObject.webkitRelativePath);
          // FileObject.webkitRelativePath = item.fullPath;
          tmpFile = [...tmpFile, FileObject];
          console.log("traver", tmpFile);
          setFileList((prev) => (prev = tmpFile));
        });
      }
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
    let result = [];
    for (let i = 0; i < file.length; i++) {
      if (file[i].name.split(".").pop() === "dwg") {
        result = [...result, file[i]];
      }
    }
    setFileList((prev) => (prev = result));
    setFilename(file[0].webkitRelativePath.split("/")[0]);
  };

  const listItems = () => {
    console.log("listItems_fileList", fileList);
    if (fileList.length > 10) {
      return fileList.map((file) => <li>{file.name}</li>);
    } else {
      return fileList.map((file) => <li>{file.name}</li>);
    }
  };

  const uploadFile = (file) => {
    console.log("file[0]", file[0]);
    if (!file[0].fullPath) {
      for (let i = 0; i < file.length; i++) {
        const params = {
          ACL: "public-read",
          Body: file[i],
          Bucket: S3_BUCKET,
          Key: file[i].webkitRelativePath + file[i].name,
        };
        myBucket
          .putObject(params)
          .on("httpUploadProgress", (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              setSelectedFile(null);
            }, 3000);
          })
          .send((err) => {
            if (err) console.log(err);
          });
      }
    } else {
      console.log("FileEntry.file()", file[0].file());
      for (let i = 0; i < file.length; i++) {
        const params = {
          ACL: "public-read",
          Body: file[i],
          Bucket: S3_BUCKET,
          Key: file[i].fullPath + file[i].name,
        };
        myBucket
          .putObject(params)
          .on("httpUploadProgress", (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              setSelectedFile(null);
            }, 3000);
          })
          .send((err) => {
            if (err) console.log(err);
          });
      }
    }
  };

  console.log("main_fileLsit", fileList);
  console.log("main_tmpfile", tmpFile);
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

            console.log("tmpfile", tmpFile);

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

        <div className="flex flex-row items-center justify-center w-full pb-3">
          {showAlert ? (
            <div color="primary" className="pt-3 pr-3">
              업로드 진행률 : {progress}%
            </div>
          ) : (
            <div color="primary" className="pt-3 pr-3">
              업로드하려면 버튼을 눌러주세요.
            </div>
          )}

          <button
            type="submit"
            className="flex w-1/6 justify-center border border-slate-400 bg-slate-200 items-center h-full mt-3"
            onClick={() => uploadFile(fileList)}
          >
            업로드
          </button>
        </div>
        <div id="list">
          <ul>{listItems()}</ul>
        </div>
      </div>
    </div>
  );
}

export default Upload;
