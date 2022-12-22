import { NavLink } from "react-router-dom";

function Navigation({ setLogInModal, auth, pageIndex, setPageIndex }) {
  return (
    <div class="flex-col w-12/12">
      <div class="flex flex-row justify-around w-12/12">
        <NavLink
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => {
            setPageIndex(0);
          }}
        >
          <div className="column">LOGO</div>
        </NavLink>
        <NavLink
          to="/upload"
          style={{ textDecoration: "none" }}
          onClick={() => {
            setPageIndex(1);
          }}
        >
          <div className="column">파일 업로드</div>
        </NavLink>
        <NavLink
          to="/search"
          style={{ textDecoration: "none" }}
          onClick={() => {
            setPageIndex(2);
          }}
        >
          <div>파일 검색</div>
        </NavLink>
        <NavLink
          to="/search"
          style={{ textDecoration: "none" }}
          onClick={() => {
            setPageIndex(3);
          }}
        >
          <div>로그인</div>
        </NavLink>
      </div>
      <div class="w-12/12 h-0 border-y-2 bg-gray-100"></div>
    </div>
  );
}

export default Navigation;
