import AWS from "aws-sdk";
function Output({ output }) {
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "dwg-upload";
  const http = "https://";
  const s3 = ".s3.";
  const amazonawscom = ".amazonaws.com/";
  const test = "test테스트/T2002032-004.dwgT2002032-004.dwg";

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
        <div className="flex flex-col border w-[22.5%] items-center h-1/2 ml-[2%] mt-[2%] rounded-[6px]">
          <img className="h-[100%] w-full  border" src={filelist[i].fileimg} />
          <div className=" w-full border">{filelist[i].filename}</div>
          <div className=" w-full  border">{filelist[i].filepath}</div>
          {filelist[i].fileindex.length < 20 ? (
            <div className="w-full h-[13.33%] border">
              {filelist[i].fileindex}
            </div>
          ) : (
            <div>{`${filelist[i].fileindex.slice(0, 15)}...`}</div>
          )}
          <a
            href={http + S3_BUCKET + s3 + REGION + amazonawscom + test}
            className=" w-full   "
            download
          >
            <button className=" w-full bg-blue-300 hover:bg-blue-700 hover:text-white active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-700 border">
              다운로드
            </button>
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
