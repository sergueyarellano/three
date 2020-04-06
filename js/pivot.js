const THREE = require('three')

var camera, scene, renderer
var mesh, pivot

init()
animate()

function init () {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
  camera.position.z = 1

  scene = new THREE.Scene()

  var geometry = new THREE.PlaneGeometry(0.2, 0.5, 0.2)
  var material = new THREE.MeshNormalMaterial()
  var material2 = new THREE.MeshBasicMaterial({ color: 0xFF0000 })

  mesh = new THREE.Mesh(geometry, material2)
  mesh.position.set(0, -0.25, 0)
  // scene.add(mesh)

  var geo2 = geometry.clone()
  geo2.rotateZ(THREE.Math.degToRad(90)) // ROTATE GEOMETRY SO IT'S IN THE CORRECT ORIENTATION
  var mesh2 = new THREE.Mesh(geo2, material)
  mesh2.position.set(0, 0.25, 0) // MOVE THE GEOMOETRY UP BY HALF SO PIVOT IS AT THE BOTTOM OF THE GEO
  mesh2.rotation.set(0, 0, Math.PI / 2)
  scene.add(mesh2)

  pivot = new THREE.Group()
  pivot.position.set(0.0, 0.0, 0) // MOVE THE PIVOT BACK TO WORLD ORIGN
  pivot.add(mesh2)
  scene.add(pivot) // THIS ADDS THE PIVOT TO THE CENTRE OF THE GEOMOETRY, WHICH WAS THEN ADDING MESH2 IN THE WRONG PLACE

  // VISUALISE PIVOT
  var pivotSphereGeo = new THREE.SphereGeometry(0.01)
  var pivotSphere = new THREE.Mesh(pivotSphereGeo)
  pivotSphere.position.set(0, 0, 0)
  pivotSphere.position.z = 0.1
  scene.add(pivotSphere)

  scene.add(new THREE.AxesHelper())

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
}

function animate () {
  requestAnimationFrame(animate)

  pivot.rotation.z += 0.01

  renderer.render(scene, camera)
}
