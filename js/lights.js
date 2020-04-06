const THREE = require('three')

module.exports = {
  createAmbientLight,
  createPointLight
}

function createAmbientLight () {
  return new THREE.AmbientLight(0xffffff, 0.3)
}

function createPointLight () {
  const pointLight = new THREE.PointLight(0xffffff, 0.8)
  pointLight.position.set(80, 160, 120)
  pointLight.castShadow = true
  pointLight.shadow.mapSize.width = 1024
  pointLight.shadow.mapSize.height = 1024
  return pointLight
}
