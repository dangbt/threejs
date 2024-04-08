import * as THREE from "three";

class PoinLightApp {
  constructor(scene) {
    this.scene = scene;
  }
  create() {
    //Create a PointLight and turn on shadows for the light
    const light = new THREE.SpotLight(0xfef08a, 20, 100);

    light.position.set(20, 15, 15);
    light.castShadow = true; // default false

    this.scene.add(light);

  }
}
export default PoinLightApp;
