const THREE = require('three')

module.exports = createCamera

function createCamera (payload) {
  const { container } = payload
  const camera = new THREE.PerspectiveCamera(
    70, // FOV
    container.clientWidth / container.clientHeight, // aspect
    // window.innerWidth / window.innerHeight

    0.1, // near clipping plane
    2000 // far clipping plane
  )

  camera.position.set(258, 226, 37)

  camera.lookAt(new THREE.Vector3(0, 80, 0))
  payload.camera = camera

  return payload
}
