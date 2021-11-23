import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const params = {
    color: '#ffffff'
};

const scene = new THREE.Scene()
scene.background = new THREE.Color(params.color);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

renderer.gammaOutput = true

const controls = new OrbitControls(camera, renderer.domElement)

let model;

const loader = new GLTFLoader();
loader.load(
    './18th-century-oilan/source/OilCan.glb',
    function (gltf) {
        model = gltf.scene
        scene.add(model);
    }, undefined,
    function (error) {
        console.error(error);
    });


const light = new THREE.AmbientLight(0x404040, 50); // soft white light
scene.add(light);

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

const gui = new GUI();
gui.addColor(params, 'color').onChange(function (value) {

    scene.background.set(value);

});

function animate() {
    requestAnimationFrame(animate)
    if (model) {
        model.rotation.x += 0.01
        model.rotation.y += 0.01
    }
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}


animate();