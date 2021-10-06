const canvas = document.querySelector('canvas.webgl')
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager);
const planeXZTexture = textureLoader.load('../Grid.jpg')
const planeYTexture = textureLoader.load('../Grid2.jpg')
const boxTexture = textureLoader.load('../tiles1.jpg')

const scene = new THREE.Scene();

const planeYGeometry = new THREE.PlaneBufferGeometry(1,3, 1);
const planeYMaterial = new THREE.MeshBasicMaterial({map:planeYTexture, transparent:false});
const planeYMesh = new THREE.Mesh(planeYGeometry, planeYMaterial);
planeYMesh.position.set(0,1.5,0);


const planeXZGeometry = new THREE.PlaneBufferGeometry(6,6, 1);
const planeXZMaterial = new THREE.MeshBasicMaterial({map:planeXZTexture});
planeYMaterial.opacity = 0.5;
const planeXZMesh = new THREE.Mesh(planeXZGeometry, planeXZMaterial);
planeXZMesh.rotation.set(-Math.PI/2, 0, 0)

const cube = new THREE.BoxBufferGeometry(1,1, 1);
const cube_material = new THREE.MeshBasicMaterial({map:boxTexture, wireframe:false});
const cube_mesh = new THREE.Mesh(cube, cube_material);
cube_mesh.scale.set(0.5, 0.5, 0.5)
const size = {
    width: window.innerWidth/3,
    height: window.innerWidth/3
}
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.set(5, 5, 10);
camera.rotation.set(0, 3.14/8, 0);
scene.add(cube_mesh, planeXZMesh, planeYMesh)
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

document.getElementById("incX").addEventListener("click", ()=>{
    var x = parseInt( document.getElementById("valX").value);
    x+=1;
    document.getElementById("valX").value= x;
    cube_mesh.position.set(x/20.0,cube_mesh.position.y, cube_mesh.position.z)
})


document.getElementById("decX").addEventListener("click", ()=>{ 
    document.getElementById("valX").value= parseInt( document.getElementById("valX").value)- 1;
    cube_mesh.position.set(parseInt( document.getElementById("valX").value)/20,cube_mesh.position.y, cube_mesh.position.z)
})

document.getElementById("incY").addEventListener("click", ()=>{
    document.getElementById("valY").value= parseInt( document.getElementById("valY").value)+ 1;
    cube_mesh.position.set(cube_mesh.position.x, parseInt( document.getElementById("valY").value)/20, cube_mesh.position.z)
})

document.getElementById("decY").addEventListener("click", ()=>{ 
    document.getElementById("valY").value= parseInt( document.getElementById("valY").value)- 1;
    cube_mesh.position.set(cube_mesh.position.x, parseInt( document.getElementById("valY").value)/20,  cube_mesh.position.z)
})

document.getElementById("incZ").addEventListener("click", ()=>{
    document.getElementById("valZ").value= parseInt( document.getElementById("valZ").value)+ 1;
    cube_mesh.position.set(cube_mesh.position.x, cube_mesh.position.y, -parseInt( document.getElementById("valZ").value)/20)
})

document.getElementById("decZ").addEventListener("click", ()=>{ 
    document.getElementById("valZ").value= parseInt( document.getElementById("valZ").value)- 1;
    cube_mesh.position.set(cube_mesh.position.x, cube_mesh.position.y, -parseInt( document.getElementById("valZ").value)/20)
})

const tick = () =>{

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick()