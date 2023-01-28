import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

function Output({ output, setOutput }) {
  const listitem = (output) => {
    const result = [];
    for (let i = 0; i < output.length; i++) {
      result.push(
        <div className="flex flex-col border w-[22.5%] items-center h-1/2 ml-[2%] mt-[2%] rounded-[6px]">
          <img className="h-[100%] w-full  border" src={output[i].fileimg} />
          <div className=" w-full  border">{output[i].filename}</div>
          <div className=" w-full  border">{output[i].filepath}</div>
          {output[i].fileindex.length < 20 ? (
            <div className="w-full  border">{output[i].fileindex}</div>
          ) : (
            <div className="w-full  border">{`${output[i].fileindex.slice(
              0,
              15
            )}...`}</div>
          )}
          <a href="파일 경로/파일이름.확장자" className=" w-full   " download>
            <button className=" w-full bg-[#f1f6fe] hover:bg-blue-700 hover:text-white active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-700 border">
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
      <div className="flex flex-col justify-center items-center w-[8%] h-full border rounded-[6px]">
        <div className="">정렬기준</div>
        <div className="flex flex-row ">
          <div className="">제목</div>
          <button
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
            onClick={() => {
              let TmpOutput = [...output];
              TmpOutput.sort((a, b) =>
                a.filepath.toLowerCase() < b.filepath.toLowerCase() ? -1 : 1
              );
              console.log(TmpOutput);
              setOutput(TmpOutput);
            }}
          >
            <AiOutlineArrowUp />
          </button>
          <button
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
