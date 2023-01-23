import Search from "./Search";
import Description from "./Description";
import Output from "./Output";
function SearchPage() {
  return (
    <div class="flex flex-col  w-[100vw] h-[80vh]">
      <Description />
      <Search />
      <Output />
    </div>
  );
}

export default SearchPage;
