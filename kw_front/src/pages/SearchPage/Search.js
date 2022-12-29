function Search({ handleSubmit, value, setValue }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div class="flex flex-row justify-center">
      <form onSubmit={handleSubmit} className="flex pt-2">
        <input
          type="text"
          name="value"
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          placeholder="검색어를 입력하세요."
          value={value}
          onChange={handleChange}
        />
        <input
          value="입력"
          type="submit"
          className="p-2 text-cyan-300 border-2 border-cyan-300 rounded hover:text-white hover:bg-cyan-300"
        />
      </form>
    </div>
  );
}
export default Search;
