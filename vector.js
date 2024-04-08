import * as THREE from "three";

class Vector3D {
  constructor(scene) {
    this.scene = scene;
  }
  create(x = 1, y = 0, z = 0) {
    const v = new THREE.Vector3(x, y, z);
    this.scene.add(v);
  }
}

export default Vector3D;
