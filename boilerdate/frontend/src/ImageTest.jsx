import React from "react";

function ImageTest() {
  const imageName = "profile-image-1708896331711.jpg";
  console.log(imageName);
  const imageUrl = `http://localhost:3001/image/${imageName}`; // Replace PORT with your actual server port

  return (
    <div>
      <h2>where is my image</h2>
      <img src={imageUrl} alt="Uploaded Content" />
    </div>
  );
}

export default ImageTest;
