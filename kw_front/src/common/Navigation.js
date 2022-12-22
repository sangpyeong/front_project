import { NavLink } from "react-router-dom";

function Navigation({ setLogInModal, auth, pageIndex, setPageIndex }) {
  return (
    <div>
      <div>
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
          to="/output"
          style={{ textDecoration: "none" }}
          onClick={() => {
            setPageIndex(3);
          }}
        >
          <div>검색 결과</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
