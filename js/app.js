const { pipe } = require('./utils')
const createCamera = require('./camera')
const createControls = require('./controls')
const { createScene, addToScene } = require('./scene')
const { createAmbientLight, createPointLight } = require('./lights')
const { createBauble, createGround } = require('./meshes')
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
    createBauble({ color: '#a53c6c', position: [25, 20, -15] }),
    createBauble({ color: '#72bdbf', position: [0, 15, -2] }),
    createBauble({ color: '#47689b', position: [-25, 20, -12] })
  ),
  createRenderer,
  render,
  addResponsiveness
)({})
