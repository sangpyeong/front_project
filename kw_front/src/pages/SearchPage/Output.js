function Output({ output }) {
  const listitem = (filelist) => {
    const result = [];
    for (let i = 0; i < filelist.length; i++) {
      result.push(
        <div className="flex flex-col border w-[22.5%] items-center h-1/2 ml-[2%] mt-[2%] rounded-lg">
          <div className="h-[60%] w-full  border">{filelist[i].fileimg}</div>
          <div className=" w-full border">{filelist[i].filename}</div>
          <div className=" w-full  border">{filelist[i].filepath}</div>
          <div className=" w-full  border">인덱스</div>
          <a href="파일 경로/파일이름.확장자" className=" w-full   " download>
            <button className=" w-full hover:bg-blue-700 hover:text-white active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-700 border">
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
