import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./common/Navigation";
import OutputPage from "./pages/OutputPage/OutputPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import UploadPage from "./pages/UploadPage/UploadPage";
import Modal from "./common/Modal";

function Router() {
  const [pageIndex, setPageIndex] = useState(0);
  const [auth, setAuth] = useState(0);
  const [token, setToken] = useState("");
  const [logInModal, setLogInModal] = useState(false);
  console.log(logInModal);

  return (
    <div>
      <BrowserRouter>
        <Modal
          token={token}
          setToken={setToken}
          setAuth={setAuth}
          logInModal={logInModal}
          setLogInModal={setLogInModal}
        />
        <div>
          <Navigation
            setLogInModal={setLogInModal}
            auth={auth}
            setAuth={setAuth}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
        <div>
          <Routes>
            <Route exact path="/" element={<UploadPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/output" element={<OutputPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Router;
