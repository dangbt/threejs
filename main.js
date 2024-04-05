import * as THREE from "three";

import WebGL from "three/addons/capabilities/WebGL.js";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { LightProbeGenerator } from "three/addons/lights/LightProbeGenerator.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

// ================ BOX ===============
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.75,
  flatShading: true,
});

const cube = new THREE.Mesh(geometry, material);
// const box = new THREE.BoxHelper( cube, 0xffff00 );

scene.add(cube);
// ================ END ===============

// ================ LINE ===============
//create a blue LineBasicMaterial
const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometryLine, materialLine);

// scene.add( line );
// ================ END ===============

// point light


const spotLight = new THREE.SpotLight( 0xffffff, 10, 100 );
spotLight.position.set( 10, 10, 2 );

spotLight.castShadow = true;
scene.add( spotLight );
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );


camera.position.set(20, 10, 3);
// camera.lookAt(0, 0, 2); //



const loader = new GLTFLoader();

loader.load( './models/cup1.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
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
