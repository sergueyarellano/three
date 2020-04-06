const THREE = require('three')

module.exports = {
  createBox,
  createPlane,
  createOctahedron,
  createBauble,
  createGround
}

function createGround () {
  const newGeometry = new THREE.BoxGeometry(1000, 0.1, 1000)
  const material = new THREE.ShadowMaterial({ color: 0xffffff, opacity: 0.5 })
  const mesh = new THREE.Mesh(newGeometry, material)
  mesh.receiveShadow = true
  return mesh
}

function createBauble ({ color, position }) {
  // let's do the big ball first
  const baubleGometry = addNoise(new THREE.OctahedronGeometry(12, 1), 2)
  const baubleMaterial = new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    metalness: 0,
    roughness: 1,
    refractionRatio: 0.25
  })
  const baubleMesh = new THREE.Mesh(baubleGometry, baubleMaterial)
  baubleMesh.castShadow = true
  baubleMesh.receiveShadow = true
  baubleMesh.rotateZ(Math.random() * Math.PI * 2)
  baubleMesh.rotateY(Math.random() * Math.PI * 2)

  // add the base on the top
  const baseTopGeometry = addNoise(new THREE.CylinderGeometry(4, 6, 10, 6, 1), 0.5)
  const baseTopMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8db08,
    flatShading: true,
    metalness: 0,
    roughness: 0.8,
    refractionRatio: 0.25
  })
  const baseTopMesh = new THREE.Mesh(baseTopGeometry, baseTopMaterial)
  baseTopMesh.castShadow = true
  baseTopMesh.receiveShadow = true
  baseTopMesh.position.y += 8

  // add the ring at the top
  const ringTopGeometry = addNoise(new THREE.TorusGeometry(2, 1, 6, 4, Math.PI), 0.2)
  const ringTopMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8db08,
    flatShading: true,
    metalness: 0,
    roughness: 0.8,
    refractionRatio: 0.25
  })
  const ringTopMesh = new THREE.Mesh(ringTopGeometry, ringTopMaterial)
  ringTopMesh.castShadow = true
  ringTopMesh.receiveShadow = true
  ringTopMesh.position.y += 13

  // hold everything together
  var group = new THREE.Group()
  group.add(baubleMesh)
  group.add(baseTopMesh)
  group.add(ringTopMesh)
  group.name = 'baubles'
  group.rotationSpeed = Math.random() * 0.02 + 0.005
  group.rotationPosition = Math.random()
  group.position.x += position[0]
  group.position.y += position[1]
  group.position.z += position[2]

  return group
}

function createBox ({ position, geometry }) {
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
  mesh.name = 'box'

  return mesh
}

function createOctahedron () {
  const newGeometry = new THREE.OctahedronGeometry(1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0051,
    flatShading: true,
    metalness: 0,
    roughness: 1
  })
  const mesh = new THREE.Mesh(newGeometry, material)
  mesh.position.y += 2
  mesh.castShadow = true
  mesh.receiveShadow = true

  return mesh
}

function createPlane () {
  const newGeometry = new THREE.PlaneGeometry(5, 5, 5, 5)
  const material = new THREE.MeshStandardMaterial({ color: 0x222222, wireframe: true })
  const mesh = new THREE.Mesh(newGeometry, material)
  mesh.rotateX(Math.PI / 2)

  return mesh
}

function addNoise (geometry, noiseX, noiseY, noiseZ) {
  noiseX = noiseX || 2
  noiseY = noiseY || noiseX
  noiseZ = noiseZ || noiseY
  for (var i = 0; i < geometry.vertices.length; i++) {
    var v = geometry.vertices[i]
    v.x += -noiseX / 2 + Math.random() * noiseX
    v.y += -noiseY / 2 + Math.random() * noiseY
    v.z += -noiseZ / 2 + Math.random() * noiseZ
  }
  return geometry
}
