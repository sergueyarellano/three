const THREE = require('three')

module.exports = {
  createAmbientLight,
  createPointLight
}

function createAmbientLight () {
  return new THREE.AmbientLight(0xffffff, 0.3)
}

function createPointLight () {
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(25, 50, 25)
  pointLight.castShadow = true
  pointLight.shadow.mapSize.width = 1024
  pointLight.shadow.mapSize.height = 1024
  return pointLight
}
