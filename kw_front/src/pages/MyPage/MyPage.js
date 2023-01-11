import { NavLink } from "react-router-dom";
import MyInform from "./MyInform";

function MyPage({
  testMode,
  setTestMode,
  token,
  setToken,
  auth,
  setAuth,
  myUserID,
  myName,
  myUser_idnumber,
  mytell_number,
  myemail,
  mybirthday,
  setMyName,
  setMyUser_idnumber,
  setMytell_number,
  setMyemail,
  setMybirthday,
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-end pr-5 pt-5 pb-5">
        <NavLink
          className="border text-1xl  w-[100px] text-center"
          to="/"
          onClick={() => {
            setAuth(0);
            setToken("");
            setTestMode(false);
          }}
        >
          로그아웃
        </NavLink>
      </div>

      <MyInform
        testMode={testMode}
        setTestMode={setTestMode}
        token={token}
        setToken={setToken}
        auth={auth}
        setAuth={setAuth}
        myUserID={myUserID}
        myName={myName}
        myUser_idnumber={myUser_idnumber}
        mytell_number={mytell_number}
        myemail={myemail}
        mybirthday={mybirthday}
        setMyName={setMyName}
        setMyUser_idnumber={setMyUser_idnumber}
        setMytell_number={setMytell_number}
        setMyemail={setMyemail}
        setMybirthday={setMybirthday}
      />
    </div>
  );
}

export default MyPage;
