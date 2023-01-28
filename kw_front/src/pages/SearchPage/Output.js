import AWS from "aws-sdk";
import fileimg from "./예시이미지.jpg";
function Output({ output }) {
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
    for (let i = 0; i < filelist.length; i++) {
      result.push(
        <div className="flex flex-col  w-[22.5%] items-center h-[300px] ml-[2%] mt-[2%] rounded-[6px] ">
          <a
            href={http + S3_BUCKET + s3 + REGION + amazonawscom + test}
            className=" w-full h-full  focus:outline-none focus:ring-8 focus:ring-[#f1f6fe]"
            download
          >
            <img
              className="h-[60%] border"
              src={fileimg /*filelist[i].fileimg*/}
            />
            <div className=" w-full  h-[10%] border  ">
              {filelist[i].filename}
            </div>
            <div className=" w-full h-[10%] border ">
              {filelist[i].filepath}
            </div>
            {filelist[i].fileindex.length < 20 ? (
              <div className="w-full h-[20%] border ">
                {filelist[i].fileindex}
              </div>
            ) : (
              <div className="w-full h-[20%] border ">{`${filelist[
                i
              ].fileindex.slice(0, 15)}...`}</div>
            )}
          </a>
        </div>
      );
    }
    return result;
  };
  return (
    <div className="flex flex-row justify-center items-center w-full h-[60%] mt-5">
      <div className="flex flex-row justify-center items-center w-[8%] h-full border rounded-[6px]">
        정렬기준
      </div>
      <div className="w-[2%]"></div>
      {output.length === 0 ? (
        <div className="flex flex-row justify-center items-center w-[60%] h-full border rounded-[6px]">
          검색결과가 없습니다.
        </div>
      ) : (
        <div className="flex flex-row flex-wrap   items-center w-[60%] h-full border rounded-[6px] overflow-y-scroll">
          {listitem(output)}
        </div>
      )}
    </div>
  );
}

export default Output;
