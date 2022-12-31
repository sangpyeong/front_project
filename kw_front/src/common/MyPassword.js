import { NavLink } from "react-router-dom";

function MyPassword({ myPassword, setMyPassword }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row font-bold text-3xl pl-5 pt-3 pb-2">
        개인정보 확인
      </div>
      <div className="pb-2 pl-2">
        개인정보를 확인하기 위해서 비밀번호를 다시한번 입력해 주세요.
      </div>
      <input
        type="text"
        className="flex border border-slate-300 h-[40px] pl-2 mb-3"
        placeholder="현재 비밀번호"
      />
      <NavLink
        className="border-slate-200 border w-[100px] items-center flex justify-center"
        to="/profile"
        onClick={() => {
          setMyPassword(false);
        }}
      >
        test
      </NavLink>
    </div>
  );
}

export default MyPassword;
