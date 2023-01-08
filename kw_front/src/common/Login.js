import axios from "axios"; //통신
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"; //보안
import { NavLink, useNavigate } from "react-router-dom";

function Login({
  token,
  setToken,
  setModalContent,
  auth,
  setAuth,
  setLogInModal,
}) {
  const navigate = useNavigate();
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [errorText, setErrorText] = useState("");
  const onChangeID = (e) => {
    setInputID(e.target.value);
  };
  const onChangePW = (e) => {
    setInputPW(e.target.value);
  };

  const test_login = () => {
    setAuth(1);
    setLogInModal(false);
  };
  const admin_test_login = () => {
    setAuth(2);
    setLogInModal(false);
  };
  const login = () => {
    axios
      .post(
        "http://localhost:8000/auth/login",
        {
          username: inputID,
          password: inputPW,
        },
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setToken(res.data.access_token);
        console.log("이게 뭘까?", res.data.access_token);
        setAuth(2);
        setLogInModal(false);
        navigate("/search");
        /***********************************************
        if (jwt_decode(res.data.access_token).admin) {
          setAuth(2);
        } else {
          setAuth(1);
        }
        setLogInModal(false);
        *************************************************/
      })

      .catch((err) => {
        console.log(err.response.data.detail);
        setErrorText("아이디와 비밀번호를 확인하세요.");
      });

    /************************************************
      .then((res) => {
        setToken(res.data.access_token);
        axios
          .post(
            "http://localhost:8000/user/balance/makeAccount",
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
      ****************************************************/
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
          to="/search"
          onClick={() => {
            test_login();
          }}
        >
          <div class="w-full text-center text-black bg-cyan-300 cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]">
            TEST LOG IN (일반사원)
          </div>
        </NavLink>
        <NavLink
          to="/search"
          onClick={() => {
            admin_test_login();
          }}
        >
          <div class="w-full text-center text-black bg-cyan-300 cursor-pointer text-[15px] h-[30px] leading-[30px] mb-[10px]">
            TEST LOG IN (관리자)
          </div>
        </NavLink>
      </div>
    </div>
  );
}
export default Login;
