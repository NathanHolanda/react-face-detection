import { useState } from "react";
import "./App.css";
import * as faceapi from "face-api.js";

function App() {
  const [currentImg, setCurrentImg] = useState<HTMLImageElement>();

  const images = [
    "cat.jpg",
    "coffee.jpg",
    "man-with-sunglasses.jpg",
    "woman-in-couch.jpg",
    "child.jpg",
    "dog.jpg",
    "market.jpg",
    "woman.jpg",
    "clothing.jpg",
    "green-landscape.jpg",
    "shark.jpg",
    "women.jpg",
  ];

  const detectFace = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

    if (currentImg) {
      const result = await faceapi.tinyFaceDetector(
        currentImg,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (result.length > 0 && result[0].score > 0.5) {
        currentImg.classList.add("face");
      } else {
        currentImg.classList.add("not-a-face");
      }

      console.log(currentImg.src, result);
    }
  };

  return (
    <div className="container">
      <div className="mosaic">
        {images.map((image) => (
          <img
            src={`img/${image}`}
            className="image"
            onClick={(e) => setCurrentImg(e.target as HTMLImageElement)}
          />
        ))}
      </div>
      <button onClick={() => detectFace()}>Detectar rosto</button>
    </div>
  );
}

export default App;
