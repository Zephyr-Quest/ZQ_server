let canvaLight = document.getElementById("lights")

// GENERALITIES

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, canvaLight.getAttribute('width') / canvaLight.getAttribute('height'), 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;

renderer.setSize(canvaLight.getAttribute('height'), canvaLight.getAttribute('width'));
renderer.domElement.style.zIndex = "0"
renderer.domElement.style.width = canvaLight.style.width
renderer.domElement.style.height = canvaLight.style.height
document.body.appendChild(renderer.domElement);
camera.position.x = 0;
camera.position.z = 1000;
camera.position.y = 0;

var GlobalCar;
// CONTROLS MOUSE
/*var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;*/
let lightBulb

function init() {


    const color = 0xffffff;
    const intensity = 1;
    lightBulb = new THREE.PointLight(color, intensity);
    lightBulb.power = 100;
    lightBulb.decay = 1;
    lightBulb.distance = 270;
    lightBulb.position.x = -canvaLight.getAttribute('width') / 2 + 20
    lightBulb.position.y = 10
    lightBulb.position.z = 10
    scene.add(lightBulb);

    const helper = new THREE.PointLightHelper(lightBulb);
    scene.add(helper);

    const loader = new THREE.TextureLoader();
    floorMat = new THREE.MeshStandardMaterial({
        roughness: 1,
        //color: "red",
        map: loader.load('img/Map.png'),
        metalness: 1,
        bumpScale: 1
    });

    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const floorGeometry = new THREE.PlaneGeometry(canvaLight.getAttribute('width'), canvaLight.getAttribute('height'));
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.position.x = -13
    floorMesh.position.y = 13
    scene.add(floorMesh);
}

/**
 * FUNCTION FOR ANIMATION
 */


var animate = function() {
    requestAnimationFrame(animate);
    //controls.update();
    renderer.render(scene, camera);
};

function updateLightLeft() {
    lightBulb.position.x -= player.moveSize
}

function updateLightRight() {
    lightBulb.position.x += player.moveSize
}

function updateLightTop() {
    lightBulb.position.y += player.moveSize
}

function updateLightBottom() {
    lightBulb.position.y -= player.moveSize
}

onWindowSize = () => {
    camera.aspect = canvaLight.getAttribute('width') / canvaLight.getAttribute('height')
    camera.updateProjectionMatrix()
    renderer.setSize(canvaLight.getAttribute('width'), canvaLight.getAttribute('height'))
}

window.addEventListener('resize', onWindowSize, false)
init()
setTimeout(() => {
    animate();
}, 500);