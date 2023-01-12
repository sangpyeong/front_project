import DefualtLogo from "./DefualtLogo";
import Description from "./Description";
import DefulatLogin from "./DefualtLogin";
function DefaultPage({
  setLogInModal,
  setAuth,
  setMyBirthday,
  setMyEmail,
  setMyEmployNumber,
  setMyPhoneNumber,
  setMyUserName,
  setPageIndex,
  setPasswordModal,
  setTestMode,
  setToken,
}) {
  setTestMode(false);
  setPageIndex(0);
  setAuth(0);
  setToken("");
  setMyEmployNumber("");
  setMyUserName("");
  setMyPhoneNumber("");
  setPasswordModal(false);
  setMyEmail("");
  setMyBirthday("");

  return (
    <div class="flex flex-col w-full space-y-4 my-[40px]">
      <div class="">
        <Description />
      </div>
      <div class="">
        <DefulatLogin setLogInModal={setLogInModal} />
      </div>

      <div class="">
        <DefualtLogo />
      </div>
    </div>
  );
}

export default DefaultPage;
