import * as THREE from "three";


const jqUserImage = $("#userImage");

jqUserImage.change(function () {
  const image = document.createElement('img');

  let texture = new THREE.Texture(image);

  image.onload = function () {
    texture.needsUpdate = true;
    globalThis.cupOutside.material.map = texture;
    globalThis.cupOutside.material.needsUpdate = true;
  };

  const fileData = jqUserImage.prop('files')[0];

  const reader = new FileReader();

  reader.onload = function (e) {
    image.src = e.target.result;
  };

  reader.readAsDataURL(fileData);
});