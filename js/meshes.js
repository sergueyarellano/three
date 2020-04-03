module.exports = {
  createBox,
  addMeshToScene
}

function createBox (payload) {
  const { THREE } = payload
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2)
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('textures/strawberry-vanilla-crepe-breakfast_thumbnaillarge_2019-04-01-14-35-28.jpg')

  texture.encoding = THREE.sRGBEncoding
  texture.anisotropy = 16

  const material = new THREE.MeshStandardMaterial({
    map: texture
  })

  const mesh = new THREE.Mesh(geometry, material)

  payload.mesh = payload.mesh ? payload.mesh.concat(mesh) : [mesh]
  return payload
}

function addMeshToScene (payload) {
  const { scene, mesh } = payload

  mesh.forEach((m) => scene.add(m))

  return payload
}
