module.exports = {
  createLights,
  addLightsToScene
}

function createLights (payload) {
  const { THREE } = payload
  payload.ambientLight = new THREE.HemisphereLight(
    0xddeeff, // bright sky color
    0x202020, // dim ground color
    5 // intensity
  )
  const mainLight = new THREE.DirectionalLight(0xffffff, 5.0)

  mainLight.position.set(10, 10, 10)

  payload.mainLight = mainLight
  return payload
}

function addLightsToScene (payload) {
  const { scene, mainLight, ambientLight } = payload
  scene.add(mainLight, ambientLight)
  return payload
}
