

import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


class Load3D {
  constructor(scene) {
    this.scene = scene
  }
  load(url, callback) {
    const loadingManager = new THREE.LoadingManager();
    const gltfLoader = new GLTFLoader(loadingManager);

    gltfLoader.load(url, (gltf) => {
      this.scene.add(gltf.scene);
      if (callback) {
        callback(gltf.scene)
      }
    })
  }
}
export default Load3D