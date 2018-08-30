const container = document.body;
const tooltip = document.querySelector('.tooltip');
const reyCaster = new THREE.Raycaster();
let tooltip_active = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

//add sphere controls
const controls = new THREE.OrbitControls(camera);
controls.rotateSpeed = .2;
controls.enableZoom = false;

camera.position.set(1, 0, 0);
controls.update();

//add sphere
const geometry = new THREE.SphereGeometry(50, 32, 32);
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load('360_3.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = -1;

const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

container.appendChild(renderer.domElement);

animate();
addTooltip(new THREE.Vector3(
    48.747255204211896, 
    9.523514720448256, 
    3.312726318241995
), 'Tree');

//Event handling
addEventListener('resize', onResize);
container.addEventListener('click', onClick);
container.addEventListener('mousemove', onMouseMove);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onResize() {
    renderer.setSize(
        window.innerWidth, 
        window.innerHeight
    );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

//tooltip
function addTooltip(position, name) {
    const spriteMap = new THREE
        .TextureLoader()
        .load('info.png');

    const spriteMaterial = new THREE
        .SpriteMaterial({map: spriteMap});

    const sprite = new THREE
        .Sprite(spriteMaterial);

    sprite.name = name;

    sprite
        .position
        .copy(
            position
                .clone()
                .normalize()
                .multiplyScalar(20)
        );

    sprite
        .scale
        .multiplyScalar(2);


    scene.add(sprite);
}

function onClick(event) {
    let mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    reyCaster.setFromCamera(mouse, camera);

    let intersects = reyCaster.intersectObjects(scene.children);
    intersects.forEach(intersect => {
        if (intersect.object.type === 'Sprite') console.log(intersect.object.name);
    })

    //let intersect = reyCaster.intersectObject(sphere);
    //if (intersect.length > 0) addTooltip(intersect[0].point);
}

function onMouseMove(event) {
    let mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    reyCaster.setFromCamera(mouse, camera);

    let found_sprite = false;
    let intersects = reyCaster.intersectObjects(scene.children);
    intersects.forEach(intersect => {
        if (intersect.object.type === 'Sprite') {
            let p = intersect
                .object
                .position
                .clone()
                .project(camera);

            tooltip.style.top = `${((-1 * p.y + 1) * window.innerHeight / 2)}px`;
            tooltip.style.left = `${((p.x + 1) * window.innerWidth / 2)}px`;
            tooltip.classList.add('is-active');
            tooltip.innerHTML = intersect.object.name;

            tooltip_active = true;
            found_sprite = true;
        }
    });

    if (found_sprite === false && tooltip_active) tooltip.classList.remove('is-active');
}