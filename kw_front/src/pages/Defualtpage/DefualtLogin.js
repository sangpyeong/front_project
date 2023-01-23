function DefulatLogin({ setLogInModal }) {
  return (
    <div>
      <div class="flex flex-row justify-center ">
        <button
          onClick={() => {
            setLogInModal(true);
          }}
          class="w-[200px] h-[100px]  bg-cyan-300 hover:bg-cyan-400 active:bg-cyan-500 focus:outline-none focus:ring focus:ring-cyan-200 cursor-pointer rounded shadow"
        >
          <div class="text-center text-[40px] font-bold">로그인</div>
        </button>
      </div>
    </div>
  );
}

export default DefulatLogin;

//text-center text-[55px] font-bold
