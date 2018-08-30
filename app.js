const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//add sphere controls
const controls = new THREE.OrbitControls(camera);
camera.position.set(1, 0, 0);
controls.update();

const geometry = new THREE.SphereGeometry(50, 32, 32);
const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
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

animate();