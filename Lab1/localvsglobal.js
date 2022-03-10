
const canvas = document.getElementById('localvsglobal-webgl')
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager);



const planeXZTexture = textureLoader.load('https://acodedoer.github.io/CO1301/Lab1/Grid.jpg')
const planeYTexture = textureLoader.load('https://acodedoer.github.io/CO1301/Lab1/Grid2.jpg')
const boxTexture = textureLoader.load('https://acodedoer.github.io/CO1301/Lab1/tiles1.jpg')

const scene = new THREE.Scene();



const planeXZGeometry = new THREE.PlaneBufferGeometry(6,6, 1);
const planeXZMaterial = new THREE.MeshBasicMaterial({map:planeXZTexture});

const planeXZMesh = new THREE.Mesh(planeXZGeometry, planeXZMaterial);
planeXZMesh.rotation.set(-Math.PI/2, 0, 0)

const cube = new THREE.BoxBufferGeometry(1,1, 1);
const cube_material = new THREE.MeshBasicMaterial({map:boxTexture, wireframe:false});
const cube_mesh = new THREE.Mesh(cube, cube_material);
cube_mesh.scale.set(0.5, 0.5, 0.5)

const size = {
    width: window.innerWidth,
    height: window.innerWidth
}
const camera = new THREE.PerspectiveCamera(65, size.width/size.height);
camera.position.set(0, 6, 6);
camera.rotation.set(-3.14/4, 0, 0)

scene.add(cube_mesh, planeXZMesh)

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

var person = {CubePosition_X: 0,CubePosition_Y: 0,CubePosition_Z: 0};
// document.getElementById("incX").addEventListener("click", ()=>{
//     var x = parseInt( document.getElementById("valX").value);
//     if(x<60){
//         x+=1;
//         document.getElementById("valX").value= x;
//         cube_mesh.position.set(x/20.0,cube_mesh.position.y, cube_mesh.position.z)
//     }
// })

// document.getElementById("incX").addEventListener("click", ()=>{ 
//     document.getElementById("valX").value= parseInt( document.getElementById("valX").value)+ 1;
//     cube_mesh.position.set(parseInt( document.getElementById("valX").value)/10,cube_mesh.position.y, cube_mesh.position.z)
// })

// document.getElementById("decX").addEventListener("click", ()=>{ 
//     document.getElementById("valX").value= parseInt( document.getElementById("valX").value)- 1;
//     cube_mesh.position.set(parseInt( document.getElementById("valX").value)/10,cube_mesh.position.y, cube_mesh.position.z)
// })

// document.getElementById("incY").addEventListener("click", ()=>{
//     document.getElementById("valY").value= parseInt( document.getElementById("valY").value)+ 1;
//     cube_mesh.position.set(cube_mesh.position.x, parseInt( document.getElementById("valY").value)/10, cube_mesh.position.z)
// })

// document.getElementById("decY").addEventListener("click", ()=>{ 
//     document.getElementById("valY").value= parseInt( document.getElementById("valY").value)- 1;
//     cube_mesh.position.set(cube_mesh.position.x, parseInt( document.getElementById("valY").value)/10,  cube_mesh.position.z)
// })


const tick = () =>{
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick()