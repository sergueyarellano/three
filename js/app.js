const { pipe } = require('./utils')
const createCamera = require('./camera')
const createControls = require('./controls')
const { createScene, addToScene } = require('./scene')
const { createAmbientLight, createPointLight } = require('./lights')
const { createGround, createStar, createBauble, createBranch, createTrunk, createTree } = require('./meshes')
const { createRenderer, render } = require('./renderer')
const { getDOMContainer, addResponsiveness } = require('./browser')

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
    createTree(),
    createStar({ positionY: 240 }),
    createBauble({ color: '#a53c6c', position: [70, 50, -30] }),
    createBauble({ color: '#a53c6c', position: [-70, 60, 30] }),
    createBauble({ color: '#ff0051', position: [50, 60, 60] }),
    createBauble({ color: '#ff0051', position: [-50, 70, -60] }),
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
