import axios from "axios";
import { useState } from "react";

function Register({ setModalContent, setAuth, setLogInModal }) {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [inputFName, setInputFName] = useState("");
  const [inputLName, setInputLName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputBD, setInputBD] = useState("");
  const [errorText, setErrorText] = useState("");

  const onChangeID = (e) => {
    setInputID(e.target.value);
  };
  const onChangePW = (e) => {
    setInputPW(e.target.value);
  };
  const onChangeFName = (e) => {
    setInputFName(e.target.value);
  };
  const onChangeLName = (e) => {
    setInputLName(e.target.value);
  };
  const onChangeNickName = (e) => {
    setInputNickName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const onChangeBD = (e) => {
    setInputBD(e.target.value);
  };

  const regist = () => {
    axios
      .post(
        "https://디비주소/auth/register", //DB 프로젝트에서 가져옴
        {
          username: inputID,
          user_nickname: inputNickName,
          hased_pw: inputPW,
          name: {
            first: inputFName,
            last: inputLName,
          },
          email: inputEmail,
          birthday: inputBD,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setModalContent(0);
      })
      .catch((err) => {
        console.log(err);
        setErrorText("회원가입 정보를 확인해주세요.");
      });
  };

  return (
    <div class="mx-[40px]">
      <div class="h-[40px] text-center text-[55px] font-bold leading-[40px] m-[20px] mt-[40px] mb-[40px]">
        LOGO
        <div></div>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">ID</div>
          <input
            onChange={onChangeID}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="text"
            placeholder="아이디"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">비밀번호</div>
          <input
            onChange={onChangePW}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">성</div>
          <input
            onChange={onChangeLName}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="text"
            placeholder="성"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">이름</div>
          <input
            onChange={onChangeFName}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="text"
            placeholder="이름"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">별명</div>
          <input
            onChange={onChangeNickName}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="text"
            placeholder="별명"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">이메일</div>
          <input
            onChange={onChangeEmail}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="email"
            placeholder="이메일"
            required
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">생일</div>
          <input
            onChange={onChangeBD}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="date"
            placeholder="생일"
          />
        </div>
      </div>
      <div class="flex flex-col justify-center mt-[20px] mb-[40px]">
        <div class=" text-red-600 text-center text-[15px] mb-[10px]">
          {errorText}
        </div>
        <div
          class="w-full text-center text-black bg-cyan-300 cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]"
          onClick={() => {
            regist();
          }}
        >
          REGISTER
        </div>
        <div
          class="w-full text-center text-black bg-white cursor-pointer border-solid border-[1px] border-black text-[15px] h-[30px] leading-[30px] mb-[10px]"
          onClick={() => {
            setModalContent(0);
          }}
        >
          CANCEL
        </div>
      </div>
    </div>
  );
}

export default Register;
