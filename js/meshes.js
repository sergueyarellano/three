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
  createTree,
  createPot,
  createPresent,
  createSymbol
}

function createGround () {
  const newGeometry = new THREE.BoxGeometry(1000, 0.1, 1000)
  const material = new THREE.ShadowMaterial({ color: 0xffffff, opacity: 0.5 })
  const mesh = new THREE.Mesh(newGeometry, material)
  mesh.receiveShadow = true
  return mesh
}

function createPresent ({ position }) {
  const colors = ['#ff0051', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b', '#ff0051', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b', '#a53c6c']
  const boxColor = colors[Math.floor(10 * Math.random())]
  const ribbonColor = colors[Math.floor(10 * Math.random())]
  const boxMaterial = new THREE.MeshStandardMaterial({
    color: boxColor,
    flatShading: true,
    metalness: 0,
    roughness: 1
  })
  const ribbonMaterial = new THREE.MeshStandardMaterial({
    color: ribbonColor,
    flatShading: true,
    metalness: 0,
    roughness: 1
  })
  const box = new THREE.Mesh(
    addNoise(new THREE.BoxGeometry(20, 12, 15), 2, 1, 2),
    boxMaterial
  )
  box.castShadow = true
  box.receiveShadow = true
  const ribbonX = new THREE.Mesh(
    addNoise(new THREE.BoxGeometry(22, 14, 2), 0.5),
    ribbonMaterial
  )
  const ribbonY = new THREE.Mesh(
    addNoise(new THREE.BoxGeometry(2, 14, 17), 0.5),
    ribbonMaterial
  )
  const bow1 = new THREE.Mesh(
    addNoise(new THREE.TorusGeometry(2, 1, 4, 4), 0.5),
    ribbonMaterial
  )
  bow1.castShadow = true
  bow1.receiveShadow = true
  bow1.position.y += 8
  bow1.position.x -= 2
  bow1.rotateZ(-1 * Math.PI / 1.5)
  const bow2 = new THREE.Mesh(
    addNoise(new THREE.TorusGeometry(2, 1, 4, 4), 0.5),
    ribbonMaterial
  )
  bow2.castShadow = true
  bow2.receiveShadow = true
  bow2.position.y += 8
  bow2.position.x += 2
  bow2.rotateZ(Math.PI / 1.5)

  const present = new THREE.Group()
  present.add(box, ribbonX, ribbonY, bow1, bow2)
  present.position.y += 6
  present.position.x = position[0]
  present.position.z = position[2]
  present.rotateY(THREE.Math.degToRad(Math.random() * 180))
  present.scale.set(1.5, 1.5, 1.5)
  return present
}

function createTree () {
  const trunk = createTrunk(220)
  trunk.castShadow = true
  trunk.receiveShadow = true
  trunk.position.y = 110
  const branches = createBranches(200, 5)
  const pot = createPot()
  pot.position.y = 15
  const tree = new THREE.Group()
  tree.add(pot, trunk, ...branches)

  return tree
}

function createBranches (trunkLongitude, spaceBetween) {
  const branchesNumber = Math.floor(((trunkLongitude) / spaceBetween) * 5)
  const branches = Array.from(new Array(branchesNumber), () => createBranch())
  let height = 30
  let rotations = 0
  return branches.map((branch, index) => {
    height = index % 5 ? height : height + spaceBetween
    branch.position.y = height
    const scale = getScale(index, branchesNumber)
    branch.scale.set(scale, scale, scale)
    rotations += 37
    branch.rotateY(THREE.Math.degToRad(rotations))
    branch.rotateX(THREE.Math.degToRad(-15))
    return branch
  })
}

function getScale (x, max) {
  return 1 - x / max
}

function createPot () {
  const potGeometry = addNoise(new THREE.CylinderGeometry(30, 25, 20, 8, 2), 2)
  const potMaterial = new THREE.MeshStandardMaterial({
    color: 0xf97514,
    flatShading: true,
    metalness: 0,
    roughness: 0.8,
    refractionRatio: 0.25
  })
  const pot = new THREE.Mesh(potGeometry, potMaterial)
  pot.castShadow = true
  pot.receiveShadow = true
  var potRim = new THREE.Mesh(
    addNoise(new THREE.CylinderGeometry(38, 35, 10, 8, 1), 2),
    potMaterial
  )
  potRim.position.y += 10
  potRim.castShadow = true
  potRim.receiveShadow = true
  const group = new THREE.Group()
  group.add(pot, potRim)
  return group
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
function createBranch () {
  const branchLength = 40
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
  stick.castShadow = true

  const leaves = createLeaves(branchLength, 10)
  const leavesGroup = new THREE.Group()
  leavesGroup.position.set(0, 0, 0)
  leavesGroup.add(...leaves)
  leavesGroup.position.z = 53
  leavesGroup.rotateX(THREE.Math.degToRad(90))
  leavesGroup.rotateY(THREE.Math.degToRad(90))
  const branch = new THREE.Group()
  branch.add(stick, leavesGroup)

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
    color: 0x698F3F,
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
  mesh.scale.set(0.2, 0.2, 0.2)
  mesh.name = 'star'
  mesh.rotationSpeed = Math.random() * 0.02 + 0.005
  mesh.rotationPosition = Math.random()
  mesh.position.y = positionY

  return mesh
}
function createSymbol () {
  const symbol = new THREE.Shape([
    new THREE.Vector2(-50, 0),
    new THREE.Vector2(-40, 0),
    new THREE.Vector2(-40, -40),
    new THREE.Vector2(0, -40),
    new THREE.Vector2(0, -50),
    new THREE.Vector2(-50, -50)
  ])
  const geometry = new THREE.ExtrudeGeometry(symbol, {
    steps: 1,
    depth: 2,
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
  const mesh2 = new THREE.Mesh(geometry, material)
  mesh2.position.y += 20
  mesh2.position.x += 20
  mesh2.rotateZ(THREE.Math.degToRad(180))
  const group = new THREE.Group()
  group.add(mesh, mesh2)
  group.scale.set(0.1, 0.1, 0.1)
  group.name = 'star'
  group.position.y = 230
  group.position.x = 0
  group.rotationSpeed = Math.random() * 0.02 + 0.005
  group.rotationPosition = Math.random()

  return group
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
  group.scale.set(0.3, 0.3, 0.3)

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
