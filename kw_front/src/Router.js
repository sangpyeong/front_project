import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./common/Navigation";
import SearchPage from "./pages/SearchPage/SearchPage";
import UploadPage from "./pages/UploadPage/UploadPage";
import DefaultPage from "./pages/Defualtpage/DefualtPage";
import MyPage from "./pages/MyPage/MyPage";
import Modal from "./common/Modal";
import PrivateRoute from "./PrivateRoute";

function Router() {
  const [pageIndex, setPageIndex] = useState(0);
  const [auth, setAuth] = useState(0);
  const [token, setToken] = useState("");
  const [logInModal, setLogInModal] = useState(false);
  console.log(auth);

  return (
    <div class="flex flex-col font-sans">
      <BrowserRouter>
        <Modal
          token={token}
          setToken={setToken}
          setAuth={setAuth}
          logInModal={logInModal}
          setLogInModal={setLogInModal}
        />
        <div className="h-14 w-full fixed z-20">
          <Navigation
            setLogInModal={setLogInModal}
            auth={auth}
            setAuth={setAuth}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
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
                path="/upload"
                element={
                  <PrivateRoute
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
                  <PrivateRoute authenticated={auth} component={<MyPage />} />
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
