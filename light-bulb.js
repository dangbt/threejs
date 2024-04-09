import * as THREE from "three";

export default class LightBulb {
  constructor(scene) {
    this.scene = scene;
  }
  create(x, y, z) {
    const bulbLight = new THREE.PointLight(0xfef08a, 4, 100, 2);

    const bulbGeometry = new THREE.SphereGeometry( 0.02, 16, 8 );
    const bulbMat = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000,
    });

    const box = new THREE.Mesh(bulbGeometry, bulbMat)
    bulbLight.add(box);
    bulbLight.position.set(10, 4, 10);
    bulbLight.castShadow = true;
    
    // const hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );

    // this.scene.add( hemiLight );

    this.scene.add(bulbLight);

 

    return bulbLight
  }
}
