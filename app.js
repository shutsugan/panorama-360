const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//add sphere controls
const controls = new THREE.OrbitControls(camera);
controls.rotateSpeed = .2;
controls.enableZoom = false;

camera.position.set(1, 0, 0);
controls.update();

const geometry = new THREE.SphereGeometry(50, 32, 32);
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load('360_2.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = -1;

const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

animate();
addEventListener('resize', onResize);