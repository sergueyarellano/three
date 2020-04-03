const OrbitControls = require('three-orbitcontrols')
module.exports = createControls

function createControls (payload) {
  const { container, camera } = payload
  const controls = new OrbitControls(camera, container)

  payload.controls = controls

  return payload
}
