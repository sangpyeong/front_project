function Output({ output }) {
  const listitem = (filelist) => {
    const result = [];
    for (let i = 0; i < filelist.length; i++) {
      result.push(
        <div className="flex justify-start item-center w-1/4">
          {filelist[i].filename} {filelist[i].filepath}
          {filelist[i].fileimg}
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
        <div className="flex flex-row justify-center items-center w-[60%] h-full border rounded-[6px]">
          {listitem(output)}
        </div>
      )}
    </div>
  );
}

export default Output;
