import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPassword({ myUsername, setMyPassword, token }) {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [inputPW, setInputPW] = useState("");
  const onChangePW = (e) => {
    setInputPW(e.target.value);
  };

  const test_login = () => {
    navigate("/profile");
    setMyPassword(false);
  };
  const login = () => {
    console.log("token", token);
    console.log(myUsername, inputPW);
    axios
      .post(
        "http://localhost:8000/auth/check",
        {
          username: myUsername,
          password: inputPW,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/profile");
        setMyPassword(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorText("비밀번호를 확인하세요.");
      });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row font-bold text-3xl pl-5 pt-3 pb-2">
        개인정보 확인
      </div>
      <div className="pb-2 pl-2">
        개인정보를 확인하기 위해서 비밀번호를 다시한번 입력해 주세요.
      </div>
      <input
        type="password"
        className="flex border border-slate-300 h-[40px] pl-2 mb-3"
        placeholder="현재 비밀번호"
        onChange={onChangePW}
      />
      <div class="flex flex-col justify-center ">
        <div class=" text-red-600 text-center text-[15px] ">{errorText}</div>
        <div
          className=" text-black bg-cyan-300 w-[100px] items-center flex justify-center cursor-pointer mb-[10px]"
          onClick={() => {
            login();
          }}
        >
          확인
        </div>
        <div
          className="border-slate-200 border w-[100px] items-center flex justify-center cursor-pointer mb-[10px]"
          onClick={() => {
            test_login();
          }}
        >
          test
        </div>
      </div>
    </div>
  );
}

export default MyPassword;
