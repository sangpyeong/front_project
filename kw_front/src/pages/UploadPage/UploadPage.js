import Upload from "./Upload";
import Description from "./Description";
function UploadPage() {
  return (
    <div class="flex flex-col w-full h-full">
      <div className="flex flex-col h-1/3">
        <Description />
      </div>
      <div>
        <Upload />
      </div>
    </div>
  );
}

export default UploadPage;
