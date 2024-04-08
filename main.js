import * as THREE from "three";

import WebGL from "three/addons/capabilities/WebGL.js";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { LightProbeGenerator } from "three/addons/lights/LightProbeGenerator.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import Plane from "./plane";
import PoinLightApp from "./point-light";
import LightBulb from "./light-bulb";

let lightBulb1

const scene = new THREE.Scene();
const plan = new Plane(scene);
const pointLight = new PoinLightApp(scene);
const lightBulb = new LightBulb(scene);

plan.create()
pointLight.create()
 lightBulb1 = lightBulb.create()


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

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

camera.position.set(30, 10, 3);
camera.lookAt(0, 0, 2); //
let cup, whiteTexture, cartonTexture;



const ballMat = new THREE.MeshStandardMaterial( {
  color: 0xffffff,
  roughness: 0.5,
  metalness: 1.0
} );


const ballGeometry = new THREE.SphereGeometry( 0.25, 32, 32 );
const ballMesh = new THREE.Mesh( ballGeometry, ballMat );
ballMesh.position.set( 2, 0.25, 2 );
ballMesh.rotation.y = Math.PI;
ballMesh.castShadow = true;
scene.add( ballMesh );


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  ballMesh.rotateY(0.1)
  if (cup) {
  }
  renderer.render(scene, camera);
}

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
      gltf.scene.traverse( function ( child ) {
        if ( child.isMesh ) {
          cup = child
          cup.material = new THREE.MeshStandardMaterial(  );
          cup.scale.set(0.2, 0.2, 0.2)
          cup.castShadow = true
    }
      })
      gltf.scene.position.z = -.5
      gltf.scene.position.y = 0
      gltf.scene.position.x = 0
      scene.add(gltf.scene);

    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  
loader.load(
  "./models/lid1.gltf",
  function (gltf) {
    gltf.scene.traverse( function ( child ) {
      if ( child.isMesh ) {
        child.material = new THREE.MeshStandardMaterial(  );
        // cup.scale.set(0.2, 0.2, 0.2)
        child.castShadow = true
  }
    })
    gltf.scene.position.z = 14
    gltf.scene.position.y = 1
    gltf.scene.position.x = 4
    scene.add(gltf.scene);

  },
  undefined,
  function (error) {
    console.error(error);
  }
);

}



function changeAllCupTexture(texture) {
  var material = new THREE.MeshBasicMaterial( { map: texture } );
  cup.material = material;
}

function changeAllCupColor(color) {
  var material = new THREE.MeshStandardMaterial( { color } );
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
    const color =  e.target.value
    changeAllCupColor(color)

  })
};

handleCheckInput();
