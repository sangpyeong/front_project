import { useState } from "react";
import { NavLink } from "react-router-dom";
import MyInform from "./MyInform";

function MyPage({ token, setToken, auth, setAuth }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-end">
        <NavLink
          className="border text-1xl mt-[10px] w-[100px] text-center"
          to="/"
          onClick={() => {
            setAuth(0);
            setToken(null);
          }}
        >
          로그아웃
        </NavLink>
      </div>

      <MyInform token={token} />
    </div>
  );
}

export default MyPage;
