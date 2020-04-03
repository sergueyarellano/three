module.exports = {
  onWindowResize,
  togglePlay,
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

function togglePlay (options) {
  let count = 1 // value 0 to start stopped.
  return (e) => {
    if (e.code === 'Space') {
      count++ % 2 ? play(options) : stop(options.renderer)
    }
  }
}
function play ({ renderer, update, render }) {
  renderer.setAnimationLoop(() => {
    update()
    render()
  })
}

function stop (renderer) {
  renderer.setAnimationLoop(null)
}
