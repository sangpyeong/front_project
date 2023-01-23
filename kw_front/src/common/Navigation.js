import { NavLink } from "react-router-dom";

function Navigation({
  setLogInModal,
  auth,
  pageIndex,
  setPageIndex,
  setPasswordModal,
}) {
  return (
    <div>
      {auth ? (
        <div class="px-[60px] h-[80px] w-full flex justify-between bg-white ">
          <NavLink className=" flex justify-center flex-col ">
            <div className="h-3/4 w-full text-4xl text-violet-600 flex items-center font-bold justify-center rounded-lg ">
              산학회
            </div>
          </NavLink>

          <div class="flex flex-row justify-around ">
            <NavLink
              to="/upload"
              onClick={() => {
                setPageIndex(1);
              }}
              className="px-[100px] flex justify-center flex-col "
            >
              <div className="h-3/4 w-full text-[20px] flex items-center font-bold hover:text-violet-600 duration-300 justify-center rounded-lg ">
                파일 업로드
              </div>
            </NavLink>

            <NavLink
              to="/search"
              onClick={() => {
                setPageIndex(2);
              }}
              className="px-[100px] flex justify-center flex-col "
            >
              <div className="h-3/4 w-full text-[20px] flex items-center font-bold hover:text-blue-700 justify-center rounded-lg ">
                파일 검색
              </div>
            </NavLink>
          </div>

          <button
            onClick={() => {
              setPasswordModal(true);
            }}
            className="w-[100px]  flex justify-center flex-col  "
          >
            <div className="h-[44px] w-full text-[16px] text-white flex items-center font-bold bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500  justify-center rounded-lg ">
              MY
            </div>
          </button>
        </div>
      ) : (
        <NavLink to="/"></NavLink>
      )}
    </div>
  );
}

export default Navigation;
