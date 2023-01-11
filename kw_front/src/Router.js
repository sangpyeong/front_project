import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./common/Navigation";
import SearchPage from "./pages/SearchPage/SearchPage";
import UploadPage from "./pages/UploadPage/UploadPage";
import DefaultPage from "./pages/Defualtpage/DefualtPage";
import MyPage from "./pages/MyPage/MyPage";
import Modal from "./common/Modal";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./common/AdminPrivateRoute";

function Router() {
  const [testMode, setTestMode] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);

  const [auth, setAuth] = useState(0);
  const [token, setToken] = useState("");

  const [logInModal, setLogInModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const [myUserID, setMyUserID] = useState("");

  const [myName, setMyName] = useState("");
  const [myUser_idnumber, setMyUser_idnumber] = useState("");
  const [mytell_number, setMytell_number] = useState("");
  const [myemail, setMyemail] = useState("");
  const [mybirthday, setMybirthday] = useState("");

  console.log("실행");

  return (
    <div class="flex flex-col font-sans">
      <BrowserRouter>
        <Modal
          setTestMode={setTestMode}
          token={token}
          setToken={setToken}
          setAuth={setAuth}
          logInModal={logInModal}
          setLogInModal={setLogInModal}
          passwordModal={passwordModal}
          setPasswordModal={setPasswordModal}
          myUserID={myUserID}
          setMyUserID={setMyUserID}
          setPageIndex={setPageIndex}
        />
        <div className="h-14 w-full fixed z-20">
          <Navigation
            setLogInModal={setLogInModal}
            auth={auth}
            setAuth={setAuth}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setPasswordModal={setPasswordModal}
          />
        </div>
        <div className="py-14 h-full w-full flex justify-center overflow-y-auto">
          <div className="h-full w-[80%] bg-white padd px-3.5">
            <Routes>
              <Route
                exact
                path="/"
                element={<DefaultPage setLogInModal={setLogInModal} />}
              />
              <Route
                exact
                path="/front_project"
                element={<DefaultPage setLogInModal={setLogInModal} />}
              />
              <Route
                path="/upload"
                element={
                  <AdminPrivateRoute
                    authenticated={auth}
                    component={<UploadPage />}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <PrivateRoute
                    authenticated={auth}
                    component={<SearchPage />}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    authenticated={auth}
                    component={
                      <MyPage
                        testMode={testMode}
                        setTestMode={setTestMode}
                        token={token}
                        setToken={setToken}
                        auth={auth}
                        setAuth={setAuth}
                        myUserID={myUserID}
                        myName={myName}
                        myUser_idnumber={myUser_idnumber}
                        mytell_number={mytell_number}
                        myemail={myemail}
                        mybirthday={mybirthday}
                        setMyName={setMyName}
                        setMyUser_idnumber={setMyUser_idnumber}
                        setMytell_number={setMytell_number}
                        setMyemail={setMyemail}
                        setMybirthday={setMybirthday}
                      />
                    }
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Router;
