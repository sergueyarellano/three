const THREE = require('three')

module.exports = {
  createScene,
  addToScene
}

function createScene (payload) {
  const scene = new THREE.Scene()
  payload.scene = scene
  return payload
}

function addToScene (type, ...newInstances3D) {
  if (typeof type !== 'string') throw new Error('You have to provide a type of 3D instances that you wanna add as a first argument')
  return (payload) => {
    const { scene } = payload
    scene.add(...newInstances3D)

    const instances3D = payload[type] || []
    payload[type] = instances3D.concat(newInstances3D)
    return payload
  }
}
