
const canvas = document.getElementById('2dgrid-webgl')
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager);

const scene = new THREE.Scene();
const size_ = 10;
const divisions = 50;

const gridHelper = new THREE.GridHelper( size_, divisions );
gridHelper.rotation.set(3.14/2, 0, 0);
scene.add( gridHelper );

const size = {
    width: window.innerWidth/3,
    height: window.innerWidth/3
}
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.set(0, 0, 6.5);

const renderer = new THREE.WebGLRenderer(
    {canvas: canvas}
);
renderer.setSize(size.width, size.height)
renderer.setClearColor("")

const parameters = {
    color: 0xff0000,
    toRight: ()=>{gsap.to(cube_mesh.position, {duration: 1, delay: 0, x:4})},
    toLeft: ()=>{gsap.to(cube_mesh.position, {duration: 1, delay: 0, x:-4})},
}

document.addEventListener( 'mousedown', onDocumentMouseDown, false );

function onDocumentMouseDown( event ) {
    document.getElementById("click-position").innerText=`You last clicked at X:${event.clientX} , Y:${event.clientY}`
}
const tick = () =>{
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick()