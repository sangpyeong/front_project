import axios from "axios";
import { useState } from "react";

function FindIDPassword({ setModalContent }) {
  const [inputName, setInputName] = useState("");
  const [inputIDNumber, setInputIDNumber] = useState("");
  const [inputTellnumber, setInputTellnumber] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputBD, setInputBD] = useState("");

  const [errorText, setErrorText] = useState("");
  const [successText1, setSuccessText1] = useState("");
  const [successText2, setSuccessText2] = useState("");
  const [foundID, setFoundID] = useState("");
  const [foundPassword, setFoundPassword] = useState("");

  const onChangeName = (e) => {
    setInputName(e.target.value);
  };
  const onChangeIDNumber = (e) => {
    setInputIDNumber(e.target.value);
  };
  const onChangeTellnumber = (e) => {
    setInputTellnumber(e.target.value);
  };
  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const onChangeBD = (e) => {
    setInputBD(e.target.value);
  };

  function alertFunc() {
    setSuccessText1("");
    setFoundID("");
    setSuccessText2("");
    setFoundPassword("");
  }

  const find = () => {
    axios
      .post(
        "http://localhost:8000/auth/find", //DB 프로젝트에서 가져옴
        {
          user_idnumber: inputIDNumber,
          name: inputName,
          tell_number: inputTellnumber,
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
        setErrorText("");
        setSuccessText1("아이디 :");
        setFoundID(res.data.userID);
        setSuccessText2("비밀번호 :");
        setFoundPassword(res.data.password);
        setTimeout(alertFunc, 2000); //2초후에 실행
      })
      .catch((err) => {
        console.log(err);
        setSuccessText1("");
        setFoundID("");
        setSuccessText2("");
        setFoundPassword("");
        setErrorText("사용자 정보를 확인해주세요.");
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
            onChange={onChangeTellnumber}
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
        <div class="  text-[#ff0000] font-bold text-center text-[15px] mb-[10px]">
          {errorText}
          {successText1}&nbsp;
          {foundID}&nbsp;
          {successText2}&nbsp;
          {foundPassword}
        </div>
        <div
          class="w-full text-center text-black bg-cyan-300 cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]"
          onClick={() => {
            find();
          }}
        >
          FIND
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
export default FindIDPassword;
