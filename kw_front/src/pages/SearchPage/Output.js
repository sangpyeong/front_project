import AWS from "aws-sdk";
import fileimg from "./예시이미지.jpg";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

function Output({ output, setOutput }) {
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "dwg-upload";
  const http = "https://";
  const s3 = ".s3.";
  const amazonawscom = ".amazonaws.com/";
  const test = "test3/00_간지.dwg00_간지.dwg";

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });
  const listitem = (filelist) => {
    const result = [];
    for (let i = 0; i < output.length; i++) {
      result.push(
        <a
          href={http + S3_BUCKET + s3 + REGION + amazonawscom + test}
          className=" flex flex-col  w-[22.5%] items-center h-[300px] ml-[2%] mt-[2%]   focus:outline-none focus:ring-8 focus:ring-[#f1f6fe] rounded-[6px] border"
          download
        >
          <img
            className="h-[60%] border rounded-t-[6px]"
            src={fileimg /*filelist[i].fileimg*/}
          />
          <div className=" w-full  h-[10%] border  ">
            {filelist[i].filename}
          </div>
          <div className=" w-full h-[10%] border ">{filelist[i].filepath}</div>
          {filelist[i].fileindex.length < 20 ? (
            <div className=" w-full h-[20%] border rounded-b-[6px] break-all">
              {filelist[i].fileindex}
            </div>
          ) : (
            <div className=" w-full h-[20%] border rounded-b-[6px] break-all">
              {`${filelist[i].fileindex.slice(0, 15)}...`}
            </div>
          )}
        </a>
      );
    }
    return result;
  };
  return (
    <div className="flex flex-row justify-center items-center w-full h-[60%] mt-5">
      <div className="flex flex-col justify-evenly items-center w-[8%] h-full border rounded-[6px] ">
        <div className="text-[20px] ">정렬기준</div>
        <div className="flex flex-row  ">
          <div className="">제목</div>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowUp />
          </button>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                a.filename.toLowerCase() > b.filename.toLowerCase() ? -1 : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowDown />
          </button>
        </div>
        <div className="flex flex-row ">
          <div className="">경로</div>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                a.filepath.toLowerCase() < b.filepath.toLowerCase() ? -1 : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowUp className="" />
          </button>
          <button
            className="ml-3 hover:border-[#e4e1f1] hover:border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#f1f6fe]"
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                a.filepath.toLowerCase() > b.filepath.toLowerCase() ? -1 : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowDown />
          </button>
        </div>
      </div>

      <div className="w-[2%]"></div>
      {output.length === 0 ? (
        <div className="flex flex-row justify-center items-center w-[60%] h-full border rounded-[6px] ">
          검색결과가 없습니다.
        </div>
      ) : (
        <div className="flex flex-row flex-wrap   items-center w-[60%] h-full border rounded-[6px] overflow-y-scroll ">
          {listitem(output)}
        </div>
      )}
    </div>
  );
}

export default Output;
