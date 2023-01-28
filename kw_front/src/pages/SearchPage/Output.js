function Output({ output }) {
  const listitem = (filelist) => {
    const result = [];
    for (let i = 0; i < filelist.length; i++) {
      result.push(
        <div className="flex flex-col border w-[22.5%] h-1/2 ml-[2%] mt-[2%] rounded-[6px]">
          <img className="h-[60%] w-full  border" src="이미지url" />
          <a
            href="파일 경로/파일이름.확장자"
            className=" w-full  border"
            download
          >
            <button className=" w-full">{filelist[i].filename}</button>
          </a>
          <div className="w-full h-[13.33%] border">{filelist[i].filepath}</div>
          {filelist[i].fileindex.length < 20 ? (
            <div className="w-full h-[13.33%] border">
              {filelist[i].fileindex}
            </div>
          ) : (
            <div>{`${filelist[i].fileindex.slice(0, 15)}...`}</div>
          )}
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
