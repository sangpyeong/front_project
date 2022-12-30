import DefualtLogo from "./DefualtLogo";
import Description from "./Description";
import DefulatLogin from "./DefualtLogin";
function DefaultPage({ setLogInModal }) {
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
