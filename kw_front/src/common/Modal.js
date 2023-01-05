import { useRef, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import MyPassword from "./MyPassword";

function Modal({
  token,
  setToken,
  auth,
  setAuth,
  logInModal,
  setLogInModal,
  myPassword,
  setMyPassword,
  setPageIndex,
}) {
  console.log(auth);
  const [modalContent, setModalContent] = useState(0);
  const ModalBG = useRef();
  return (
    <div className="z-30 w-full fixed text-5xl ">
      {logInModal ? (
        <div
          class="background"
          ref={ModalBG}
          onClick={(e) => {
            if (ModalBG.current === e.target) {
              setLogInModal(false);
            }
          }}
        >
          <div className="z-25 w-1/3 bg-white fixed left-1/3 top-1/4 p-2.5 text-lg ">
            {modalContent === 0 ? (
              <Login
                token={token}
                setToken={setToken}
                setModalContent={setModalContent}
                auth={auth}
                setAuth={setAuth}
                setLogInModal={setLogInModal}
              />
            ) : (
              <Register
                setModalContent={setModalContent}
                setAuth={setAuth}
                setLogInModal={setLogInModal}
              />
            )}
          </div>
        </div>
      ) : null}
      {myPassword ? (
        <div
          class="background"
          ref={ModalBG}
          onClick={(e) => {
            if (ModalBG.current === e.target) {
              setMyPassword(false);
              setPageIndex(3);
            }
          }}
        >
          <div className="z-25 w-1/3 bg-white fixed left-1/3 top-1/4 p-2.5 text-lg ">
            <MyPassword myPassword={myPassword} setMyPassword={setMyPassword} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
