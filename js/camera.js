const THREE = require('three')

module.exports = createCamera

function createCamera (payload) {
  const { container } = payload
  const camera = new THREE.PerspectiveCamera(
    60, // FOV
    container.clientWidth / container.clientHeight, // aspect

    0.1, // near clipping plane
    1000 // far clipping plane
  )

  camera.position.set(0, 50, 70)
  camera.lookAt(new THREE.Vector3(0, 15, 0))
  payload.camera = camera

  return payload
}
