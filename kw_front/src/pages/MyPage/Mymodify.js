import axios from "axios";
function Mymodify(
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
  inputNewBD,
  inputNewPassword_Second,
  inputNewTell_Number,
  inputOldPassword,
  setErrorText
) {
  if (testMode === true) {
    setAuth(0);
    setToken("");
    setTestMode(false);
  } else {
    axios
      .post(
        "http://localhost:8000/auth/modify",
        {
          userID: myUserID,
          password: inputOldPassword,
          user_idnumber: myUser_idnumber,
          name: myName,
          tell_number: mytell_number,
          email: myemail,
          birthday: mybirthday,
          new_password: inputNewPassword_Second,
          new_tell_number: inputNewTell_Number,
          new_birthday: inputNewBD,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setAuth(0);
        setToken("");
        setTestMode(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorText("이전 비밀번호를 확인하세요.");
      });
  }
}

export default Mymodify;
