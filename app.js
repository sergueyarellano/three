const { pipe } = require('./js/utils')
const createCamera = require('./js/camera')
const createControls = require('./js/controls')
const { createScene, addToScene } = require('./js/scene')
const { createAmbientLight, createPointLight } = require('./js/lights')
const { createGround, createSymbol, createPot, createPresent, createStar, createBauble, createTree } = require('./js/meshes')
const { createRenderer, render } = require('./js/renderer')
const { getDOMContainer, addResponsiveness } = require('./js/browser')

pipe(
  getDOMContainer,
  createCamera,
  createControls,
  createScene,
  addToScene(
    'ligts',
    createAmbientLight(),
    createPointLight()
  ),
  addToScene(
    'mesh',
    createGround(),
    // createSymbol(),
    createTree(),
    createPresent({ position: [60, 0, 60] }),
    createPresent({ position: [-60, 0, -60] }),
    createPresent({ position: [30, 0, 40] }),
    createPresent({ position: [-30, 0, -40] }),
    createPresent({ position: [60, 0, 26] }),
    createPresent({ position: [-60, 0, -26] }),
    createPresent({ position: [60, 0, -35] }),
    createPresent({ position: [-60, 0, 35] }),
    createPresent({ position: [70, 0, -10] }),
    createPresent({ position: [-70, 0, 10] }),
    createStar({ positionY: 230 }),
    createBauble({ color: '#a53c6c', position: [60, 50, -30] }),
    createBauble({ color: '#a53c6c', position: [-60, 60, 30] }),
    createBauble({ color: '#ff0051', position: [40, 60, 60] }),
    createBauble({ color: '#ff0051', position: [-20, 70, -50] }),
    createBauble({ color: '#72bdbf', position: [30, 120, 20] }),
    createBauble({ color: '#72bdbf', position: [-30, 130, -20] }),
    createBauble({ color: '#47689b', position: [10, 185, 10] }),
    createBauble({ color: '#47689b', position: [-10, 195, -10] }),
    createBauble({ color: '#f56762', position: [10, 150, -30] }),
    createBauble({ color: '#f56762', position: [-10, 160, 30] })
  ),
  createRenderer,
  render,
  addResponsiveness
)({})
