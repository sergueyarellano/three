module.exports = {
  createBox,
  addMeshToScene
}

function createBox ({ position, geometry }) {
  return (payload) => {
    const { THREE } = payload
    const newGeometry = new THREE.BoxBufferGeometry(...geometry)
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('textures/nicolas.jpeg')

    texture.encoding = THREE.sRGBEncoding
    texture.anisotropy = 16

    const material = new THREE.MeshStandardMaterial({
      map: texture
    })

    const mesh = new THREE.Mesh(newGeometry, material)
    mesh.position.x = position[0]
    mesh.position.y = position[1]
    mesh.position.z = position[2]
    payload.mesh = payload.mesh ? payload.mesh.concat(mesh) : [mesh]
    return payload
  }
}

function addMeshToScene (payload) {
  const { scene, mesh } = payload

  mesh.forEach((m) => scene.add(m))

  return payload
}
