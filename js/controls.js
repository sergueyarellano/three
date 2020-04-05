const OrbitControls = require('three-orbitcontrols')
const THREE = require('three')

module.exports = createControls

function createControls (payload) {
  const { container, camera } = payload
  const controls = new OrbitControls(camera, container)
  controls.target = new THREE.Vector3(0, 80, 0)
  controls.maxPolarAngle = Math.PI / 2
  controls.minDistance = 100
  controls.maxDistance = 220
  payload.controls = controls

  return payload
}
