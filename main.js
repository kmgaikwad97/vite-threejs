import * as THREE from 'three';
import './style.css'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene();
// console.log(scene,"1");

//create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
// console.log(geometry,"2");

const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5,
})
// console.log(material,"3");

const mesh = new THREE.Mesh(geometry, material) 
scene.add(mesh);
// console.log(mesh,"4");



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}


// light 
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0,10,10);
light.intensity = 1.25;
scene.add(light);
// console.log(light,'5');

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1,100);
camera.position.z = 20;
scene.add(camera)
// console.log(camera,'6');



// Renderer
const canvas = document.querySelector('.webgl');
// console.log(canvas,'7');
let renderer = new THREE.WebGLRenderer({canvas});
// console.log(renderer,'8');

renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera); 

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5
// console.log(controls,"10");



// resize

window.addEventListener('resize', () => {
    // update Sizes
    // console.log(window.innerWidth, window.innerHeight,"9");
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    // renderer.render(scene, camera);
})

const loop= () => {
    controls.update()
    // mesh.position.x += 0.02; 
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop()

// TImeline Magic

const t1 = gsap.timeline({defaults: {duration: 1}});
t1.fromTo(mesh.scale,{z:0 , x:0, y:0},{z:1, x:1, y:1})
// t1.fromTo('nav',{y: '-100%'},{y: '0%'}, '-=1')
t1.fromTo('nav',{y: '-100%'},{y: '0%'})
t1.fromTo('.title',{opacity: 0},{opacity: 1} )

// Mouse Animation Color
let mouseDown = false
let rgb = []

window.addEventListener("mousedown", () => ( mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e) => {

    // console.log(e.pageX,"here");
    // console.log((e.pageX/sizes.width)*255,'11');
    console.log(mouseDown,"12")
    if(mouseDown){
        rgb = [
            Math.round((e.pageX/sizes.width)*255),
            Math.round((e.pageY/sizes.height)*255),150
        ]
        console.log(rgb);


        let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
        // new THREE.Color(`rgb(0,123,122)`)
        gsap.to(mesh.material.color,{
            r:newColor.r,
            g:newColor.g,
            b:newColor.b
        })
    }
})