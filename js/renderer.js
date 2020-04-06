const THREE = require('three')

module.exports = {
  createRenderer,
  render
}

function createRenderer (payload) {
  const { container } = payload
  const renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setClearColor(0xfff6e6)
  // renderer.setPixelRatio(window.devicePixelRatio)
  renderer.gammaFactor = 2.2
  // renderer.gammaOutput = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  container.appendChild(renderer.domElement)
  // renderer.physicallyCorrectLights = true
  payload.renderer = renderer

  return payload
}

function render (payload) {
  const { renderer, scene, camera, mesh, controls } = payload
  renderer.setAnimationLoop(() => {
    controls.update()
    update(mesh)
    renderer.render(scene, camera)
  })
  return payload
}

function update (mesh) {
  mesh.forEach(m => {
    if (m.name === 'baubles') {
      m.rotationPosition += m.rotationSpeed
      m.rotation.y = Math.sin(m.rotationPosition)
    }
    if (m.name === 'star') {
      m.rotationPosition += m.rotationSpeed
      m.rotation.y = Math.sin(m.rotationPosition)
    }
  })
}
