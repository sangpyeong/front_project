import { useState } from "react";

function Upload() {
  const [fileList, setFileList] = useState();
  const handleFileInput = (e) => {
    const file = e.target.files;
    console.log(file);
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
          <div className="flex flex-row w-full justify-center h-[30px]">
            <input
              type="file"
              id="directory_upload"
              className="flex w-1/2 h-full"
              multiple
              webkitdirectory="true"
              onChange={handleFileInput}
              accept=".pdf"
            />
            <button
              type="submit"
              className="flex w-1/6 justify-center border border-slate-400 bg-slate-100 items-center h-full"
              onClick={() => {}}
            >
              업로드
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
