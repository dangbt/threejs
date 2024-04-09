import * as THREE from "three";

class Plane {
  constructor(scene) {
    this.scene = scene;
  }
  create() {
    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.position.z = 10;
    plane.position.x = 10;
    plane.rotation.x = Math.PI / 2;

    this.scene.add(plane);
  }
}

export default Plane;
