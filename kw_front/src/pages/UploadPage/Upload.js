import image from "./다운로드.png";

function Upload() {
  return (
    <div>
      <div class="flex flex-row justify-center">
        <img src={image} class="" />
      </div>
      <div class="flex flex-row justify-center">
        <input type="file" multiple={true} id="fileUpload" />
      </div>
    </div>
  );
}

export default Upload;
