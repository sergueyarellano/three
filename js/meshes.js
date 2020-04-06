const THREE = require('three')

module.exports = {
  createBox,
  createPlane,
  createOctahedron,
  createBauble,
  createStar,
  createGround,
  createBranch,
  createTrunk,
  createTree
}

function createGround () {
  const newGeometry = new THREE.BoxGeometry(1000, 0.1, 1000)
  const material = new THREE.ShadowMaterial({ color: 0xffffff, opacity: 0.5 })
  const mesh = new THREE.Mesh(newGeometry, material)
  mesh.receiveShadow = true
  return mesh
}
function createTree () {
  const trunk = createTrunk(220)
  trunk.position.y = 80
  const branches = createBranches(200, 7)

  const tree = new THREE.Group()
  tree.add(trunk, ...branches)
  tree.position.y = 30
  return tree
}

function createBranches (trunkLongitude, spaceBetween) {
  const branchesNumber = Math.floor(((trunkLongitude) / spaceBetween) * 5)
  const branches = Array.from(new Array(branchesNumber), () => createBranch())
  let height = 0
  let rotations = 0
  return branches.map((branch, index) => {
    height = index % 5 ? height : height + spaceBetween
    branch.position.y = height
    const scale = getScale(index, branchesNumber)
    branch.scale.set(scale, scale, scale)
    rotations += 37
    branch.rotateY(THREE.Math.degToRad(rotations))
    return branch
  })
}

function getScale (x, max) {
  return 1 - x / max
}

function createTrunk (height) {
  const trunkGeometry = addNoise(new THREE.CylinderGeometry(1, 18, height, 10), 5)
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x804E49,
    flatShading: true,
    metalness: 0,
    roughness: 1,
    refractionRatio: 0,
    emissive: 0x804E49,
    emissiveIntensity: 0.4
  })
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
  trunk.position.y = -5
  trunk.receiveShadow = true

  return trunk
}
function createBranch ({ positionY = 0, rotate = 0, tilt = 5 } = {}) {
  const branchLength = 60
  const stickgeometry = addNoise(new THREE.CylinderGeometry(3, 4, branchLength, 3), 2)
  const stickMaterial = new THREE.MeshStandardMaterial({
    color: 0x804E49,
    flatShading: true,
    metalness: 0,
    roughness: 1,
    refractionRatio: 0,
    emissive: 0x804E49,
    emissiveIntensity: 0.4
  })
  const stick = new THREE.Mesh(stickgeometry, stickMaterial)
  stick.rotateX(THREE.Math.degToRad(90))
  stick.position.z = 50
  stick.receiveShadow = true

  const leaves = createLeaves(branchLength, 10)
  const leavesGroup = new THREE.Group()
  leavesGroup.position.set(0, 0, 0)
  leavesGroup.add(...leaves)
  leavesGroup.position.z = 53
  leavesGroup.rotateX(THREE.Math.degToRad(90))
  leavesGroup.rotateY(THREE.Math.degToRad(90))
  const branch = new THREE.Group()
  branch.add(stick, leavesGroup)
  branch.rotateY(THREE.Math.degToRad(rotate))
  branch.rotateX(THREE.Math.degToRad(-tilt))
  branch.position.y += positionY
  branch.name = 'branch'
  return branch
}

function createLeaves (branchLenght, spaceBetween) {
  const leavesNumber = Math.floor((branchLenght / spaceBetween) * 2)
  const leaves = Array.from(new Array(leavesNumber), () => createLeaf())
  const rotationsX = [1.2, -1.2]
  const positionsZ = [13, -13]
  const positivePositionsY = Array.from(new Array(Math.floor(leavesNumber / 4)), ((acc) => (x) => {
    acc += spaceBetween
    return acc
  })(0))

  const negativePositionsY = positivePositionsY.map(x => -x)
  const positionsY = [0]
    .concat(positivePositionsY)
    .concat(positivePositionsY)
    .concat(0)
    .concat(negativePositionsY)
    .concat(negativePositionsY)

  const resultLeaves = leaves.map((mesh, index) => {
    mesh.rotateX(rotationsX[index % 2])
    mesh.scale.set(0.8, 0.8, 0.8)
    mesh.position.z = positionsZ[index % 2]
    mesh.position.y = positionsY[index]

    return mesh
  })
  return resultLeaves
}

function createLeaf () {
  const leafGeometry = addNoise(new THREE.CylinderGeometry(2, 1, 30, 4), 10)
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x15a46b,
    flatShading: true,
    metalness: 0,
    roughness: 1,
    refractionRatio: 0.25,
    emissive: 0x15a46b,
    emissiveIntensity: 0.4
  })
  const leaf = new THREE.Mesh(leafGeometry, leafMaterial)
  leaf.receiveShadow = true
  return leaf
}

function createStar ({ positionY }) {
  const starShape = new THREE.Shape([
    new THREE.Vector2(0, 50),
    new THREE.Vector2(10, 10),
    new THREE.Vector2(40, 10),
    new THREE.Vector2(20, -10),
    new THREE.Vector2(30, -50),
    new THREE.Vector2(0, -20),
    new THREE.Vector2(-30, -50),
    new THREE.Vector2(-20, -10),
    new THREE.Vector2(-40, 10),
    new THREE.Vector2(-10, 10)

  ])
  const geometry = new THREE.ExtrudeGeometry(starShape, {
    steps: 1,
    depth: 4,
    curveSegments: 1,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 10,
    bevelSegments: 1
  })
  const material = new THREE.MeshStandardMaterial({
    color: 0xffd423,
    flatShading: true,
    metalness: 0,
    roughness: 0.8,
    refractionRatio: 0.25,
    emissive: 0xffd423,
    emissiveIntensity: 0.4
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.scale.set(0.3, 0.3, 0.3)
  mesh.name = 'star'
  mesh.rotationSpeed = Math.random() * 0.02 + 0.005
  mesh.rotationPosition = Math.random()
  mesh.position.y = positionY
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
  group.scale.set(0.5, 0.5, 0.5)

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
