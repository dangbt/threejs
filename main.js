import * as THREE from "three";

import WebGL from "three/addons/capabilities/WebGL.js";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { LightProbeGenerator } from "three/addons/lights/LightProbeGenerator.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import Cube from './cube';
import Load3D from './gtlfloader';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcbd5e1);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// ================ BOX ===============

const cubeClass = new Cube(scene);
const cube = cubeClass.createCube(1, 1, 2);
const cube1 = cubeClass.createCube(1, 1, 1);
const cube2 = cubeClass.createCube(1, 1, 3);

////

const load3D = new Load3D(scene);

const textuareLoader = new THREE.TextureLoader();
const onLoad = (box) => (texture) => {
  var material = new THREE.MeshBasicMaterial({ map: texture });
  box.material = material;
}

function onProgress(xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}

function onError(xhr) {
  console.error('An error happened');
}

var lib, cupInside, cupOutside


const callback = (lid) => {
  lid.traverse(function (child) {
    if (child.isMesh) {
      console.log(child)
      switch (child.name) {
        case "cup2_inside": {
          globalThis.cupInside = child
          cupInside = child
          break;
        }
        case "cup2_outside": {
          globalThis.cupOutside = child
          cupOutside = child
          break;
        }
        case "lid2": {
          globalThis.lib = child
          lib = child
          break;
        }
      }
    }
  });
}

load3D.load('models/cup2_inside.gltf', callback)
load3D.load('models/cup2_outside.gltf', callback)
load3D.load('models/lid2.gltf', callback)



const jqWhiteCarton = $("#white-carton");

jqWhiteCarton.click(function () {
  textuareLoader.load("image/FingerPrints.jpg", onLoad(lib), onProgress, onError);
  textuareLoader.load("image/FingerPrints.jpg", onLoad(cupInside), onProgress, onError);
  textuareLoader.load("image/FingerPrints.jpg", onLoad(cupOutside), onProgress, onError);
});

import "./input-upload"

camera.position.set(20, 20, 3);





const dir = new THREE.Vector3(1, 0, 0);
const dir1 = new THREE.Vector3(0, 1, 0);
const dir2 = new THREE.Vector3(0, 0, 1);

//normalize the direction vector (convert to vector of length 1)
dir.normalize();
dir1.normalize();
dir2.normalize();


const origin = new THREE.Vector3(0, 0, 0);
const length = 100;
const hex = 0xffff00;

const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
const arrowHelper1 = new THREE.ArrowHelper(dir1, origin, length, hex);
const arrowHelper2 = new THREE.ArrowHelper(dir2, origin, length, hex);
scene.add(arrowHelper);
scene.add(arrowHelper1);
scene.add(arrowHelper2);


function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.y += 0.01;
  cube1.rotation.x += 0.01;


  if (lib) {
    lib.rotation.y += 0.01;
  }
  // if (cupOutside) {
  //   cupOutside.rotation.z += 0.01;
  // }
  // if (cupInside) {
  //   cupInside.rotation.z += 0.01;
  // }

  controls.update();
  renderer.render(scene, camera);
}

/// check browser support 3D
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
