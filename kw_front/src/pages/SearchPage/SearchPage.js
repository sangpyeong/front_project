import React from "react";
import { useState } from "react";
import Search from "./Search";
import Description from "./Descroption";
import Output from "./Output";
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
    <div class="flex flex-col w-full space-y-4">
      <div>
        <Description />
      </div>
      <div>
        <Search handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
      <div>
        <Output />
      </div>
    </div>
  );
}

export default SearchPage;
