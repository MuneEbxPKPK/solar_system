import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import spaceBg from '../img/space-bg.jpg';
import sunTexture from '../img/2k_sun.jpg';
import mercuryTexture from '../img/2k_mercury.jpg';
import earthTexture from '../img/2k_earth_daymap.jpg';
import moonTexture from '../img/2k_moon.jpg';
import marsTexture from '../img/2k_mars.jpg';
import jupitorTexture from '../img/2k_jupiter.jpg';
import saturnTexture from '../img/2k_saturn.jpg';
import saturnRingTexture from '../img/2k_saturn_ring_alpha.png';
import uranusTexture from '../img/2k_uranus.jpg';
import neptuneTexture from '../img/2k_neptune.jpg';


// Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 1, 30000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

//Background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    spaceBg, spaceBg, spaceBg, spaceBg, spaceBg, spaceBg
]);

const textureLoader = new THREE.TextureLoader();

// Only For Sun
const geometry = new THREE.SphereGeometry(277, 30, 30)
const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(geometry, material);
scene.add(sun)

// Function To render planets.
function renderPlanet(radius, planetTextures, rings, position) {

    const sunGeometry = new THREE.SphereGeometry(radius)
    const sunMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(planetTextures)
    });
    const planet = new THREE.Mesh(sunGeometry, sunMaterial);
    const object = new THREE.Object3D();
    object.add(planet)
    planet.position.set(position.x, position.y, position.z)
    if (rings.containRing == true) {
        const ringGeo = new THREE.RingGeometry(rings.innerRadius, rings.outerRadius, rings.thetaSegments)
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(rings.texture),
            side: THREE.DoubleSide
        })
        const planetRings = new THREE.Mesh(ringGeo, ringMat);
        object.add(planetRings);
        planetRings.position.set(position.x, position.y, position.z)
    }
    scene.add(object)
    return { planet, object };
}

const sunPosition = { x: 0, y: 0, z: 0 }
const moonPosition = { x: -750, y: 0, z: 0 }


const mercuryPosition = { x: 300, y: 0, z: 0 };
const mercury = renderPlanet(1, mercuryTexture, { containRing: false }, mercuryPosition)
const earthPosition = { x: -700, y: 0, z: -400 }
const earth = renderPlanet(2.6144, earthTexture, { containRing: false }, earthPosition)
const marsPosition = { x: 1300, y: 0, z: 900 }
const mars = renderPlanet(1.40, marsTexture, { containRing: false }, marsPosition)
const jupitorPosition = { x: 4052, y: 0, z: -1900 }
const jupitor = renderPlanet(14.32, jupitorTexture, { containRing: false }, jupitorPosition)
const uranusPosition = { x: 15660, y: 0, z: 7000 }
const uranus = renderPlanet(5.198, uranusTexture, { containRing: false }, uranusPosition)
const neptunePosition = { x: 24543, y: 0, z: -19000 }
const neptune = renderPlanet(5.198, neptuneTexture, { containRing: false }, neptunePosition)



const moonGeo = new THREE.SphereGeometry(.35, 30, 30);
const moonMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(moonTexture),
    side: THREE.DoubleSide
});
const moon = new THREE.Mesh(moonGeo, moonMat);
earth.object.add(moon);
moon.position.set(-750, 0, 0)

const saturn = renderPlanet(23.87, saturnTexture,
    {
        texture: saturnRingTexture,
        innerRadius: 57.79,
        outerRadius: 11.455,
        thetaSegments: 32,
        containRing: true
    }, { x: 1700, y: 0, z: -1000 })







//Controls setup
camera.position.set(4052, 0, 0);
const control = new OrbitControls(camera, renderer.domElement);
control.update();


//Live update setup
function animate() {
    // Self rotation
    sun.rotateY(0.0009)
    mercury.planet.rotateY(0.0004)
    earth.planet.rotateY(0.0005)
    mars.planet.rotateY(0.0006)
    jupitor.planet.rotateY(0.0007)
    saturn.planet.rotateY(0.0008)
    uranus.planet.rotateY(0.0009)
    neptune.planet.rotateY(0.0010)

    // Rotation along sun
    mercury.object.rotateY(0.0004)
    earth.object.rotateY(0.0005)
    mars.object.rotateY(0.0006)
    jupitor.object.rotateY(0.0007)
    saturn.object.rotateY(0.0008)
    uranus.object.rotateY(0.0009)
    neptune.object.rotateY(0.00010)


    control.update();
    renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);


// For responsiveness of canvas
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

