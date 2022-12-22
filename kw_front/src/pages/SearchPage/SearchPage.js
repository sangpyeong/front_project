import React from "react";
import { useState } from "react";
import Search from "./Search";
function SearchPage() {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    console.log("value", value);
    e.preventDefault();
    // 입력란에 있던 글씨 지워주기
    setValue("");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>파일 검색</h1>
        </div>
        <Search handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}

export default SearchPage;
