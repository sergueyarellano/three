module.exports = createCamera

function createCamera (payload) {
  const { THREE, container } = payload
  const camera = new THREE.PerspectiveCamera(
    35, // FOV
    container.clientWidth / container.clientHeight, // aspect

    0.1, // near clipping plane
    100 // far clipping plane
  )

  camera.position.set(-4, 4, 10)
  payload.camera = camera

  return payload
}
