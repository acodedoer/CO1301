
const canvas = document.getElementById('giant-webgl')
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager);
const boxTexture = textureLoader.load('../tiles1.jpg')

const scene = new THREE.Scene();

const positions = [{'x':1, 'y':0.5},{'x':1, 'y':1.5},{'x':-1, 'y':.5},{'x':-1, 'y':1.5},{'x':0, 'y':2.5},{'x':0, 'y':3.5},{'x':0, 'y':4.5},{'x':1, 'y':3.5}, {'x':2, 'y':3.5},{'x':-1, 'y':3.5}, {'x':-2, 'y':3.5},{'x':.5, 'y':5.5}, {'x':.5, 'y':6.5},{'x':-.5, 'y':5.5}, {'x':-.5, 'y':6.5} ]
const cubes=[];
for(let i =0; i<15; i++){
    const cube =new THREE.BoxBufferGeometry(1,1, 1);
    const cube_material = new THREE.MeshBasicMaterial({wireframe:true});
    cubes[i] = new THREE.Mesh(cube, cube_material);
    cubes[i].scale.set(1, 1, 1)
    cubes[i].position.set(positions[i]['x'],positions[i]['y'],0 );
    scene.add(cubes[i])
}

const cube = new THREE.BoxBufferGeometry(1,1, 1);
const cube_material = new THREE.MeshBasicMaterial({map:boxTexture, wireframe:false});
const cube_mesh = new THREE.Mesh(cube, cube_material);
cube_mesh.scale.set(1, 1, 1)
const size = {
    width: window.innerWidth/3,
    height: window.innerWidth/3
}
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.set(0, 4, 6);
scene.add(cube_mesh)
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
document.getElementById("incX").addEventListener("click", ()=>{
    var x = parseInt( document.getElementById("valX").value);
    if(x<60){
        x+=1;
        document.getElementById("valX").value= x;
        cube_mesh.position.set(x/20.0,cube_mesh.position.y, cube_mesh.position.z)
    }
})

document.getElementById("incX").addEventListener("click", ()=>{ 
    document.getElementById("valX").value= parseInt( document.getElementById("valX").value)+ 1;
    cube_mesh.position.set(parseInt( document.getElementById("valX").value)/10,cube_mesh.position.y, cube_mesh.position.z)
})

document.getElementById("decX").addEventListener("click", ()=>{ 
    document.getElementById("valX").value= parseInt( document.getElementById("valX").value)- 1;
    cube_mesh.position.set(parseInt( document.getElementById("valX").value)/10,cube_mesh.position.y, cube_mesh.position.z)
})

document.getElementById("incY").addEventListener("click", ()=>{
    document.getElementById("valY").value= parseInt( document.getElementById("valY").value)+ 1;
    cube_mesh.position.set(cube_mesh.position.x, parseInt( document.getElementById("valY").value)/10, cube_mesh.position.z)
})

document.getElementById("decY").addEventListener("click", ()=>{ 
    document.getElementById("valY").value= parseInt( document.getElementById("valY").value)- 1;
    cube_mesh.position.set(cube_mesh.position.x, parseInt( document.getElementById("valY").value)/10,  cube_mesh.position.z)
})


const tick = () =>{

    // const deltaTime = clock.getElapsedTime();
    // console.log(deltaTime)

    // cube_mesh.rotation.y=Math.sin(deltaTime);
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick()