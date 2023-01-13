import { NavLink } from "react-router-dom";
import MyInform from "./MyInform";

function MyPage({
  testMode,
  setTestMode,
  token,
  setToken,
  auth,
  setAuth,
  myEmployNumber,
  myUserName,
  myPhoneNumber,
  myEmail,
  myBirthday,
  setMyUserName,
  setMyPhoneNumber,
  setMyEmail,
  setMyBirthday,
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
        myEmployNumber={myEmployNumber}
        myUserName={myUserName}
        myPhoneNumber={myPhoneNumber}
        myEmail={myEmail}
        myBirthday={myBirthday}
        setMyUserName={setMyUserName}
        setMyPhoneNumber={setMyPhoneNumber}
        setMyEmail={setMyEmail}
        setMyBirthday={setMyBirthday}
      />
    </div>
  );
}

export default MyPage;
