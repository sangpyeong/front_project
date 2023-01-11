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
  inputNewEmail,
  inputNewPassword_First,
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
    console.log("testMode", testMode);
    console.log("inputNewBD", inputNewBD);
    console.log("inputNewEmail", inputNewEmail);
    console.log("inputNewPassword_First", inputNewPassword_First);
    console.log("inputNewPassword_Second", inputNewPassword_Second);
    console.log("inputNewTell_Number", inputNewTell_Number);
    console.log("inputOldPassword", inputOldPassword);
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
          new_email: inputNewEmail,
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
