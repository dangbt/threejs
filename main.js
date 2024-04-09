import * as THREE from "three";

import WebGL from "three/addons/capabilities/WebGL.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import Plane from "./plane";
import LightBulb from "./light-bulb";
import Ball from "./ball";

let lightBulb1;
const DEFAULT_CUP_X = 10;
const DEFAULT_CUP_Y = 0;
const DEFAULT_CUP_Z = 10;

const scene = new THREE.Scene();
const plan = new Plane(scene);
const lightBulb = new LightBulb(scene);
const ball1 = new Ball(scene);

plan.create();
ball1.create(12, 0.25, 12);
lightBulb1 = lightBulb.create();

scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


camera.position.set(30, 10, 30);
camera.lookAt(8, 0, 4); //
let cup, whiteTexture, cartonTexture;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  const time = Date.now() * 0.001;
  lightBulb1.position.y = Math.cos(time) * 0.75 + 1.25;
  if (cup) {
    cup.rotation.z += 0.01
  }
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

// /// check browser support 3D
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}

load();

const textureLoader = new THREE.TextureLoader();

whiteTexture = textureLoader.load("image/FingerPrints.jpg");
cartonTexture = textureLoader.load("image/carton.jpg");

function load() {
  const loadingManager = new THREE.LoadingManager();

  loadingManager.onProgress = function (item, loaded, total) {
    if (loaded === total) initWithParam();
  };

  const loader = new GLTFLoader();

  loader.load(
    "./models/cup2.gltf",
    function (gltf) {
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          cup = child;
          cup.material = new THREE.MeshStandardMaterial();
          cup.scale.set(0.2, 0.2, 0.2);
          cup.castShadow = true;
        }
      });
      gltf.scene.position.x = DEFAULT_CUP_X;
      gltf.scene.position.y = DEFAULT_CUP_Y;
      gltf.scene.position.z = DEFAULT_CUP_Z;
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function changeAllCupTexture(texture) {
  var material = new THREE.MeshBasicMaterial({ map: texture });
  cup.material = material;
}

function changeAllCupColor(color) {
  var material = new THREE.MeshStandardMaterial({ color });
  cup.material = material;
}

function changeCupTexture(isWhite) {
  if (isWhite) changeAllCupTexture(whiteTexture);
  else changeAllCupTexture(cartonTexture);
}

const handleCheckInput = () => {
  const jqWhiteCarton = $("#white-carton");
  const inputColor = $("#input-color");

  jqWhiteCarton.click(function () {
    changeCupTexture(this.checked);
  });

  inputColor.change((e) => {
    const color = e.target.value;
    changeAllCupColor(color);
  });
};

const changeCupPosition = (x, y, z) => {
  if (cup) {
    cup.position.x = Number(x) - DEFAULT_CUP_X;
    cup.position.y = Number(y) - DEFAULT_CUP_Y;
    cup.position.z = Number(z) - DEFAULT_CUP_Z;
  }
};

const handleChangeCupXYZ = () => {
  const cupX = $("#cup-x");
  const cupY = $("#cup-y");
  const cupZ = $("#cup-z");

  cupX.val(DEFAULT_CUP_X)
  cupY.val(DEFAULT_CUP_Y)
  cupZ.val(DEFAULT_CUP_Z)

  cupX.change((e) => {
    const positionY = cupY.val();
    const positionZ = cupZ.val();
    const x = e.target.value;
    changeCupPosition(x, positionY, positionZ);
  });
  cupY.change((e) => {
    const positionX = cupX.val();
    const positionZ = cupZ.val();
    const y = e.target.value;
    changeCupPosition(positionX, y, positionZ);
  });
  cupZ.change((e) => {
    const positionX = cupX.val();
    const positionY = cupY.val();
    const z = e.target.value;
    changeCupPosition(positionX, positionY, z);
  });
};

const handleChangeImage = () => {
  const jqUserImage = $("#userImage");

  jqUserImage.change(function(){
    const image = document.createElement('img');
    let texture = new THREE.Texture(image);
  
    image.onload = function()  {
        texture.needsUpdate = true;
  
        cup.material.map = texture;
        cup.material.needsUpdate = true;
    };
  
    const fileData = jqUserImage.prop('files')[0];
  
    const reader = new FileReader();
  
    reader.onload = function(e) {
        image.src = e.target.result;
    };
  
    reader.readAsDataURL(fileData);
  });
}



handleCheckInput();
handleChangeCupXYZ();
handleChangeImage();
