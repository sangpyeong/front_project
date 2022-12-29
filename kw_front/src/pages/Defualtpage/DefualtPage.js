import DefualtLogo from "./DefualtLogo";
import Description from "./Description";
function DefaultPage() {
  return (
    <div class="flex flex-col w-full space-y-4 my-[40px] border">
      <div class="border">
        <Description />
      </div>

      <div class="border">
        <DefualtLogo />
      </div>
    </div>
  );
}

export default DefaultPage;
