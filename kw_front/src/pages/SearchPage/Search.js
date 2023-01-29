import axios from "axios";

function Search({ searchIndex, setSearchIndex, setOutput, output }) {
  let testfilelist = [
    {
      filename: "표지1",
      filepath: "a1/b/c",
      fileimg: "a1.jpg",
      fileindex: "qwerasdfzxcvqwerasd",
    },
    {
      filename: "표지2",
      filepath: "a2/b/c",
      fileimg: "a2.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지3",
      filepath: "a3/b/c",
      fileimg: "a3.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지4",
      filepath: "a4/b/c",
      fileimg: "a4.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지5",
      filepath: "a5/b/c",
      fileimg: "a5.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지6",
      filepath: "a6/b/c",
      fileimg: "a6.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지7",
      filepath: "a7/b/c",
      fileimg: "a7.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지8",
      filepath: "a8/b/c",
      fileimg: "a8.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지9",
      filepath: "a9/b/c",
      fileimg: "a9.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지10",
      filepath: "a10/b/c",
      fileimg: "a10.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지11",
      filepath: "a11/b/c",
      fileimg: "a11.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지12",
      filepath: "a12/b/c",
      fileimg: "a12.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지13",
      filepath: "a13/b/c",
      fileimg: "a13.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
    {
      filename: "표지14",
      filepath: "a14/b/c",
      fileimg: "a14.jpg",
      fileindex: "qwerasdfzxcvqwerasdfzxcvqewrasxcvqwerasdfzxcvwqerasdfzxcv",
    },
  ];

  const onchangesearchindex = (e) => {
    setSearchIndex(e.target.value);
  };
  const handleSubmit = (e) => {
    //로컬서버에 검색 인덱스 전달하는 함수
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    console.log("searchindex", searchIndex);
    e.preventDefault();
    setOutput(testfilelist);
    console.log("testfilelist: ", testfilelist);

    axios
      .post(
        "http://localhost:8000/index",
        {
          searchIndex: searchIndex,
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
        //setOutput((prev)=>{prev = [...res.filelist]})
        //setOutput(testfilelist);
        //console.log("testfilelist: ", testfilelist);
        setSearchIndex(""); // 입력란에 있던 글씨 지워주기
      })
      .catch((err) => {
        console.log(err.response);
        //setOutput(testfilelist);
        //console.log("testfilelist: ", testfilelist);
        setSearchIndex(""); // 입력란에 있던 글씨 지워주기
      });
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-[10%] pt-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-center w-[30%]"
      >
        <input
          type="text"
          name="value"
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          placeholder="검색어를 입력하세요."
          value={searchIndex}
          onChange={onchangesearchindex}
        />
        <input
          value="입력"
          type="submit"
          className="p-2 text-[#6c59ce] border-2 border-[#6c59ce] hover:border-[#e4e1f1] rounded-[6px] hover:text-white cursor-pointer hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500 "
        />
      </form>
    </div>
  );
}
export default Search;
