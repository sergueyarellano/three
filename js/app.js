const THREE = require('three')
const { pipe } = require('./utils')
const createCamera = require('./camera')
const createControls = require('./controls')
const createScene = require('./scene')
const { createLights, addLightsToScene } = require('./lights')
const { createBox, addMeshToScene, createPlane, createOctahedron } = require('./meshes')
const createRenderer = require('./renderer')
const { togglePlay, getDOMContainer, addResponsiveness } = require('./browser')

const { renderer, mesh, scene, camera } = pipe(
  getDOMContainer,
  createCamera,
  createControls,
  createScene,
  createLights,
  addLightsToScene,
  createPlane,
  createOctahedron,
  createBox({ position: [0, 0.5, 0], geometry: [1, 1, 0.1] }),
  createBox({ position: [2, 0.5, 0], geometry: [1, 1, 1] }),
  createBox({ position: [-2, 0.5, 0], geometry: [1, 1, 1] }),
  createBox({ position: [-2, 2, 0], geometry: [1, 1, 1] }),
  addMeshToScene,
  createRenderer,
  addResponsiveness
)({ THREE })

const play = togglePlay({ renderer, update, render })
document.body.onkeydown = play
play({ code: 'Space' })

function update () {
  // Uncomment to see animation
  mesh.forEach(m => {
    // m.rotation.z += 0.01
    // m.rotation.x += 0.01
    // m.rotation.y += 0.01
  })
}

function render () {
  renderer.render(scene, camera)
}
