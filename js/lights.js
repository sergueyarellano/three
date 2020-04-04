module.exports = {
  createLights,
  addLightsToScene
}

function createLights (payload) {
  const { THREE } = payload
  const ambientLight = new THREE.HemisphereLight(
    0xddeeff, // bright sky color
    0x202020, // dim ground color
    5 // intensity
  )
  payload.ambientLight = ambientLight

  const mainLight = new THREE.DirectionalLight(0xffffff, 5.0)
  mainLight.castShadow = true
  mainLight.shadow.mapSize.width = 1024
  mainLight.shadow.mapSize.height = 1024
  mainLight.position.set(25, 50, 25)

  payload.mainLight = mainLight
  return payload
}

function addLightsToScene (payload) {
  const { scene, mainLight, ambientLight } = payload
  scene.add(mainLight, ambientLight)
  return payload
}
