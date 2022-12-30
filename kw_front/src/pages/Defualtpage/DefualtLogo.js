import image from "./광운대로고.jpg";

function DefualtLogo() {
  return (
    <div>
      <div class="flex flex-row justify-center">
        <img src={image} class="kwlogosize" />
      </div>
    </div>
  );
}

export default DefualtLogo;
