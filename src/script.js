/**
 * Periodic Table in Three.JS
 * Forked from Three.JS Periodic Table Example
 * https://threejs.org/examples/css3d_periodictable.html
 */

import * as THREE from 'three';

import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import * as TWEEN from './lib/tween';
import { data } from "./data"
import  { createBody} from "./utils"


// init
let camera, scene, renderer;
var controls;

var objects = [];
var targets = {
  table: [],
  helix: [],
  sphere: [],
  grid: [],
};



function initTrackbarControls() {
  controls = new TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.5;
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener('change', render);
}


function simpleObjectsLayout() {
  for (var i = 0; i < data.elements.length - 1; i += 1) {
    var element = document.createElement('div');
    var item = data["elements"][i];
    element.className = 'element';
    element.style.backgroundColor =
      'rgba(0,200,0,' + (Math.random() * 0.5 + 0.25) + ')';

    var number = document.createElement('div');
    number.className = 'number';
    number.textContent = `${item.number}`;
    element.appendChild(number);

    var symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = item.symbol;
    element.appendChild(symbol);

    var details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = item.name + '<br />' + item.atomic_mass;
    element.appendChild(details);

    var body = createBody(item);
    element.appendChild(body)

    var closeButton = document.createElement("button");
    closeButton.className = "close"
    closeButton.innerHTML = "X"
    element.appendChild(closeButton)
    closeButton.addEventListener('pointerdown', function (event) {
      console.log("Closing")
      event.stopPropagation();
      transform(targets.table, 2000);
    })

    addElementClick(element, i)

    var object = new CSS3DObject(element);
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add(object);
    objects.push(object);
  }
}

function tableLayout() {
  for (var i = 0; i < data.elements.length; i++) {
    var element = data.elements[i]
    var object = new THREE.Object3D();
    object.position.x = element.xpos * 140 - 1330;
    object.position.y = -(element.ypos * 180) + 990;
    targets.table.push(object);
  }
}

function addElementClick(htmlElement, elementId) {
  console.log(htmlElement)
  htmlElement.addEventListener('pointerdown', function (event) {
    console.log(event.target)
    let element = data.elements[elementId]
    let object = objects[elementId]
    if (!object.element.classList.contains("large")) {
      enlarge(elementId);
    }
  })
}

function enlarge(elementId) {
  let duration = 1000;
  TWEEN.removeAll();
  for (let i = 0; i < objects.length; i++) {
    let target = targets.table[i];
    let object = objects[i];
    console.log(object.element.classList.contains("large"))
    if (i == elementId && !object.element.classList.contains("large")) {
      new TWEEN.Tween(object.position)
        .to(
          { x: 0, y: 0, z: target.position.z + 200 },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
      new TWEEN.Tween(object.scale)
        .to(
          { x: target.scale.x * 6, y: target.scale.y * 6, z: target.scale.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
      object.element.className = "element large"
    } else {
      new TWEEN.Tween(object.position)
        .to(
          { x: target.position.x, y: target.position.y, z: target.position.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
      new TWEEN.Tween(object.scale)
        .to(
          { x: target.scale.x, y: target.scale.y, z: target.scale.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
      object.element.className = "element"
    }
  }
  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}


init();
animate();
function init() {
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 4000;

  scene = new THREE.Scene();

  simpleObjectsLayout();
  tableLayout();

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setAnimationLoop( animation );
  document.getElementById('container').appendChild(renderer.domElement);
  transform(targets.table, 2000);
  window.addEventListener('resize', onWindowResize, false);
  initTrackbarControls();
  render();
}

function transform(targets, duration) {
  TWEEN.removeAll();

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const target = targets[i];

    new TWEEN.Tween(object.position)
      .to(
        { x: target.position.x, y: target.position.y, z: target.position.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(
        { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.scale)
      .to(
        { x: target.scale.x, y: target.scale.y, z: target.scale.z },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    object.element.className = "element"
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  TWEEN.update();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
}
