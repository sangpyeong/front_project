function Output({ output }) {
  return (
    <div className="flex flex-row justify-center items-center w-full h-[60%] mt-5">
      <div className="flex flex-row justify-center items-center w-[8%] h-full border rounded-[6px]">
        정렬기준
      </div>
      <div className="w-[2%]"></div>
      <div className="flex flex-row justify-center items-center w-[60%] h-full border rounded-[6px]">
        {output[0].filename}
      </div>
    </div>
  );
}

export default Output;
