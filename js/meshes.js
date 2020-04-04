module.exports = {
  createBox,
  addMeshToScene,
  createPlane,
  createOctahedron
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

    mesh.castShadow = true
    mesh.receiveShadow = true
    payload.mesh = payload.mesh ? payload.mesh.concat(mesh) : [mesh]
    return payload
  }
}

function createOctahedron (payload) {
  const { THREE } = payload
  const newGeometry = new THREE.OctahedronGeometry(1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0051,
    flatShading: true,
    metalness: 0,
    roughness: 1
    // wireframe: true
  })
  const mesh = new THREE.Mesh(newGeometry, material)
  mesh.position.y += 2
  mesh.castShadow = true
  mesh.receiveShadow = true
  payload.mesh = payload.mesh ? payload.mesh.concat(mesh) : [mesh]
  return payload
}

function createPlane (payload) {
  const { THREE } = payload
  const newGeometry = new THREE.PlaneGeometry(5, 5, 5, 5)
  const material = new THREE.MeshStandardMaterial({ color: 0x222222, wireframe: true })
  const mesh = new THREE.Mesh(newGeometry, material)
  mesh.rotateX(Math.PI / 2)
  payload.mesh = payload.mesh ? payload.mesh.concat(mesh) : [mesh]
  return payload
}

function addMeshToScene (payload) {
  const { scene, mesh } = payload

  mesh.forEach((m) => scene.add(m))

  return payload
}
