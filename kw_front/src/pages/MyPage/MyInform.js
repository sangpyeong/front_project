function MyInform({ token }) {
  const year = [2021];
  for (var i = 0; i < 100; i++) {
    year.push(year[i - 1] - i);
  }

  return (
    <div className="flex flex-col w-full border">
      <div className="flex flex-row w-full h-[80px] text-2xl ml-3 mt-3">
        개인정보수정
      </div>
      <div className="flex flex-row justify-center h-[40px]">
        <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
          한글이름
        </div>
        <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
          홍길동
        </div>
        <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
          사번
        </div>
        <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
          20240000
        </div>
      </div>

      <div className="flex flex-row justify-center h-[40px]">
        <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
          생년월일
        </div>
        <select className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
          <option>선택해주세요</option>
        </select>
        <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
          휴대폰
        </div>
        <input
          className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2"
          placeholder="예)010-1234-5678"
        />
      </div>
    </div>
  );
}
export default MyInform;
