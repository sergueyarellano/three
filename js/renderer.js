module.exports = createRenderer

function createRenderer (payload) {
  const { THREE, container } = payload
  const renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.gammaFactor = 2.2
  renderer.gammaOutput = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  container.appendChild(renderer.domElement)
  renderer.physicallyCorrectLights = true
  payload.renderer = renderer

  return payload
}
