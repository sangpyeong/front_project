import axios from "axios";
import { useState } from "react";

function Authority({ auth }) {
  if (auth === 2) {
    return <div>관리자</div>;
  } else {
    return <div>일반사원</div>;
  }
}

function MyInform({ token, auth, myUsername }) {
  const year = [2021];
  for (var i = 0; i < 100; i++) {
    year.push(year[i - 1] - i);
  }
  console.log("token", token);
  console.log("auth", auth);
  console.log("myUsername", myUsername);
  const [detailName, setDetailName] = useState("");
  const [detailUser_idnumber, setDetailUser_idnumber] = useState("");
  const [detailtell_numberr, setDetailtell_number] = useState("");
  const [detailemail, setDetailemail] = useState("");
  const [detailbirthday, setDetailbirthday] = useState("");

  const ResponseDetail = () => {
    axios
      .post(
        "http://localhost:8000/auth/detail",
        {
          username: myUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setDetailName(res.data.name);
        setDetailUser_idnumber(res.data.user_idnumber);
        setDetailtell_number(res.data.tell_number);
        setDetailemail(res.data.email);
        setDetailbirthday(res.data.birthday);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  ResponseDetail();

  return (
    <div className="flex flex-col w-full border">
      <form>
        <div className="flex flex-row w-full h-[80px] text-2xl ml-3 mt-3">
          개인정보수정
        </div>
        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200"></div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
            {detailName}
          </div>
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
            사번
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
            {detailUser_idnumber}
          </div>
        </div>

        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
            생년월일
          </div>
          <input
            className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2 "
            type="date"
            data-placeholder={detailbirthday}
            required
            aria-required="true"
          />
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
            휴대폰
          </div>
          <input
            className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2 placeholder:text-black"
            type="tel"
            placeholder={detailtell_numberr}
          />
        </div>

        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
            e-mail
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-center ">
            <input
              className="flex items-center border w-5/6 h-11/12 border-slate-300 justify-center placeholder:text-black"
              type="email"
              placeholder={detailemail}
            />
          </div>
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
            권한
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-start pl-2">
            <Authority auth={auth} />
          </div>
        </div>

        <div className="flex flex-row justify-center h-[40px]">
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
            신규 비밀번호
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-center ">
            <input
              className="flex  items-center border w-5/6 h-11/12 border-slate-300 justify-center"
              type="password"
              placeholder="신규 비밀번호"
            />
          </div>
          <div className="flex  items-center border w-1/5 h-full border-slate-300 justify-center bg-slate-200">
            비밀번호 확인
          </div>
          <div className="flex  items-center border w-1/4 h-full border-slate-300 justify-center ">
            <input
              className="flex  items-center border w-5/6 h-11/12 border-slate-300 justify-center"
              type="password"
              placeholder="비밀번호 확인"
            />
          </div>
        </div>
        <div className="flex flex-row justify-end items-center h-[80px] pr-5">
          <input
            type="submit"
            className="pr-2 border border-slate-300  bg-slate-400 items-center flex flex-row justify-center w-[100px] h-1/2 "
          />
        </div>
      </form>
    </div>
  );
}
export default MyInform;
