import axios from "axios"; //통신
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"; //보안
import { NavLink } from "react-router-dom";

function Login({ token, setToken, setModalContent, setAuth, setLogInModal }) {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [errorText, setErrorText] = useState("");
  const onChangeID = (e) => {
    setInputID(e.target.value);
  };
  const onChangePW = (e) => {
    setInputPW(e.target.value);
  };
  const test = () => {
    setAuth(2);
  };
  const login = () => {
    axios
      .post(
        "https://디비주소/auth/login/token", //DB 프로젝트에서 가져옴
        {
          username: inputID,
          password: inputPW,
        },
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded", //DB 프로젝트에서 가져옴
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setToken(res.data.access_token);
        axios
          .post(
            "https://디비주소/user/balance/makeAccount", //DB 프로젝트에서 가져옴
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(console.log("makeAccount Success"))
          .catch(console.log("makeAccount Fail"));
        if (jwt_decode(res.data.access_token).admin) {
          setAuth(2);
        } else {
          setAuth(1);
        }
        setLogInModal(false);
      })
      .catch((err) => {
        console.log(err.response.data.detail);
        setErrorText("아이디와 비밀번호를 확인하세요.");
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
        <div class="flex justify-between mt-[20px] mb-[20px]">
          <div
            class="text-[13px] text-gray-400 cursor-pointer hover:text-black hover:translate-y-[12px] duration-75"
            onClick={() => {
              setModalContent(1);
            }}
          >
            회원가입
          </div>
          <div class="text-[13px] text-gray-400 cursor-pointer hover:text-black hover:translate-y-[12px] duration-75">
            아이디/비밀번호 찾기
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center mt-[20px] mb-[40px]">
        <div class=" text-red-600 text-center text-[15px] mb-[10px]">
          {errorText}
        </div>

        <div
          class="w-full text-center text-black bg-cyan-300 cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]"
          onClick={() => {
            login();
          }}
        >
          LOG IN
        </div>
        <NavLink
          to="/upload"
          onClick={() => {
            setAuth(1);
            //setPageIndex(1);
            setLogInModal(false);
          }}
        >
          test 회원
        </NavLink>
        <button
          onClick={() => {
            setAuth(2);
          }}
        >
          test 관리자
        </button>
        <button
          onClick={() => {
            setAuth(0);
          }}
        >
          test logout
        </button>
      </div>
    </div>
  );
}
export default Login;
