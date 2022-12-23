import React from "react";
function Search({ handleSubmit, value, setValue }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div class="flex flex-row justify-center">
      <form onSubmit={handleSubmit} className="flex pt-2">
        <input
          type="text"
          name="value"
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          placeholder="검색어를 입력하세요."
          value={value}
          onChange={handleChange}
        />
        <input
          value="입력"
          type="submit"
          className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
        />
      </form>
    </div>
  );
}
export default Search;

/*
<div className=" flex items-center justify-center w-screen h-screen bg-blue-100">
        <div className=" w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between mb-3 ">
            <h1>파일 검색</h1>
          </div>
          */
