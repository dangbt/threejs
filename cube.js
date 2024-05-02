import * as THREE from "three";


class Cube {
  constructor(scene) {
    this.scene = scene
  }

  createCube(x, y, z) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);


    const position = geometry.attributes.position;
    const colors = [];
    const color = new THREE.Color();

    // generate for each side of the cube a different color

    for (let i = 0; i < position.count; i += 6) {

      color.setHex(Math.random() * 0xffffff);

      // first face

      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);

      // second face

      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);

    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshBasicMaterial({ vertexColors: true });

    const cube = new THREE.Mesh(geometry, material);
    if (x && y && z) {
      cube.position.set(x, y, z)
    }
    this.scene.add(cube);
    return cube

  }
}
export default Cube




