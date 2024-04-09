import * as THREE from "three";

class Ball {
  constructor(scene) {
    this.scene = scene;
  }
  create(x, y, z) {
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 1.0,
    });

    const ballGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const ballMesh = new THREE.Mesh(ballGeometry, ballMat);
    ballMesh.position.set(x, y, z);
    ballMesh.rotation.y = Math.PI;
    ballMesh.castShadow = true;
    this.scene.add(ballMesh);
  }
}

export default Ball;
