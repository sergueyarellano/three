module.exports = {
  onWindowResize,
  getDOMContainer,
  addResponsiveness
}

function addResponsiveness (payload) {
  window.addEventListener('resize', onWindowResize(payload))
  return payload
}

function getDOMContainer (payload) {
  payload.container = document.querySelector('#scene-container')
  return payload
}

function onWindowResize ({ camera, container, renderer }) {
  return () => {
  // set the aspect ratio to match the new browser window aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight

    // update the camera's frustum
    camera.updateProjectionMatrix()

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight)
  }
}
