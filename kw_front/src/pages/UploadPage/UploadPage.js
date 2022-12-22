import Upload from "./Upload";
import Description from "./Description";
function UploadPage() {
  return (
    <div class="flex flex-col w-full">
      <div>
        <Description />
      </div>
      <div>
        <Upload />
      </div>
    </div>
  );
}

export default UploadPage;
