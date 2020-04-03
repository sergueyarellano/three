module.exports = createScene

function createScene (payload) {
  const { THREE } = payload
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x8FBCD4)
  payload.scene = scene
  return payload
}
