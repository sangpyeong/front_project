import axios from "axios";
import { useState } from "react";

function Register({ setModalContent, setAuth, setLogInModal }) {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputIDNumber, setInputIDNumber] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputBD, setInputBD] = useState("");
  const [errorText, setErrorText] = useState("");

  const onChangeID = (e) => {
    setInputID(e.target.value);
  };
  const onChangePW = (e) => {
    setInputPW(e.target.value);
  };
  const onChangeName = (e) => {
    setInputName(e.target.value);
  };
  const onChangeIDNumber = (e) => {
    setInputIDNumber(e.target.value);
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
          user_idnumber: inputIDNumber,
          hased_pw: inputPW,
          name: inputName,

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
        산학회
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
          <div class="w-1/4">한글이름</div>
          <input
            onChange={onChangeName}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="text"
            placeholder="한글이름"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">사번</div>
          <input
            onChange={onChangeIDNumber}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="number"
            placeholder="사번"
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">휴대폰</div>
          <input
            onChange={onChangeEmail}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="tel"
            placeholder="예)010-1234-5678"
            required
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">e-mail</div>
          <input
            onChange={onChangeEmail}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="email"
            placeholder="이메일"
            required
          />
        </div>
        <div class="flex justify-between mt-[20px]">
          <div class="w-1/4">생년월일</div>
          <input
            onChange={onChangeBD}
            class=" w-3/4 border-solid border-[1px] border-black "
            type="date"
            placeholder="생년월일"
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
