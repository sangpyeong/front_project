import { NavLink } from "react-router-dom";

function Navigation({ setLogInModal, auth, pageIndex, setPageIndex }) {
  return (
    <div class="w-full flex justify-center bg-cyan-300">
      <div class="flex flex-row justify-around w-11/12 h-14">
        {auth ? (
          <NavLink className="w-1/4 flex justify-center flex-col">
            <div className="h-3/4 w-full text-4xl flex items-center font-bold justify-center rounded-lg">
              산학회
            </div>
          </NavLink>
        ) : (
          <NavLink
            to="/"
            onClick={() => {
              setPageIndex(0);
            }}
            className="w-1/4 flex justify-center flex-col"
          >
            <div className="h-3/4 w-full text-4xl flex items-center font-bold hover:bg-cyan-500 justify-center rounded-lg">
              산학회
            </div>
          </NavLink>
        )}
        <NavLink
          to="/upload"
          onClick={() => {
            setPageIndex(1);
          }}
          className="w-1/4 flex justify-center flex-col"
        >
          <div className="h-3/4 w-full text-2xl flex items-center font-bold hover:bg-cyan-500 justify-center rounded-lg">
            파일 업로드
          </div>
        </NavLink>
        <NavLink
          to="/search"
          onClick={() => {
            setPageIndex(2);
          }}
          className="w-1/4 flex justify-center flex-col"
        >
          <div className="h-3/4 w-full text-2xl flex items-center font-bold hover:bg-cyan-500 justify-center rounded-lg">
            파일 검색
          </div>
        </NavLink>
        <NavLink
          to="/profile"
          onClick={() => {
            setPageIndex(3);
          }}
          className="w-1/4 flex justify-center flex-col"
        >
          <div className="h-3/4 w-full text-2xl flex items-center font-bold hover:bg-cyan-500 justify-center rounded-lg">
            MY
          </div>
        </NavLink>
      </div>
      <div class="w-12/12 h-0 border-y-2 bg-gray-100"></div>
    </div>
  );
}

export default Navigation;
