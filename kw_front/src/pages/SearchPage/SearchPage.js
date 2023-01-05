import Search from "./Search";
import Description from "./Description";
import Output from "./Output";
function SearchPage() {
  return (
    <div class="flex flex-col w-full space-y-4">
      <div>
        <Description />
      </div>
      <div>
        <Search />
      </div>
      <div>
        <Output />
      </div>
    </div>
  );
}

export default SearchPage;
